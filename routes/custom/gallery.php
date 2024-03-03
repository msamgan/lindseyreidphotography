<?php

use App\Http\Controllers\Backend\GalleryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('backend/gallery')->group(function () {
    Route::get('/', [GalleryController::class, 'index'])->name('admin.gallery');
    Route::post('/store', [GalleryController::class, 'store'])->name('admin.gallery.store');
    Route::get('/all', [GalleryController::class, 'allGalleries'])->name('admin.gallery.all');
    Route::get('/add-images', [GalleryController::class, 'addImages'])->name('admin.gallery.add-images');
    Route::post('/image/store', [GalleryController::class, 'imageStore'])->name('admin.image.store');
    Route::post('/gallery/image/store', [GalleryController::class, 'galleryImageStore'])->name('admin.gallery.image.store');
});


