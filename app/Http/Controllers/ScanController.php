<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'email' => 'required|exists:'.User::class
        ]);

        $user = User::where('email', $request->email)->first();
        $payload = $request->all();
        $payload['user_id'] = $user->id;

        unset($payload['email']);
        Outlet::create($payload);

        //
        return back()->with([
            'message' => 'Created successfully',
        ]);
    }
}
