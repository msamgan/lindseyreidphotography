<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UploadImageToS3 implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private readonly string $dirName,
        private readonly string $fileName,
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $image = new UploadedFile(
            storage_path('app/public/'.$this->dirName.'/'.$this->fileName),
            $this->fileName
        );

        $image->storeAs($this->dirName, $this->fileName, 's3');

        unlink(storage_path('app/public/'.$this->dirName.'/'.$this->fileName));

        // if you want to delete the directory, after all, the files are uploaded and the directory is empty
        if (count(glob(storage_path('app/public/'.$this->dirName.'/*'))) === 0) {
            rmdir(storage_path('app/public/'.$this->dirName));
        }
    }
}
