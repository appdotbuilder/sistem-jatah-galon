<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeLookupController extends Controller
{
    /**
     * Store employee lookup request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
        ]);

        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('is_active', true)
            ->first();

        if (!$employee) {
            return back()->withErrors([
                'employee_id' => 'Employee ID not found or inactive.'
            ]);
        }

        // Get employee data with quota information
        $historicalRecords = $employee->getHistoricalRecords();
        $pendingRequests = $employee->getPendingRequests();

        return Inertia::render('employee-dashboard', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'grade' => $employee->grade,
                'monthly_quota' => $employee->monthly_quota,
                'current_month_used' => $employee->current_month_used,
                'remaining_quota' => $employee->remaining_quota,
            ],
            'historicalRecords' => $historicalRecords,
            'pendingRequests' => $pendingRequests,
        ]);
    }
}