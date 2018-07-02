const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:4000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Server Restarted...');
    });
});