<?php

use App\Models\Gallery;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Gallery::query()->create([
            'uuid' => Gallery::PORTFOLIO_UUID,
            'name' => 'Portfolio',
            'is_public' => true,
            'can_download' => false,
            'created_at' => now(),
            'updated_at' => now(),
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
