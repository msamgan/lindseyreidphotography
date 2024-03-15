<?php

namespace App\Repositories;

class GalleryRepository
{
    public function getImageNameWithExtension($image): string
    {
        return explode('.', $image->getClientOriginalName())[0];
    }

    public function getDimensions($image): array
    {
        return getimagesize($image);
    }
}
