<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Transaction;
use Illuminate\Http\RedirectResponse;

class TransactionController extends Controller
{

    /**
     * Display the source.
     */
    public function index(Request $request): Response
    {
        $models = Transaction::with([
            'card', 'attendant'
        ])->latest()->paginate(10);

        return Inertia::render('Transactions', [
            'models' => $models,
            'status' => session('status'),
        ]);
    }
}
