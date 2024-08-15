<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Card;
use Illuminate\Http\RedirectResponse;

class ScanController extends Controller
{
        /**
     * Display the source.
     */
    public function index(Request $request): Response
    {
        // $models = Outlet::latest()->paginate(10);
        return Inertia::render('Scan', [
            // 'models' => $models,
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
            'code' => 'required|integer|exists:cards,code',
        ]);

        $card = Card::where('type', $request->card)
            ->where('code', $request->code)->with('user')->first();

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
        ]);

        $amount = $request->price;
        $card = Card::find($request->card_id);
        if($amount > $card->amount || $card->amount - $amount < 0) {
            return response()->json([
                'message' => 'Insufficient Balance'
            ], 400);
        }

        $card->amount = $card->amount - $amount;
        $card->save();

        //
        return response()->json([
            'card' => $card,
            'message' => 'Charged successfully',
        ]);
    }
}
