<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    // 1. Dashboard (Lijst)
public function index()
{
    // 1. Haal de gewone lijst op (voor de tabel)
    $subscriptions = Subscription::where('user_id', auth()->id())
        ->orderBy('next_payment_date', 'asc')
        ->get();

    // 2. Bereken data voor de grafiek (Groepeer op categorie en tel prijzen op)
    $chartData = Subscription::where('user_id', auth()->id())
        ->where('status', 'active')
        ->select('category', DB::raw('sum(price) as total'))
        ->groupBy('category')
        ->get();

    return Inertia::render('Dashboard', [
        'subscriptions' => $subscriptions,
        'chartData' => $chartData // <--- Stuur dit mee naar React
    ]);
}

    // 2. Toon aanmaak pagina
    public function create()
    {
        return Inertia::render('Subscriptions/Create');
    }

    // 3. Opslaan nieuw item
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'next_payment_date' => 'required|date',
            'category' => 'required|string',
        ]);

        $request->user()->subscriptions()->create([
            ...$validated,
            'currency' => 'EUR',
            'status' => 'active',
            'logo_color' => 'bg-indigo-500', 
        ]);

        return redirect()->route('dashboard');
    }

    // 4. Toon wijzig pagina (NIEUW)
    public function edit(Subscription $subscription)
    {
        // Beveiliging: Check of dit abonnement wel van de ingelogde user is
        if ($subscription->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Subscriptions/Edit', [
            'subscription' => $subscription
        ]);
    }

    // 5. Update item in database (NIEUW)
    public function update(Request $request, Subscription $subscription)
    {
        if ($subscription->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'next_payment_date' => 'required|date',
            'status' => 'required|in:active,cancelled',
            'category' => 'required|string',
        ]);

        $subscription->update($validated);

        return redirect()->route('dashboard');
    }

    // 6. Verwijder item (NIEUW)
    public function destroy(Subscription $subscription)
    {
        if ($subscription->user_id !== auth()->id()) {
            abort(403);
        }

        $subscription->delete();

        return redirect()->route('dashboard');
    }
}