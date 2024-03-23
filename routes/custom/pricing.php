<?php

use App\Http\Controllers\Backend\PricingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('backend/package')->group(function () {
    Route::get('/pricing', [PricingController::class, 'index'])->name('admin.pricing');
    Route::get('/pricing/packages', [PricingController::class, 'packages'])->name('admin.pricing.packages');
    Route::post('/update/pricing', [PricingController::class, 'updatePricing'])->name('admin.pricing.update');
    Route::post('/update/name', [PricingController::class, 'updateName'])->name('admin.name.update');

    Route::get('/count', [PricingController::class, 'packageCount'])->name('admin.packages.count');
});
