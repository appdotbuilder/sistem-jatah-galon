<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGallonRequestRequest;
use App\Models\Employee;
use App\Models\GallonRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    /**
     * Display the main gallon quota system interface.
     */
    public function index()
    {
        return Inertia::render('gallon-system');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('gallon-system');
    }


}