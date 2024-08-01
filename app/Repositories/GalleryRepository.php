<?php

namespace App\Repositories;

use Illuminate\Contracts\Routing\UrlGenerator;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GalleryRepository
{
    public const S3_LINK = 'https://lindsey-reid-photography.s3.amazonaws.com/';

    public static function processGalleryImages($gallery): array
    {
        $processedImages = [];
        foreach ($gallery->images as $image) {
            $dims = getimagesize(self::getImageThumbnailPath($gallery->uuid, $image->file_name));
            $processedImages[] = [
                'uuid' => $image->uuid,
                'src' => self::getImageThumbnailLink($gallery->uuid, $image->file_name),
                'original' => self::getImageLink($gallery->uuid, $image->file_name),
                'width' => $dims[0],
                'height' => $dims[1],
            ];
        }

        return $processedImages;
    }

    public static function getImageThumbnailPath($galleryUUid, $fileName): string
    {
        return storage_path('app/public/thumbnail/' . $galleryUUid . '/' . $fileName);
    }

    public static function getImageThumbnailLink($galleryUUid, $fileName): Application|string|UrlGenerator
    {
        return url('storage/thumbnail/' . $galleryUUid . '/' . $fileName);
    }

    public static function getImageLink($galleryUUid, $fileName): string
    {
        return url(self::S3_LINK . $galleryUUid . '/' . $fileName);
    }

    public static function getGalleryCoverLink($gallery): Application|string|UrlGenerator
    {
        return self::getImageThumbnailLink($gallery->uuid, $gallery->cover);
    }

    public function getImageNameWithExtension($image): string
    {
        return explode('.', $image->getClientOriginalName())[0];
    }

    public function processGalleryObject($request, $galleryUuid = null): array
    {
        $name = $request->get('name');
        $password = $request->get('password') ? Hash::make($request->get('password')) : null;
        $canDownload = $request->get('can_download');
        $downloadDuration = $canDownload
            ? (now()->addDays((int) $request->get('download_duration')))->format('Y-m-d H:i:s')
            : null;
        $isPublic = $password === null;

        $galleryData = [
            'name' => $name,
            'password' => $password,
            'is_public' => $isPublic,
            'can_download' => $canDownload,
            'download_duration' => $downloadDuration,
        ];

        if (! $galleryUuid) {
            $galleryData['uuid'] = Str::uuid();
        }

        return $galleryData;
    }

    public function deleteThumbnailDir($dirPath): void
    {
        if (file_exists($dirPath)) {
            $files = glob($dirPath . '/*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }

            rmdir($dirPath);
        }
    }
}
