<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    protected $table = 'enquiries';

    /**
     * Mass assignable fields
     */
    protected $fillable = [
        'enquiry_type',

        // Required
        'firstName',
        'lastName',

        'mobile',
        'email',
        'message',

        // Trade-in
        'hasTradein',
        'tradeInYear',
        'tradeInMake',
        'tradeInModel',
        'tradeInOdometer',

        // Finance / Test Drive
        'wantsFinance',
        'wantsTestDrive',

        // Vehicle
        'vehicle_id',
        'vehicleSnapshot',
        'vehiclePrice',
        'financeEstimate',

        // Contact preferences
        'preferredContactMethod',
        'preferredContactTime',

        // Tracking
        'utmSource',
        'utmMedium',
        'utmCampaign',
        'referrer',
        'pageUrl',
        'ipAddress',

        // Status
        'status',
        'priority',

        'assignedStaffId',
        'contactedAt',
        'closedAt',

        'internalNotes',
        'created_by',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'hasTradein' => 'boolean',
        'wantsFinance' => 'boolean',
        'wantsTestDrive' => 'boolean',

        'vehicleSnapshot' => 'array',
        'financeEstimate' => 'array',

        'vehiclePrice' => 'decimal:2',

        'contactedAt' => 'datetime',
        'closedAt' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function assignedStaff()
    {
        return $this->belongsTo(Staff::class, 'assignedStaffId');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
   