<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Employee
 *
 * @property int $id
 * @property string $employee_id
 * @property string $name
 * @property string $department
 * @property string $grade
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\GallonRequest> $gallonRequests
 * @property-read int|null $gallon_requests_count
 * @property-read int $monthly_quota
 * @property-read int $current_month_used
 * @property-read int $remaining_quota
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee query()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereGrade($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee active()
 * @method static \Database\Factories\EmployeeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'name',
        'department',
        'grade',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the gallon requests for the employee.
     */
    public function gallonRequests(): HasMany
    {
        return $this->hasMany(GallonRequest::class);
    }

    /**
     * Scope a query to only include active employees.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the monthly quota based on employee grade.
     *
     * @return int
     */
    public function getMonthlyQuotaAttribute(): int
    {
        return match($this->grade) {
            'G7', 'G8' => 24,
            'G9' => 12,
            'G10' => 10,
            'G11', 'G12', 'G13' => 7,
            default => 0,
        };
    }

    /**
     * Get the current month's used gallons.
     *
     * @return int
     */
    public function getCurrentMonthUsedAttribute(): int
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;

        return $this->gallonRequests()
            ->where('month', $currentMonth)
            ->where('year', $currentYear)
            ->where('status', 'collected')
            ->sum('quantity');
    }

    /**
     * Get the remaining quota for current month.
     *
     * @return int
     */
    public function getRemainingQuotaAttribute(): int
    {
        return max(0, $this->monthly_quota - $this->current_month_used);
    }

    /**
     * Get historical gallon collection records.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getHistoricalRecords()
    {
        return $this->gallonRequests()
            ->where('status', 'collected')
            ->orderBy('collected_at', 'desc')
            ->get();
    }

    /**
     * Get pending requests for current month.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getPendingRequests()
    {
        return $this->gallonRequests()
            ->whereIn('status', ['pending', 'approved_warehouse'])
            ->where('month', now()->month)
            ->where('year', now()->year)
            ->orderBy('requested_at', 'desc')
            ->get();
    }
}