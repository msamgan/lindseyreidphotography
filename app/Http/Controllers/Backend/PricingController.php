<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\ResponseFactory;

class PricingController extends Controller
{
    public function index(): Response|ResponseFactory
    {
        $packages = Package::query()->with('package_services')->get();

        return inertia('Backend/Pricing')->with('packages', $packages);
    }

    public function update(Request $request): JsonResponse
    {
        $packageId = $request->get('package_id');
        $price = $request->get('price');

        try {
            Package::query()->where('id', $packageId)->update(['price' => $price]);
            return response()->json(['message' => 'Package price updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while updating package price'], 500);
        }
    }
}
