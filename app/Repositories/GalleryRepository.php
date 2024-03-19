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

    public function creteThumbnail($image, $dirName, $imageName): string
    {
        $manager = new ImageManager(new Driver());
        $thumbnailImage = $manager->read($image->getPath() . '/' . $image->getFilename());

        $thumbnailImage->scaleDown(null, 600);

        $thumbnailDirectory = storage_path('app/public/thumbnails/');

        if (!file_exists($thumbnailDirectory)) {
            mkdir($thumbnailDirectory, 0777, true);
        }

        $dirPath = storage_path('app/public/thumbnails/' . $dirName);

        if (!file_exists($dirPath)) {
            mkdir($dirPath, 0777, true);
        }

        $thumbnailPath = $dirPath . '/' . $imageName . '.jpg';

        $accessPath = 'thumbnails/' . $dirName . '/' . $imageName . '.jpg';

        $thumbnailImage->save($thumbnailPath);

        return $accessPath;
    }

    public function processGalleryObject($request, $galleryUuid = null): array
    {
        $name = $request->get('name');
        $password = $request->get('password') ? Hash::make($request->get('password')) : null;
        $canDownload = $request->get('can_download');
        $downloadDuration = $canDownload
            ? (now()->addDays((int)$request->get('download_duration')))->format('Y-m-d H:i:s')
            : null;
        $isPublic = $password === null;

        $galleryData = [
            'name' => $name,
            'password' => $password,
            'is_public' => $isPublic,
            'can_download' => $canDownload,
            'download_duration' => $downloadDuration,
        ];

        if (!$galleryUuid) {
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
