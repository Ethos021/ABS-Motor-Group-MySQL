<?php

use App\Models\Vehicle;

test('can list vehicles', function () {
    $response = $this->getJson('/api/vehicles');

    $response->assertStatus(200);
    $response->assertJsonStructure([]);
});

test('can create a vehicle', function () {
    $vehicleData = [
        'make' => 'Toyota',
        'model' => 'Camry',
        'year' => 2023,
        'price' => 25000.00,
        'mileage' => 15000,
        'body_type' => 'Sedan',
        'fuel_type' => 'Gasoline',
        'stock_number' => 'TOY-2023-001',
    ];

    $response = $this->postJson('/api/vehicles', $vehicleData);

    $response->assertStatus(201);
    $response->assertJsonFragment([
        'make' => 'Toyota',
        'model' => 'Camry',
        'year' => 2023,
    ]);

    $this->assertDatabaseHas('vehicles', [
        'make' => 'Toyota',
        'model' => 'Camry',
    ]);
});

test('can show a specific vehicle', function () {
    $vehicle = Vehicle::factory()->create([
        'make' => 'Honda',
        'model' => 'Accord',
        'year' => 2022,
        'price' => 28000.00,
        'mileage' => 20000,
    ]);

    $response = $this->getJson("/api/vehicles/{$vehicle->id}");

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'make' => 'Honda',
        'model' => 'Accord',
    ]);
});

test('can update a vehicle', function () {
    $vehicle = Vehicle::factory()->create([
        'make' => 'Ford',
        'model' => 'F-150',
        'year' => 2021,
        'price' => 35000.00,
        'mileage' => 30000,
    ]);

    $response = $this->putJson("/api/vehicles/{$vehicle->id}", [
        'price' => 32000.00,
        'mileage' => 32000,
    ]);

    $response->assertStatus(200);
    $response->assertJsonFragment([
        'price' => '32000.00',
        'mileage' => 32000,
    ]);

    $this->assertDatabaseHas('vehicles', [
        'id' => $vehicle->id,
        'price' => 32000.00,
        'mileage' => 32000,
    ]);
});

test('can delete a vehicle', function () {
    $vehicle = Vehicle::factory()->create();

    $response = $this->deleteJson("/api/vehicles/{$vehicle->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('vehicles', [
        'id' => $vehicle->id,
    ]);
});
