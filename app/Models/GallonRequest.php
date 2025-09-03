<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\GallonRequest
 *
 * @property int $id
 * @property int $employee_id
 * @property int $quantity
 * @property string $status
 * @property \Illuminate\Support\Carbon $requested_at
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $collected_at
 * @property int $month
 * @property int $year
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Employee $employee
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereCollectedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereRequestedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest pending()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest approvedWarehouse()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest collected()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest currentMonth()
 * @method static \Illuminate\Database\Eloquent\Builder|GallonRequest today()
 * @method static \Database\Factories\GallonRequestFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class GallonRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'quantity',
        'status',
        'requested_at',
        'approved_at',
        'collected_at',
        'month',
        'year',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'requested_at' => 'datetime',
        'approved_at' => 'datetime',
        'collected_at' => 'datetime',
        'quantity' => 'integer',
        'month' => 'integer',
        'year' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the employee that owns the request.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Scope a query to only include pending requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include warehouse approved requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApprovedWarehouse($query)
    {
        return $query->where('status', 'approved_warehouse');
    }

    /**
     * Scope a query to only include collected requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCollected($query)
    {
        return $query->where('status', 'collected');
    }

    /**
     * Scope a query to only include current month requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCurrentMonth($query)
    {
        return $query->where('month', now()->month)
                    ->where('year', now()->year);
    }

    /**
     * Scope a query to only include today's requests.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('requested_at', today());
    }

    /**
     * Mark request as approved by warehouse.
     *
     * @return void
     */
    public function approveByWarehouse()
    {
        $this->update([
            'status' => 'approved_warehouse',
            'approved_at' => now(),
        ]);
    }

    /**
     * Mark request as collected by employee.
     *
     * @return void
     */
    public function markAsCollected()
    {
        $this->update([
            'status' => 'collected',
            'collected_at' => now(),
        ]);
    }
}