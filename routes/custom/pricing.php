<?php

use App\Http\Controllers\Backend\PricingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('backend/package')->group(function () {
    Route::get('/pricing', [PricingController::class, 'index'])->name('admin.pricing');
    Route::post('/update/pricing', [PricingController::class, 'updatePricing'])->name('admin.pricing.update');
    Route::post('/update/name', [PricingController::class, 'updateName'])->name('admin.name.update');
});
