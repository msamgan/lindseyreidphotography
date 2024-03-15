<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Inertia\Inertia;
use Inertia\Response;

class PricingController extends Controller
{
    public function index(): Response
    {
        $primaryPackages = Package::query()->where('type', 'primary')
            ->with('package_services')->get();

        $secondaryPackages = Package::query()->where('type', 'secondary')
            ->with('package_services')->get();

        return Inertia::render('Frontend/Pricing')
            ->with([
                'primaryPackages' => $primaryPackages,
                'secondaryPackages' => $secondaryPackages,
            ]);
    }
}
