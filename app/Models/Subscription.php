<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    // 1. Dit is de beveiliging. Alleen deze velden mogen zomaar in 1x opgeslagen worden.
    protected $fillable = [
        'user_id', 
        'name', 
        'price', 
        'currency', 
        'next_payment_date', 
        'status', 
        'logo_color'
    ];

    // 2. Dit is de relatie. Hiermee zeggen we: "Dit abonnement hoort bij één User".
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}