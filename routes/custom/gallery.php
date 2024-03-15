<?php

use App\Http\Controllers\Backend\GalleryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('backend/gallery')->group(function () {
    Route::get('/', [GalleryController::class, 'index'])->name('admin.gallery');
    Route::post('store', [GalleryController::class, 'store'])->name('admin.gallery.store');
    Route::get('all', [GalleryController::class, 'allGalleries'])->name('admin.gallery.all');

    Route::get('add-images', [GalleryController::class, 'addImages'])->name('admin.gallery.add-images');
    Route::post('image/store', [GalleryController::class, 'imageStore'])->name('admin.image.store');
    Route::post('gallery/image/store', [GalleryController::class, 'galleryImageStore'])->name('admin.gallery.image.store');
    Route::delete('gallery/delete', [GalleryController::class, 'deleteGallery'])->name('admin.gallery.delete');

    Route::get('view/', [GalleryController::class, 'viewGallery'])->name('admin.gallery.view');
    Route::get('images/', [GalleryController::class, 'galleryImages'])->name('admin.gallery.images');
    Route::delete('image/delete/', [GalleryController::class, 'deleteGalleryImage'])->name('admin.gallery.image.delete');
});
