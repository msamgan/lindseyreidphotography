<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Frontend/Gallery');
    }

    public function publicGalleries(): Collection
    {
        return Gallery::query()->isPublic()->with('images')->get();
    }

    public function galleryView(Request $request): Response
    {
        $gallery = Gallery::query()
            ->where('uuid', $request->get('gallery'))
            ->firstOrFail();

        return Inertia::render('Frontend/GalleryView')->with('gallery', $gallery);
    }
}
