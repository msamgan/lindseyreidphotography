<?php

use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\GalleryController;
use App\Http\Controllers\Frontend\PricingController;
use App\Http\Controllers\Frontend\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::get('/gallery/all', [GalleryController::class, 'allGalleries'])->name('gallery.all'); // json url
Route::get('/gallery/view', [GalleryController::class, 'galleryView'])->name('gallery.view');
Route::get('/gallery/images', [GalleryController::class, 'galleryImages'])->name('gallery.images');

Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
