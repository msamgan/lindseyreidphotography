<?php

namespace App\Repositories;

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
}
