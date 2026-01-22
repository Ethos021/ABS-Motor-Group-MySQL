<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Vehicle;
use League\Csv\Reader;
use League\Csv\Exception;

class ImportVehicles extends Command
{
    protected $signature = 'import:vehicles {csv_path}';
    protected $description = 'Import vehicles from a CSV file into the database';

    public function handle()
    {
        $csvPath = $this->argument('csv_path');

        // Check file exists
        if (!file_exists($csvPath)) {
            $this->error("File not found: $csvPath");
            return 1;
        }

        try {
            $csv = Reader::createFromPath($csvPath, 'r');
            $csv->setHeaderOffset(0); // first row as header
            $records = $csv->getRecords();
        } catch (Exception $e) {
            $this->error("Failed to read CSV: " . $e->getMessage());
            return 1;
        }

        $this->info("Importing vehicles from $csvPath...");

        foreach ($records as $data) {

            // Clean and map fields
            $vehicleData = [
                'stock_number' => $data['StockNumber'] ?? null,
                'make' => $data['Make'] ?? null,
                'model' => $data['Model'] ?? null,
                'badge' => $data['Badge'] ?? null,
                'rego_num' => $data['RegoNum'] ?? null,
                'vin' => $data['VIN'] ?? null,
                'price' => is_numeric($data['Price'] ?? null) ? $data['Price'] : null,
                'year' => is_numeric($data['Year'] ?? null) ? $data['Year'] : null,
                'odometer' => is_numeric($data['Odometer'] ?? null) ? $data['Odometer'] : null,
                'body' => $data['Body'] ?? null,
                'color' => $data['Color'] ?? null,
                'engine_size' => $data['EngineSize'] ?? null,
                'gear_type' => $data['GearType'] ?? null,
                'fuel_type' => $data['FuelType'] ?? null,
                'standard_features' => $data['StandardFeatures'] ?? null,
                'optional_features' => $data['OptionalFeatures'] ?? null,
                'adv_description' => $data['AdvDescription'] ?? null,
                'yard_code' => $data['YardCode'] ?? null,
                'series' => $data['Series'] ?? null,
                'nvic' => $data['NVIC'] ?? null,
                'special_price' => is_numeric($data['SpecialPrice'] ?? null) ? $data['SpecialPrice'] : null,
                'is_demo' => filter_var($data['IsDemo'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'is_special' => filter_var($data['IsSpecial'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'is_prestiged' => filter_var($data['IsPrestiged'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'stock_type' => $data['StockType'] ?? null,
                'is_used' => filter_var($data['IsUsed'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'rego_expiry' => !empty($data['RegoExpiry'] ?? '') ? date('Y-m-d', strtotime($data['RegoExpiry'])) : null,
                'video_link' => $data['VideoLink'] ?? null,
                'drive' => $data['Drive'] ?? null,
                'door_num' => is_numeric($data['DoorNum'] ?? null) ? $data['DoorNum'] : null,
                'cylinders' => is_numeric($data['Cylinders'] ?? null) ? $data['Cylinders'] : null,
                'redbook_code' => $data['RedbookCode'] ?? null,
                'is_miles' => filter_var($data['IsMiles'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'short_description' => $data['ShortDescription'] ?? null,
                'interior_colour' => $data['InteriorColour'] ?? null,
                'rego_state' => $data['RegoState'] ?? null,
                'build_date' => !empty($data['BuildDate'] ?? '') ? date('Y-m-d', strtotime($data['BuildDate'])) : null,
                'compliance_date' => !empty($data['ComplianceDate'] ?? '') ? date('Y-m-d', strtotime($data['ComplianceDate'])) : null,
                'gcm' => is_numeric($data['GCM'] ?? null) ? $data['GCM'] : null,
                'gvm' => is_numeric($data['GVM'] ?? null) ? $data['GVM'] : null,
                'tare' => is_numeric($data['Tare'] ?? null) ? $data['Tare'] : null,
                'sleeping_capacity' => is_numeric($data['SleepingCapacity'] ?? null) ? $data['SleepingCapacity'] : null,
                'toilet' => filter_var($data['Toilet'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'shower' => filter_var($data['Shower'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'air_conditioning' => filter_var($data['AirConditioning'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'fridge' => filter_var($data['Fridge'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'stereo' => filter_var($data['Stereo'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'gps' => filter_var($data['GPS'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'is_dap' => filter_var($data['IsDAP'] ?? 0, FILTER_VALIDATE_BOOLEAN),
                'stock_status' => $data['StockStatus'] ?? null,
                'engine_number' => $data['EngineNumber'] ?? null,
                'gear_count' => is_numeric($data['GearCount'] ?? null) ? $data['GearCount'] : null,
                'engine_power' => is_numeric($data['EnginePower'] ?? null) ? $data['EnginePower'] : null,
                'power_kw' => is_numeric($data['PowerkW'] ?? null) ? $data['PowerkW'] : null,
                'power_hp' => is_numeric($data['Powerhp'] ?? null) ? $data['Powerhp'] : null,
                'engine_make' => $data['EngineMake'] ?? null,
                'serial_number' => $data['SerialNumber'] ?? null,
                'wheel_size' => $data['WheelSize'] ?? null,
                'towball_weight' => is_numeric($data['TowBallWeight'] ?? null) ? $data['TowBallWeight'] : null,
                'warranty' => $data['Warranty'] ?? null,
                'wheels' => $data['Wheels'] ?? null,
                'axle_configuration' => $data['AxleConfiguration'] ?? null,
                'seats' => is_numeric($data['Seats'] ?? null) ? $data['Seats'] : null,
                'images' => isset($data['Images']) && $data['Images'] !== '' ? json_decode($data['Images'], true) : null,
            ];

            // Insert or update by stock number
            Vehicle::updateOrCreate(
                ['stock_number' => $vehicleData['stock_number']],
                $vehicleData
            );
        }

        $this->info("Vehicles import complete!");
        return 0;
    }
}
