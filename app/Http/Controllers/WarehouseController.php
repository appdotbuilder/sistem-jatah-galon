<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GallonRequest;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    /**
     * Display pending requests for warehouse admin.
     */
    public function index()
    {
        $pendingRequests = GallonRequest::with('employee')
            ->pending()
            ->latest('requested_at')
            ->paginate(20);
            
        return Inertia::render('admin/warehouse/pending-requests', [
            'requests' => $pendingRequests
        ]);
    }

    /**
     * Display approved requests ready for collection.
     */
    public function show($type = 'ready')
    {
        $approvedRequests = GallonRequest::with('employee')
            ->approvedWarehouse()
            ->latest('approved_at')
            ->paginate(20);
            
        return Inertia::render('admin/warehouse/ready-collection', [
            'requests' => $approvedRequests
        ]);
    }
}