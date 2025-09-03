<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GallonRequest;
use Illuminate\Http\Request;

class GallonCollectController extends Controller
{
    /**
     * Store gallon collection confirmation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'request_id' => 'required|integer|exists:gallon_requests,id',
        ]);

        $gallonRequest = GallonRequest::findOrFail($request->request_id);
        
        if ($gallonRequest->status !== 'approved_warehouse') {
            return back()->withErrors([
                'request_id' => 'Request tidak dalam status siap diambil.'
            ]);
        }

        $gallonRequest->markAsCollected();

        return back()->with('success', "Berhasil konfirmasi pengambilan {$gallonRequest->quantity} galon.");
    }
}