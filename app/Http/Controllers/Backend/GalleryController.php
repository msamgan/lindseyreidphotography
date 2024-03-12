<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class GalleryController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        return inertia('Backend/Gallery/Gallery');
    }

    public function viewGallery(Request $request): Response|ResponseFactory
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        if (!$gallery) {
            abort(404, 'Gallery not found');
        }

        return inertia('Backend/Gallery/ViewGallery')->with('gallery', $gallery);
    }

    public function allGalleries(): Collection
    {
        return Gallery::query()->orderByDesc('created_at')->with('images')->get();
    }

    public function addImages(Request $request): Response|ResponseFactory
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        return inertia('Backend/Gallery/AddImages')->with('gallery', $gallery);
    }

    public function imageStore(Request $request): JsonResponse
    {
        $image = $request->file('file');

        $imageData = $image->store('public/images');

        // remove the public/ from the path to store in the database
        $imageData = str_replace('public/', '', $imageData);

        return response()->json(['image' => $imageData]);
    }

    public function store(Request $request): RedirectResponse
    {
        $name = $request->get('name');
        $password = $request->get('password') ? Hash::make($request->get('password')) : null;

        $gallery = Gallery::create([
            'uuid' => Str::uuid(),
            'name' => $name,
            'password' => $password,
        ]);

        return redirect()->route('admin.gallery');
    }

    public function galleryImageStore(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery_uuid');
        $image = $request->get('image');

        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        GalleryImage::create([
            'gallery_id' => $gallery->id,
            'uuid' => Str::uuid(),
            'link' => $image,
        ]);

        return response()->json(['message' => 'Images added to gallery']);
    }

    public function galleryImages(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->with('images')->firstOrFail();
        $galleryImages = $gallery->images;

        return response()->json([
            'gallery' => $gallery,
            'images' => $galleryImages,
        ]);
    }

    public function deleteGallery(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        GalleryImage::query()->where('gallery_id', $gallery->id)->get()->each(function ($image) {
            $imagePath = storage_path('app/public/' . $image->link);

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $image->delete();
        });
        
        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted']);
    }

    public function deleteGalleryImage(Request $request): JsonResponse
    {
        $imageUuid = $request->get('image');
        $image = GalleryImage::query()->where('uuid', $imageUuid)->firstOrFail();

        $imagePath = storage_path('app/public/' . $image->link);

        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        $image->delete();

        return response()->json(['message' => 'Image deleted']);
    }
}
