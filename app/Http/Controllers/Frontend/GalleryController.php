<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Repositories\GalleryRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

        if (! $gallery) {
            abort(404, 'Gallery not found');
        }

        $processedImages = [];
        foreach ($gallery->images as $image) {
            $dims = getimagesize(storage_path('app/public/' . $image->thumbnail_link));
            $processedImages[] = [
                'uuid' => $image->uuid,
                'src' => url('/storage/' . $image->thumbnail_link),
                'original' => url('https://lindsey-reid-photography.s3.amazonaws.com/' . $image->link),
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

        if (! $gallery) {
            abort(404, 'Gallery not found');
        }

        if (! $gallery->is_public) {
            $accessToken = $request->get('token');

            if (! $accessToken) {
                return Inertia::render('Frontend/ViewGalleryPassword')->with('gallery', $gallery);
            }

            $token = cache()->get($gallery->uuid);

            if ($token !== $accessToken) {
                return Inertia::render('Frontend/ViewGalleryPassword')->with('gallery', $gallery);
            }
        }

        return Inertia::render('Frontend/ViewGallery')->with('gallery', $gallery);
    }

    public function galleryPassword(Request $request): JsonResponse
    {
        $gallery = Gallery::query()
            ->where('uuid', $request->get('gallery'))
            ->firstOrFail();

        if (! $gallery) {
            return response()->json([
                'status' => false,
                'message' => 'Gallery not found.',
            ]);
        }

        if (Hash::check($request->get('password'), $gallery->password)) {
            $randomToken = md5(uniqid(rand(), true));

            // store token in cache for 24 hours with gallery uuid
            cache()->put($gallery->uuid, $randomToken, 60 * 24);

            return response()->json([
                'status' => true,
                'token' => $randomToken,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid password.',
        ]);
    }

    public function galleryPortfolio(): array
    {
        $gallery = Gallery::query()->where('uuid', Gallery::PORTFOLIO_UUID)->with('images')->first();

        $processedImages = GalleryRepository::processGalleryImages($gallery);

        return [
            'gallery' => $gallery,
            'images' => $processedImages,
        ];
    }
}
