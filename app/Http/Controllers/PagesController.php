<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Card;
use App\Models\Outlet;

class PagesController extends Controller
{
    /**
     * Display the source.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Index', [
            'status' => session('status'),
        ]);
    }

    public function users(): Response
    {
        $usersCount = User::role('customer')->count();
        $users = User::role('customer')->with('card')->latest()->paginate(10);
        $expiredCount = Card::whereDate('expired_at', '<=', date('Y-m-d'))->count();

        $solos = User::where('category', User::GOLD)->count();
        $tribes = User::where('category', User::SILVER)->count();
        $lifestyles = User::where('category', User::PLATINUM)->count();

        $userStats = [
            'solos' => $solos,
            'tribes' => $tribes,
            'lifestyles' => $lifestyles,
        ];

        //
        return Inertia::render('Users', [
            'users' => $users,
            'userStats' => $userStats,
            'usersCount' => $usersCount,
            'expiredCount' => $expiredCount,
            'status' => session('status')
        ]);
    }

    public function admins(): Response
    {
        $adminsCount = User::role('admin')->count();
        $users = User::role('admin')->latest()->paginate(10);

        //
        return Inertia::render('Admins', [
            'users' => $users,
            'adminsCount' => $adminsCount,
            'status' => session('status')
        ]);
    }

    public function dashboard(): Response
    {
        $outletCount = Outlet::count();
        $adminCount = User::role('admin')->count();
        $userCount = User::role('customer')->count();
        $superCount = User::role('super admin')->count();

        $users = User::role('customer')
            ->with('card')->latest()->paginate(10);

        $expiredCount = Card::whereDate('expired_at', '<=', date('Y-m-d'))->count();

        $golds = User::where('category', User::GOLD)->count();
        $silvers = User::where('category', User::SILVER)->count();
        $platinum = User::where('category', User::PLATINUM)->count();

        $userStats = [
            'solos' => $golds,
            'tribes' => $silvers,
            'lifestyles' => $platinum,
        ];

        //
        return Inertia::render('Dashboard', [
            'users' => $users,
            'outletCount' => $outletCount,
            'usersCount' => $userCount,
            'expiredCount' => $expiredCount,
            'adminsCount' => $adminCount,
            'userStats' => $userStats,
            'status' => session('status')
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $request->validate([
            'code' => 'required|string',
            'card' => 'required|in:Gift,Membership',
            'amount' => 'nullable|required_if:card,Gift|integer',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:'.User::class,
            'phone' => 'nullable|string|max:13|min:11|unique:'.User::class,
            'u_name' => 'nullable|string|max:255|required_if:name,null',
            'u_email' => 'nullable|string|email|max:255||required_if:email,null',
            'u_phone' => 'nullable|string|max:13|min:11|required_if:phone,null',
            'category' => 'nullable|required_if:card,Membership|in:' . join(',', User::$categories),
        ]);

        $user = User::findOrFail($id);
        $card = $user->card;

        // Update Card User details
        if($request->u_name) {
            $user->fill([
                'name' => $request->u_name,
                'email' => $request->u_email,
                'phone' => $request->u_phone,
                'category' => $request->category,
            ]);

            $user->save();
        }
        else {
            $user->fill([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'category' => $request->category,
            ]);

            $user->save();
        }

        $card->code = $request->code;
        $card->type = $request->card;
        $card->amount = $request->amount;
        $card->save();

        //
        return to_route('users');
    }

    public function reset(Request $request): RedirectResponse
    {
        $user = User::find($request->id);

        $request->user()->update([
            'password_reset_at' => null,
            'password' => Hash::make($user->phone),
        ]);

        return back();
    }
}
