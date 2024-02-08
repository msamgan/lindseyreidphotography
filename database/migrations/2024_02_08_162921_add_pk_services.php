<?php

use App\Models\PackageService;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        PackageService::create([
            'package_id' => 1,
            'details' => '6 Hours Wedding Day Coverage',
        ]);

        PackageService::create([
            'package_id' => 1,
            'details' => '30 Minute Engagement Session',
        ]);

        PackageService::create([
            'package_id' => 1,
            'details' => 'Password Protected Online Gallery',
        ]);

        PackageService::create([
            'package_id' => 1,
            'details' => '200 or More Edited Images on USB',
        ]);

        PackageService::create([
            'package_id' => 1,
            'details' => 'Print Release',
        ]);

        PackageService::create([
            'package_id' => 2,
            'details' => '8 Hours Wedding Day Coverage',
        ]);

        PackageService::create([
            'package_id' => 2,
            'details' => '1 Hour Engagement Session',
        ]);

        PackageService::create([
            'package_id' => 2,
            'details' => 'Password Protected Online Gallery',
        ]);

        PackageService::create([
            'package_id' => 2,
            'details' => '300 or More Edited Images on USB',
        ]);

        PackageService::create([
            'package_id' => 2,
            'details' => 'Print Release',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => '10 Hours Wedding Day Coverage',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => 'Second Photographer',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => '1 Hour Engagement Session',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => 'Password Protected Online Gallery',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => '400 or More Edited Images on USB',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => 'Print Release',
        ]);

        PackageService::create([
            'package_id' => 3,
            'details' => 'Hand Cover Photo Album',
        ]);

        PackageService::create([
            'package_id' => 4,
            'details' => 'Up to 5 People',
        ]);

        PackageService::create([
            'package_id' => 5,
            'details' => '90 Minutes',
        ]);

        PackageService::create([
            'package_id' => 6,
            'details' => 'In Studio',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
