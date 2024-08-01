<?php

namespace App\Models;

use App\Repositories\GalleryRepository;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @method static create(array $array)
 */
class Gallery extends Model
{
    use HasFactory;

    public const PORTFOLIO_UUID = '30691678-8fe9-4b5b-b866-667595344824';

    protected $hidden = ['password', 'id', 'updated_at'];

    protected $appends = ['cover_link'];

    public function getCoverLinkAttribute(): string
    {
        return GalleryRepository::getGalleryCoverLink($this);
    }

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
