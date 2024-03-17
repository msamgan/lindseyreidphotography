<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Jobs\UploadImageToS3;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Repositories\GalleryRepository;
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
    public function __construct(
        private readonly GalleryRepository $galleryRepository
    )
    {
        //
    }

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
        $galleryUuid = $request->get('gallery');
        $imageName = Str::slug($this->galleryRepository->getImageNameWithExtension($image)) . '-' . time();
        $fileName = $imageName . '.' . $image->getClientOriginalExtension();
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        $dirName = Str::slug($gallery->name);

        $image->storeAs($dirName, $fileName, 's3');
        $thumbnailPath = $this->galleryRepository->creteThumbnail($image, $dirName, $imageName);

        // UploadImageToS3::dispatch($dirName, $fileName);

        return response()->json([
            'image' => 'https://lindsey-reid-photography.s3.amazonaws.com/' . $dirName . '/' . $fileName,
            'thumbnail' => $thumbnailPath,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $name = $request->get('name');
        $password = $request->get('password') ? Hash::make($request->get('password')) : null;

        Gallery::create([
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
        $thumbnail = $request->get('thumbnail');

        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        GalleryImage::create([
            'gallery_id' => $gallery->id,
            'uuid' => Str::uuid(),
            'link' => $image,
            'thumbnail_link' => $thumbnail,
        ]);

        return response()->json(['message' => 'Images added to gallery']);
    }

    public function galleryImages(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->with('images')->firstOrFail();

        $processedImages = [];
        foreach ($gallery->images as $image) {
            $dims = getimagesize(storage_path('app/public/' . $image->thumbnail_link));
            $processedImages[] = [
                'uuid' => $image->uuid,
                'src' => url('/' . $image->thumbnail_link),
                'original' => url($image->link),
                'width' => $dims[0],
                'height' => $dims[1],
            ];
        }

        return response()->json([
            'gallery' => $gallery,
            'images' => $processedImages,
        ]);
    }

    public function deleteGallery(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        GalleryImage::query()->where('gallery_id', $gallery->id)->get()->each(function ($image) {
            $imagePath = storage_path('app/public/' . $image->link);
            $imageThumbnailPath = storage_path('app/public/' . $image->thumbnail_link);

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            if (file_exists($imageThumbnailPath)) {
                unlink($imageThumbnailPath);
            }

            $image->delete();
        });

        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted']);
    }

    public function deleteGalleryImage(Request $request): JsonResponse
    {
        $imagesUuid = $request->get('images');

        foreach ($imagesUuid as $imageUuid) {
            $image = GalleryImage::query()->where('uuid', $imageUuid)->firstOrFail();

            // $imagePath = storage_path('app/public/' . $image->link);
            $imageThumbnailPath = storage_path('app/public/' . $image->thumbnail_link);

            /*if (file_exists($imagePath)) {
                unlink($imagePath);
            }*/

            if (file_exists($imageThumbnailPath)) {
                unlink($imageThumbnailPath);
            }

            $image->delete();
        }

        return response()->json(['message' => 'Image deleted']);
    }
}
