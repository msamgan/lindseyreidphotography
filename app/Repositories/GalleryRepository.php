<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\ImageManager;

class GalleryRepository
{
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
            $files = glob($dirPath.'/*');
            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }

            rmdir($dirPath);
        }
    }
}
