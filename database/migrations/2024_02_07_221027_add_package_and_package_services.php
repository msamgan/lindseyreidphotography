<?php

use App\Models\Package;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Package::create([
            'name' => 'Package 1',
            'price' => 1500,
        ]);

        Package::create([
            'name' => 'Package 2',
            'price' => 1800,
        ]);

        Package::create([
            'name' => 'Package 3',
            'price' => 2400,
        ]);

        Package::create([
            'name' => 'Family Portrait',
            'price' => 200,
            'type' => 'secondary',
        ]);

        Package::create([
            'name' => 'Engagement Session',
            'price' => 250,
            'type' => 'secondary',
        ]);

        Package::create([
            'name' => 'New Born and Children',
            'price' => 300,
            'type' => 'secondary',
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
