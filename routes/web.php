<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeLookupController;
use App\Http\Controllers\EmployeeVerifyController;
use App\Http\Controllers\GallonCollectController;
use App\Http\Controllers\GallonRequestController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\WarehouseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main welcome page
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public routes for employee gallon system
Route::get('/gallon-system', [PublicController::class, 'index'])->name('gallon.system');

// Employee lookup and actions (using REST controllers)
Route::post('/employee-lookup', [EmployeeLookupController::class, 'store'])->name('employee.lookup');
Route::post('/employee-verify', [EmployeeVerifyController::class, 'store'])->name('employee.verify');
Route::post('/gallon-collect', [GallonCollectController::class, 'store'])->name('gallon.collect');
Route::post('/gallon-request', [GallonRequestController::class, 'store'])->name('gallon.request');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin-dashboard');
    })->name('dashboard');
});

// HR Admin routes - Employee management
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('employees', EmployeeController::class);
});

// Administrator routes - Request management and reports
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/requests', [GallonRequestController::class, 'index'])->name('admin.requests');
    Route::get('admin/reports', function () {
        return Inertia::render('admin/reports');
    })->name('admin.reports');
});

// Warehouse Admin routes - Approve requests
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('warehouse/pending', [WarehouseController::class, 'index'])->name('warehouse.pending');
    Route::get('warehouse/ready', [WarehouseController::class, 'show'])->name('warehouse.ready');
    Route::patch('gallon-requests/{gallonRequest}', [GallonRequestController::class, 'update'])->name('gallon-requests.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
