<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Card;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;
use Auth;

class ScanController extends Controller
{
    /**
     * Display the source.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Scan', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function scan(Request $request)
    {
        $request->validate([
            'card' => 'required|string|in:Gift,Membership',
            'code' => 'required|exists:cards,code',
        ]);

        $card = Card::where('type', $request->card)
            ->where('code', $request->code)
            ->with([
                'users', 'transactions', 'transactions.user',
                'transactions.card',  'transactions.attendant'])->first();

        if(!$card) {
            return response()->json([
                'message' => 'Card not recognized'
            ], 404);
        }

        //
        return response()->json([
            'card' => $card,
            'message' => 'Created successfully',
        ]);
    }

     /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function charge(Request $request)
    {
        $request->validate([
            'price' => 'required|numeric',
            'card_id' => 'required|integer|exists:cards,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $amount = $request->price;
        $card = Card::find($request->card_id);
        if($amount > $card->amount || $card->amount - $amount < 0) {
            return redirect()->back()->withErrors([
                'price' => 'Insufficient fund'
            ]);
        }

        $card->amount = $card->amount - $amount;
        $card->save();

        $user = $request->user();
        $owner = User::find($request->user_id);

        Transaction::create([
            'amount' => $amount,
            'card_id' => $card->id,
            'user_id' => $owner->id,
            'attendant_id' => $user->id,
        ]);

        return to_route('scans');
    }
}
