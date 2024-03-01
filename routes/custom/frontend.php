<?php

use App\Models\Package;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Frontend/Welcome');
});

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
})->name('contact');

Route::get('/gallery', function () {
    return Inertia::render('Frontend/Contact');
})->name('gallery');

Route::get('/pricing', function () {
    $primaryPackages = Package::query()->where('type', 'primary')->with('package_services')->get();
    $secondaryPackages = Package::query()->where('type', 'secondary')->with('package_services')->get();

    return Inertia::render('Frontend/Pricing')
        ->with([
            'primaryPackages' => $primaryPackages,
            'secondaryPackages' => $secondaryPackages,
        ]);
})->name('pricing');
