<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Spatie\Permission\Models\Role;
use App\Models\Card;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => 'required|string',
            'card' => 'required|in:Gift,Membership',
            'amount' => 'nullable|required_if:card,Gift|integer',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone' => 'nullable|string|max:13|min:11',
            'u_name' => 'nullable|string|max:255|required_if:name,null',
            'u_email' => 'nullable|string|email|max:255||required_if:email,null',
            'u_phone' => 'nullable|string|max:13|min:11|required_if:phone,null',
            'category' => 'nullable|required_if:card,Membership|in:' . join(',', User::$categories),
        ]);

        $card = Card::where('type', $request->card)
            ->where('code', $request->code)->first();

        if($card) {
            return redirect()->back()->withErrors(['code' => 'Code is taken already']);
        }

        $payload = $request->all();
        $date = Carbon::now()->addYear();
        $isMembership = $payload['card'] == 'Membership';

        // Store Card
        $card = Card::create([
            'code' => $payload['code'],
            'type' => $payload['card'],
            'expired_at' => $isMembership ? $date : null,
            'amount' => $isMembership ? 0 : $payload['amount'],
        ]);

        // Create Card Buyer
        if($request->name) {
            $user = User::create([
                'is_buyer' => true,
                'card_id' => $card->id,
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                // 'category' => $request->category,
                'password' => Hash::make($request->phone),
            ]);
            $role = Role::where(['name' => 'customer']);
            $user->assignRole($role);
        }

        // Create Card User
        if($request->u_name) {
            $user = User::create([
                'card_id' => $card->id,
                'name' => $request->u_name,
                'email' => $request->u_email,
                'phone' => $request->u_phone,
                'category' => $request->category,
                'password' => Hash::make($request->u_phone),
            ]);

            $role = Role::where(['name' => 'customer']);
            $user->assignRole($role);
        }

        // event(new Registered($user));

        //
        return back()->with([
            'message' => 'Account created successfully',
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeAdmin(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:13|min:11|unique:'.User::class
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->phone),
        ]);

        $role = Role::where(['name' => 'admin']);
        $user->assignRole($role);

        //
        return back()->with([
            'message' => 'Account created successfully',
        ]);
    }
}
