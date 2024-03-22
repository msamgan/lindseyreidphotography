<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Frontend/Contact');
    }

    public function store(Request $request)
    {
        Lead::create($request->only(['name', 'email', 'phone', 'message']));

        if ($request->has('email')) {
            Mail::to([
                'photo@lindseybreid.com',
                'photographybylbr@gmail.com'
            ])->send(new \App\Mail\Lead($request->only([
                'name',
                'email',
                'phone',
                'message',
            ])));
        }

        return redirect()->route('contact');
    }
}
