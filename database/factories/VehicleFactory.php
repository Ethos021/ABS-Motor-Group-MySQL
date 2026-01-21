<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'make' => $this->faker->randomElement(['Toyota','Ford','BMW','Audi']),
        'model' => $this->faker->word(),
        'year' => $this->faker->numberBetween(2015,2024),
        'price' => $this->faker->numberBetween(20000,200000),
        'odometer' => $this->faker->numberBetween(0,300000),
        'stock_type' => 'A',
    ];
}
}
