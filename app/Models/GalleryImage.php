<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 */
class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = ['gallery_id', 'uuid', 'link', 'thumbnail_link'];
}
