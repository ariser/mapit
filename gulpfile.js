const gulp = require('gulp'),
    gutil = require('gulp-util'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    useref = require('gulp-useref'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),

    webpack = require('webpack-stream'),
    webpackDevConfig = require('./webpack.config.js'),
    webpackProductionConfig = require('./webpack.config.production.js'),
    del = require('del'),

    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),

    cleanCSS = require('gulp-clean-css'),
    uglifyJS = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    imageMin = require('gulp-imagemin'),
    imageResize = require('gulp-image-resize');

const config = {
    imageMin: {
        progressive: true,
        interlaced: true
    },
    htmlmin: {
        collapseWhitespace: true
    },
    paths: {
        npm: 'node_modules',
        src: {
            root: 'src',
            views: 'src/views',
            assets: 'src/assets',
            scripts: 'src/assets/scripts',
            styles: 'src/assets/styles',
            images: 'src/assets/images',
            fonts: 'src/assets/fonts'
        },
        build: {
            root: 'public',
            views: 'public',
            assets: 'public/assets',
            js: 'public/assets/js',
            css: 'public/assets/css',
            images: 'public/assets/img',
            fonts: 'public/assets/fonts'
        }
    }
};

gulp.task('images:clean', function () {
    return del([config.paths.build.images + '/**']);
});
gulp.task('images', function () {
    return gulp.src(config.paths.src.images + '/**/*')
        .pipe(imageResize({
            width: 250,
            height: 400,
            crop: true
        }))
        .pipe(imageMin(config.imageMin))
        .pipe(gulp.dest(config.paths.build.images));
});

gulp.task('views:clean', function () {
    return del([config.paths.build.views + '/**']);
});
gulp.task('views:dev', function () {
    return gulp.src(config.paths.src.views + '/**')
        .pipe(gulp.dest(config.paths.build.views));
});
gulp.task('views:production', function () {
    return gulp.src(config.paths.src.views + '/**/*.html')
        .pipe(useref())
        .pipe(gulp.dest(config.paths.build.views));
});
gulp.task('views:min', function () {
    return gulp.src(config.paths.build.views + '/**/*.html')
        .pipe(htmlmin(config.htmlmin))
        .pipe(gulp.dest(config.paths.build.views));
});

gulp.task('styles:clean', function () {
    return del([config.paths.build.styles + '/**']);
});
gulp.task('styles', ['css', 'sass']);
gulp.task('sass', function () {
    return sass(config.paths.src.styles + '/**/*.sass', {
        sourcemap: true,
        compass: true,
        loadPath: [
            config.paths.npm + '/normalize-scss/sass',
            config.paths.npm + '/bootstrap-sass/assets/stylesheets'
        ]
    })
        .pipe(prefix('> 1%', 'last 2 versions', 'Android > 4', 'Explorer > 8', 'Firefox ESR', 'Opera 12.1'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.build.css));
});
gulp.task('css', function () {
    return gulp.src([
        config.paths.src.styles + '/**/*.css',
        config.paths.src.styles + '/**/*.map'
    ])
        .pipe(gulp.dest(config.paths.build.css));
});
gulp.task('styles:min', ['styles'], function () {
    return gulp.src([config.paths.build.css + '/**/*.css', '!' + config.paths.build.css + '/**/*.min.css'])
        .pipe(plumber())
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.paths.build.css));
});

gulp.task('scripts:clean', function () {
    return del([config.paths.build.scripts + '/**']);
});
gulp.task('webpack', function () {
    gutil.log('Running Webpack using', process.env.NODE_ENV, 'config');
    return gulp.src('')
        .pipe(plumber())
        .pipe(webpack(process.env.NODE_ENV === 'production' ? webpackProductionConfig : webpackDevConfig))
        .pipe(gulp.dest(config.paths.build.js));
});
gulp.task('workers', function () {
    return gulp.src(config.paths.src.scripts + '/workers/**/*.js')
        .pipe(gulp.dest(config.paths.build.js + '/workers'));
});
gulp.task('scripts', ['webpack', 'workers']);
gulp.task('scripts:min', ['scripts'], function () {
    return gulp.src([config.paths.build.js + '/**/*.js', '!' + config.paths.build.js + '/**/*.min.js'])
        .pipe(plumber())
        .pipe(uglifyJS())
        .pipe(gulp.dest(config.paths.build.js));
});

gulp.task('fonts:clean', function () {
    return del([config.paths.build.fonts + '/**']);
});
gulp.task('fonts', function () {
    return gulp.src(config.paths.src.fonts + '/**/*')
        .pipe(gulp.dest(config.paths.build.fonts));
});

gulp.task('revision:clean', function () {
    return del([config.paths.build.assets + '/rev-manifest.json']);
});
gulp.task('revision', ['revision:assets', 'revision:views']);
gulp.task('revision:assets', function () {
    return gulp.src([
        config.paths.build.assets + '/**/*.css',
        config.paths.build.assets + '/**/*.js',
        '!' + config.paths.build.js + '/vendor/**/*'
    ])
        .pipe(rev())
        .pipe(gulp.dest(config.paths.build.assets))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.paths.build.assets));
});
gulp.task('revision:views', ['revision:assets'], function () {
    var manifest = gulp.src(config.paths.build.assets + '/rev-manifest.json');

    return gulp.src(config.paths.build.views + '/**/*.html')
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(config.paths.build.views));
});

gulp.task('clean', ['views:clean', 'styles:clean', 'scripts:clean', 'revision:clean', 'images:clean']);

gulp.task('flat-ui', ['flat-ui:styles', 'flat-ui:fonts']);
gulp.task('flat-ui:styles', function () {
    return gulp.src(config.paths.npm + '/flat-ui/css/flat-ui.css')
        .pipe(gulp.dest(config.paths.src.styles));
});
gulp.task('flat-ui:fonts', function () {
    return gulp.src([
        config.paths.npm + '/flat-ui/fonts/**/*',
        '!' + config.paths.npm + '/flat-ui/fonts/**/*.json'
    ])
        .pipe(gulp.dest(config.paths.src.fonts));
});

gulp.task('build:dev', ['set-dev-node-env'], function (next) {
    runSequence(
        'clean',
        ['fonts', 'images'],
        ['views:dev', 'styles', 'scripts'],
        next
    );
});

gulp.task('build:production', ['set-prod-node-env'], function (next) {
    runSequence(
        'clean', // clean assets dir
        ['fonts', 'images'],
        ['styles', 'styles:min', 'scripts', 'scripts:min'],
        'views:production',
        'views:min',
        'revision',
        next
    );
});

gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function () {
    return process.env.NODE_ENV = 'production';
});

gulp.task('watch', function () {
    gulp.watch(config.paths.src.styles + '/**/*', ['styles']);
    gulp.watch(config.paths.src.scripts + '/**/*', ['scripts']);
    gulp.watch(config.paths.src.views + '/**/*', ['views:dev']);
});


gulp.task('publish', ['build:production']);
gulp.task('build', ['build:dev']);
gulp.task('default', ['build', 'watch']);
