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
        return inertia('Backend/Pricing');
    }

    public function packages(): JsonResponse
    {
        $packages = Package::query()->with('package_services')->get();

        return response()->json($packages);
    }

    public function updatePricing(Request $request): JsonResponse
    {
        $packageId = $request->get('id');
        $price = $request->get('data');

        try {
            Package::query()->where('id', $packageId)->update(['price' => $price]);

            return response()->json(['message' => 'Package price updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while updating package price'], 500);
        }
    }

    public function updateName(Request $request): JsonResponse
    {
        $packageId = $request->get('id');
        $name = $request->get('data');

        try {
            Package::query()->where('id', $packageId)->update(['name' => $name]);

            return response()->json(['message' => 'Package name updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while updating package name'], 500);
        }
    }
}
