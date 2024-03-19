<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Frontend/Gallery');
    }

    public function allGalleries(): Collection|array
    {
        return Gallery::query()->get();
    }

    public function galleryImages(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->with('images')->firstOrFail();

        if (!$gallery) {
            abort(404, 'Gallery not found');
        }

        $processedImages = [];
        foreach ($gallery->images as $image) {
            $dims = getimagesize(storage_path('app/public/' . $image->thumbnail_link));
            $processedImages[] = [
                'uuid' => $image->uuid,
                'src' => url('/' . $image->thumbnail_link),
                'original' => url("https://lindsey-reid-photography.s3.amazonaws.com/" . $image->link),
                'width' => $dims[0],
                'height' => $dims[1],
            ];
        }

        return response()->json([
            'gallery' => $gallery,
            'images' => $processedImages,
        ]);
    }

    public function galleryView(Request $request): Response
    {
        $gallery = Gallery::query()
            ->where('uuid', $request->get('gallery'))
            ->firstOrFail();

        if (!$gallery) {
            abort(404, 'Gallery not found');
        }

        return Inertia::render('Frontend/ViewGallery')->with('gallery', $gallery);
    }
}
