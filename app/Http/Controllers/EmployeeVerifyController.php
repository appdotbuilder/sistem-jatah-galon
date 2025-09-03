<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\GallonRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeVerifyController extends Controller
{
    /**
     * Store employee verification request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|string',
        ]);

        $employee = Employee::where('employee_id', $request->employee_id)
            ->where('is_active', true)
            ->firstOrFail();

        // Get approved requests ready for collection
        $readyRequests = $employee->gallonRequests()
            ->where('status', 'approved_warehouse')
            ->where('month', now()->month)
            ->where('year', now()->year)
            ->orderBy('approved_at', 'asc')
            ->get();

        if ($readyRequests->isEmpty()) {
            return back()->withErrors([
                'employee_id' => 'Tidak ada galon yang siap untuk diambil.'
            ]);
        }

        return Inertia::render('employee-verify', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'grade' => $employee->grade,
            ],
            'readyRequests' => $readyRequests,
        ]);
    }
}