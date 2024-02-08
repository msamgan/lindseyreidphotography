<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__.'/custom/frontend.php';

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/custom/pricing.php';
require __DIR__.'/custom/profile.php';
require __DIR__.'/auth.php';
