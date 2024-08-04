<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Jobs\UploadImageToS3;
use App\Models\Gallery;
use App\Models\GalleryImage;
use App\Repositories\GalleryRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;
use Inertia\ResponseFactory;

class GalleryController extends Controller
{
    public function __construct(
        private readonly GalleryRepository $galleryRepository
    ) {
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

        if (! $gallery) {
            abort(404, 'Gallery not found');
        }

        return inertia('Backend/Gallery/ViewGallery')->with('gallery', $gallery);
    }

    public function allGalleries(): Collection
    {
        return Gallery::query()->orderByDesc('created_at')->get();
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
        $dirName = $gallery->uuid;

        DB::beginTransaction();

        try {
            GalleryImage::create([
                'gallery_id' => $gallery->id,
                'uuid' => Str::uuid(),
                'file_name' => $fileName,
            ]);

            $image->storeAs($dirName, $fileName, 'local');

            UploadImageToS3::dispatch($dirName, $fileName);

            DB::commit();

            return response()->json('Image uploaded successfully', 200);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function create(): Response|ResponseFactory
    {
        return inertia('Backend/Gallery/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        Gallery::create($this->galleryRepository->processGalleryObject($request));

        return redirect()->route('admin.gallery');
    }

    public function update(Request $request): RedirectResponse
    {
        $galleryUuid = $request->get('gallery');

        Gallery::query()->where('uuid', $galleryUuid)->update(
            $this->galleryRepository->processGalleryObject($request, $galleryUuid)
        );

        return redirect()->route('admin.gallery');
    }

    public function edit(Request $request): Response|ResponseFactory
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        return inertia('Backend/Gallery/Edit')->with('gallery', $gallery);
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

        $processedImages = $this->galleryRepository->processGalleryImages($gallery);

        return response()->json([
            'gallery' => $gallery,
            'images' => $processedImages,
        ]);
    }

    public function updateGalleryCover(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $imageUuid = $request->get('image');

        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();
        $image = GalleryImage::query()->where('uuid', $imageUuid)->firstOrFail();

        $gallery->cover = $image->file_name;
        $gallery->save();

        return response()->json(['message' => 'Cover updated']);
    }

    public function deleteGallery(Request $request): JsonResponse
    {
        $galleryUuid = $request->get('gallery');
        $gallery = Gallery::query()->where('uuid', $galleryUuid)->firstOrFail();

        $this->galleryRepository->deleteThumbnailDir(storage_path('app/public/thumbnails/' . $gallery->uuid));
        GalleryImage::query()->where('gallery_id', $gallery->id)->delete();

        Storage::disk('s3')->deleteDirectory($gallery->uuid);

        $gallery->delete();

        return response()->json(['message' => 'Gallery deleted']);
    }

    public function deleteGalleryImage(Request $request): JsonResponse
    {
        $imagesUuid = $request->get('images');

        foreach ($imagesUuid as $imageUuid) {
            $image = GalleryImage::query()->where('uuid', $imageUuid)->firstOrFail();

            $imageThumbnailPath = storage_path('app/public/' . $image->thumbnail_link);

            if (file_exists($imageThumbnailPath)) {
                unlink($imageThumbnailPath);
            }

            Storage::disk('s3')->delete($image->link);

            $image->delete();
        }

        return response()->json(['message' => 'Image deleted']);
    }

    public function galleryCount(): int
    {
        return Gallery::query()->count();
    }

    public function imageCount(): int
    {
        return GalleryImage::query()->count();
    }
}
