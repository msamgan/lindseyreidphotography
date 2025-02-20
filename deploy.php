<?php

namespace Deployer;

require 'recipe/laravel.php';

// Config
set('repository', 'https://github.com/msamgan/lindseyreidphotography.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

host('159.89.180.3')
    ->set('remote_user', 'lbrkphoto')
    ->set('deploy_path', '~/htdocs/lbrkphoto.com')
    ->set('writable_mode', 'chmod');

desc('Build the assets');
task('deploy:build', function () {
    cd('{{release_path}}');
    run('npm install');
    run('npm run build');
});

task('deploy:optimize', function () {
    cd('{{current_path}}');
    run('php artisan optimize');
});

// Hooks
after('deploy:update_code', 'deploy:build');
after('deploy:symlink', 'deploy:optimize');
after('deploy:failed', 'deploy:unlock');
