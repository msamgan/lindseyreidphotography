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

    protected $fillable = ['uuid', 'name', 'password'];

    public function scopeIsPublic($query)
    {
        return $query->whereNull('password');
    }

    public function images(): HasMany
    {
        return $this->hasMany(GalleryImage::class);
    }
}
