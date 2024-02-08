<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageService extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id',
        'details',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(Package::class);
    }
}
