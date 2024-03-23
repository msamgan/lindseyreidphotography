<?php

use App\Http\Controllers\Backend\GalleryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('backend/gallery')->group(function () {
    Route::get('/', [GalleryController::class, 'index'])->name('admin.gallery');
    Route::get('create', [GalleryController::class, 'create'])->name('admin.gallery.create');
    Route::post('store', [GalleryController::class, 'store'])->name('admin.gallery.store');

    Route::get('edit', [GalleryController::class, 'edit'])->name('admin.gallery.edit');
    Route::post('update', [GalleryController::class, 'update'])->name('admin.gallery.update');

    Route::get('all', [GalleryController::class, 'allGalleries'])->name('admin.gallery.all');

    Route::get('add-images', [GalleryController::class, 'addImages'])->name('admin.gallery.add-images');
    Route::post('image/store', [GalleryController::class, 'imageStore'])->name('admin.image.store');
    Route::post('gallery/image/store', [GalleryController::class, 'galleryImageStore'])->name('admin.gallery.image.store');
    Route::delete('gallery/delete', [GalleryController::class, 'deleteGallery'])->name('admin.gallery.delete');

    Route::get('view/', [GalleryController::class, 'viewGallery'])->name('admin.gallery.view');
    Route::get('images/', [GalleryController::class, 'galleryImages'])->name('admin.gallery.images');
    Route::put('cover/update/', [GalleryController::class, 'updateGalleryCover'])->name('admin.gallery.image.cover-update');
    Route::delete('image/delete/', [GalleryController::class, 'deleteGalleryImage'])->name('admin.gallery.image.delete');


    Route::get('count', [GalleryController::class, 'galleryCount'])->name('admin.gallery.count');
    Route::get('image/count', [GalleryController::class, 'imageCount'])->name('admin.gallery.image.count');
});
