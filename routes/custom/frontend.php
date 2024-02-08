<?php

use App\Models\Package;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/gallery', function () {
    return Inertia::render('Contact');
})->name('gallery');

Route::get('/pricing', function () {
    $primaryPackages = Package::query()->where('type', 'primary')->with('package_services')->get();
    $secondaryPackages = Package::query()->where('type', 'secondary')->with('package_services')->get();

    return Inertia::render('Pricing')
        ->with([
            'primaryPackages' => $primaryPackages,
            'secondaryPackages' => $secondaryPackages,
        ]);
})->name('pricing');
