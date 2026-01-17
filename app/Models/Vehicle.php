<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $fillable = [
        'make',
        'model',
        'year',
        'price',
        'mileage',
        'body_type',
        'fuel_type',
        'stock_number',
        'description',
        'image_url',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'year' => 'integer',
        'mileage' => 'integer',
    ];
}
