<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Frontend/Welcome');
    }
}
