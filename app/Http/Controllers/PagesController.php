<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
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

    public function dashboard(): Response
    {

        $superCount = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'Super Admin')->toArray()
        )->count();

        $adminCount = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'Admin')->toArray()
        )->count();

        $userCount = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'Customer')->toArray()
        )->count();

        $users = User::with('roles')->latest()->paginate(10);

        // $usersCount = User::where('type', 'User')->count();
        // $adminsCount = User::where('type', 'Admin')->count();
        // $users = User::where('type', 'User')->latest()->paginate(10);

        $expiredCount = User::with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'Customer')
        )->count();

        $golds = User::where('category', User::GOLD)->count();
        $silvers = User::where('category', User::SILVER)->count();
        $platinum = User::where('category', User::PLATINUM)->count();

        $userStats = [
            'golds' => $golds,
            'silvers' => $silvers,
            'platinum' => $platinum
        ];

        //
        return Inertia::render('Dashboard', [
            'users' => $users,
            'usersCount' => $userCount,
            'expiredCount' => $expiredCount,
            'adminsCount' => $adminCount,
            'userStats' => $userStats,
            'status' => session('status')
        ]);
    }
}
