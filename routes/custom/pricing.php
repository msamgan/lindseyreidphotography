<?php

use App\Http\Controllers\Backend\PricingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('backend')->group(function () {
    Route::get('/pricing', [PricingController::class, 'index'])->name('admin.pricing');
    Route::post('/pricing', [PricingController::class, 'update'])->name('admin.pricing.update');
});
