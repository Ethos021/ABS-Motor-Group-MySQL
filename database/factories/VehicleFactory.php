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
            'make' => fake()->randomElement(['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi']),
            'model' => fake()->randomElement(['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback']),
            'year' => fake()->numberBetween(2015, 2024),
            'price' => fake()->randomFloat(2, 15000, 80000),
            'mileage' => fake()->numberBetween(5000, 100000),
            'body_type' => fake()->randomElement(['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Convertible']),
            'fuel_type' => fake()->randomElement(['Gasoline', 'Diesel', 'Electric', 'Hybrid']),
            'stock_number' => fake()->unique()->bothify('???-####-###'),
            'description' => fake()->optional()->sentence(20),
            'image_url' => fake()->optional()->imageUrl(),
        ];
    }
}
