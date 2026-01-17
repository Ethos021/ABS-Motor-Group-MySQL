# Testing the Vehicle API

## How to Test with Docker

Once you have the Docker container running, you can test the vehicle API endpoints:

### 1. List all vehicles (GET)
```bash
curl http://localhost:8000/api/vehicles
```

### 2. Create a vehicle (POST)
```bash
curl -X POST http://localhost:8000/api/vehicles \
  -H "Content-Type: application/json" \
  -d '{
    "make": "Toyota",
    "model": "Camry",
    "year": 2023,
    "price": 25000.00,
    "mileage": 15000,
    "body_type": "Sedan",
    "fuel_type": "Gasoline",
    "stock_number": "TOY-2023-001"
  }'
```

### 3. Get a specific vehicle (GET)
```bash
curl http://localhost:8000/api/vehicles/1
```

### 4. Update a vehicle (PUT)
```bash
curl -X PUT http://localhost:8000/api/vehicles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24000.00,
    "mileage": 16000
  }'
```

### 5. Delete a vehicle (DELETE)
```bash
curl -X DELETE http://localhost:8000/api/vehicles/1
```

## Setup Instructions

1. Make sure you have a `.env` file configured for the Docker environment
2. Run migrations to create the vehicles table:
   ```bash
   docker-compose exec app php artisan migrate
   ```

3. (Optional) Seed some test data:
   ```bash
   docker-compose exec app php artisan tinker
   ```
   Then in the tinker console:
   ```php
   \App\Models\Vehicle::factory()->count(5)->create();
   ```

## What Was Fixed

The issue was that the API routes were not being loaded. The fix was to add the `api` parameter to the `withRouting()` configuration in `bootstrap/app.php`:

```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',  // Added this line
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

This ensures that the routes defined in `routes/api.php` are registered with the Laravel router and accessible at `/api/*` endpoints.
