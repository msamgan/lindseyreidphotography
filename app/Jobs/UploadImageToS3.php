<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\UploadedFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Intervention\Image\ImageManager;

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
        $imagePath = storage_path('app/'.$this->dirName.'/'.$this->fileName);

        $image = new UploadedFile(
            $imagePath,
            $this->fileName
        );

        $image->storeAs($this->dirName, $this->fileName, 's3');

        if (! is_dir(storage_path('app/public/thumbnail'))) {
            mkdir(storage_path('app/public/thumbnail'));
        }

        if (! is_dir(storage_path('app/public/thumbnail/'.$this->dirName))) {
            mkdir(storage_path('app/public/thumbnail/'.$this->dirName));
        }

        $image = ImageManager::imagick()->read($imagePath);
        $image->resize(600)->save(storage_path('app/public/thumbnail/'.$this->dirName.'/'.$this->fileName));

        unlink($imagePath);

        // if you want to delete the directory, after all, the files are uploaded and the directory is empty
        if (count(glob(storage_path('app/'.$this->dirName.'/*'))) === 0) {
            rmdir(storage_path('app/'.$this->dirName));
        }
    }
}
