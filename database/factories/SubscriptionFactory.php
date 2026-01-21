<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            // We koppelen dit later aan een specifieke user in de Seeder
            'user_id' => 1, 
            'name' => fake()->randomElement(['Netflix', 'Spotify', 'Adobe CC', 'Vercel', 'AWS', 'Gym', 'Internet', 'Apple TV']),
            'price' => fake()->randomFloat(2, 5, 50), // Bedrag tussen 5.00 en 50.00
            'currency' => 'EUR',
            'next_payment_date' => fake()->dateTimeBetween('now', '+1 month'),
            'status' => fake()->randomElement(['active', 'active', 'active', 'cancelled']), // 75% kans op active
            'logo_color' => fake()->randomElement(['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500']),
        ];
    }
}