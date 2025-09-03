<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGallonRequestRequest;
use App\Models\Employee;
use App\Models\GallonRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GallonRequestController extends Controller
{
    /**
     * Display a listing of gallon requests for admin.
     */
    public function index(Request $request)
    {
        $query = GallonRequest::with('employee')->latest('requested_at');
        
        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        
        // Filter by date
        if ($request->has('date') && $request->date) {
            $query->whereDate('requested_at', $request->date);
        } else {
            // Default to today's requests
            $query->whereDate('requested_at', today());
        }
        
        $requests = $query->paginate(20);
        
        return Inertia::render('admin/gallon-requests/index', [
            'requests' => $requests,
            'filters' => $request->only(['status', 'date']),
        ]);
    }

    /**
     * Store a newly created gallon request.
     */
    public function store(StoreGallonRequestRequest $request)
    {
        $employee = Employee::where('employee_id', $request->employee_id)->firstOrFail();
        
        // Check if employee has enough quota
        $remainingQuota = $employee->remaining_quota;
        if ($request->quantity > $remainingQuota) {
            return back()->withErrors([
                'quantity' => "Kuota tidak mencukupi. Sisa kuota: {$remainingQuota} galon."
            ]);
        }
        
        $gallonRequest = GallonRequest::create([
            'employee_id' => $employee->id,
            'quantity' => $request->quantity,
            'status' => 'pending',
            'requested_at' => now(),
            'month' => now()->month,
            'year' => now()->year,
        ]);
        
        return back()->with('success', "Permintaan {$request->quantity} galon berhasil diajukan.");
    }

    /**
     * Approve request by warehouse admin.
     */
    public function update(Request $request, GallonRequest $gallonRequest)
    {
        $action = $request->input('action');
        
        if ($action === 'approve_warehouse') {
            $gallonRequest->approveByWarehouse();
            $message = 'Request approved by warehouse.';
        } elseif ($action === 'collect') {
            $gallonRequest->markAsCollected();
            $message = 'Gallons marked as collected.';
        } else {
            return back()->withErrors(['action' => 'Invalid action.']);
        }
        
        return back()->with('success', $message);
    }


}