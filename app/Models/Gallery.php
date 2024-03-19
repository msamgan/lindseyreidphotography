<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 */
class Gallery extends Model
{
    use HasFactory;

    protected $hidden = ['password', 'id', 'updated_at'];

    protected $fillable = ['uuid', 'name', 'password', 'cover', 'can_download', 'download_duration', 'is_public'];

    public function scopeIsPublic($query)
    {
        return $query->where('is_public', true);
    }

    public function images(): HasMany
    {
        return $this->hasMany(GalleryImage::class);
    }
}
