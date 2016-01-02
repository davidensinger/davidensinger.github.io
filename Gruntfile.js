'use strict';

// Directory reference:
//   css: css
//   sass: _scss
//   javascript: js
//   images: img

module.exports = function (grunt) {
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // Configurable paths
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    devUpdate: {
      check: {
        options: {
          reportUpdated: false,
          updateType: 'report'
        }
      }
    },
    watch: {
      sass: {
        files: ['<%= yeoman.app %>/_scss/**/*.scss'],
        tasks: ['sass', 'postcss:server', 'penthouse']
      },
      autoprefixer: {
        files: ['<%= yeoman.app %>/css/styles.css'],
        tasks: ['copy:stageCss', 'postcss:server']
      },
      jekyll: {
        files: ['<%= yeoman.app %>/**/*.{html,md,rb,svg,xml,yml}'],
        tasks: ['jekyll:server']
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/css/**/*.css',
            '{.tmp,<%= yeoman.app %>}/js/**/*.js',
            '<%= yeoman.app %>/img/**/*.{gif,jpg,jpeg,png,svg}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              '<%= yeoman.app %>'
            ]
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: '<%= yeoman.dist %>'
          }
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/img', // don’t clean
            '<%= yeoman.dist %>/img/*', // clean these files because they get revved
            '!<%= yeoman.dist %>/img/srcset', // don’t clean this directory because these files don’t get revved :(
            '!<%= yeoman.dist %>/perf'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },
    scsslint: {
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        colorizeOutput: true,
        exclude: [
          '<%= yeoman.app %>/_scss/vendor/_flex-embed.scss',
          '<%= yeoman.app %>/_scss/vendor/_normalize.scss',
          '<%= yeoman.app %>/_scss/vendor/_pygments.scss'
        ]
      },
      server: '<%= yeoman.app %>/_scss/**/*.scss'
    },
    sass: {
      options: {
        precision: 5,
        sourceMap: false
      },
      dist: {
        files: {
          '.tmp/css/styles.css': '<%= yeoman.app %>/_scss/styles.scss'
        }
      },
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions, safari 6, ie 9, opera 12.1, ios 6, android 4'})
        ]
      },
      dist: {
        src: '.tmp/concat/css/styles.css',
        dest: '.tmp/styles.css'
      },
      server: {
        src: '.tmp/css/*.css',
      }
    },
    penthouse: {
      server : {
        outfile : '<%= yeoman.app %>/_includes/critical.css',
        css : '.tmp/css/styles.css',
        url : 'http://localhost:3000',
        width : 1280,
        height : 800
      }
    },
    csscomb: {
      dist: {
        files: {
          '.tmp/concat/css/styles.css': '.tmp/concat/css/styles.css'
        }
      }
    },
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%= yeoman.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        assetsDirs: '<%= yeoman.dist %>',
        blockReplacements: { // https://github.com/yeoman/grunt-usemin/issues/391
          js: function (block){
            return '<script async src="' + block.dest + '"><\/script>';
          }
        },
        patterns: {
          html: [
            [/<link[^\>]+href=['"]([^"']+)["']/gm, 'Update the link tags'],
            [/loadCSS\(['"]([^"']+)['"]\)/gm, 'Replacing reference to CSS within loadCSS']
          ]
        }
      },
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/css/**/*.css'],
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.html', '!perf/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Usemin adds files to concat
    concat: {},
    // Usemin adds files to uglify
    uglify: {},
    // Usemin adds files to cssmin
    // https://github.com/jakubpawlowicz/clean-css
    cssmin: {
      options: {
        check: 'min',
        shorthandCompacting: false
      }
    },
    responsive_images: {
      dist: {
        options: {
          sizes: [{
            width: 160,
          },{
            width: 320,
          },{
            width: 480,
          },{
            width: 640
          },{
            width: 800
          },{
            width: 960,
          },{
            width: 1280,
          }]
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: 'img/srcset/**/*.{gif,jpg,jpeg,png,svg}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    responsive_images_extender: {
      options: {
        ignore: ['.srcset-ignore'],
        srcset: [{
          suffix: '-160',
          value: '160w'
        },{
          suffix: '-320',
          value: '320w'
        },{
          suffix: '-480',
          value: '480w'
        },{
          suffix: '-640',
          value: '640w'
        },{
          suffix: '-800',
          value: '800w'
        },{
          suffix: '-960',
          value: '960w'
        },{
          suffix: '-1280',
          value: '1280w'
        }],
        sizes: [{
          selector: '.srcset-secondary',
          sizeList: [{
            cond: 'min-width: 1600px',
            size: '320px'
          },{
            cond: 'min-width: 960px',
            size: '18.8vw'
          },{
            cond: 'min-width: 480px',
            size: '150px'
          },{
            cond: 'default',
            size: '63vw'
          }]
        },{
          selector: '.srcset-full',
          sizeList: [{
            cond: 'min-width: 1600px',
            size: '960px'
          },{
            cond: 'min-width: 960px',
            size: '59.22vw'
          },{
            cond: 'min-width: 768px',
            size: '82.72vw'
          },{
            cond: 'default',
            size: '88vw'
          }],
        },{
          selector: '.srcset-half',
          sizeList: [{
            cond: 'min-width: 1600px',
            size: '480px'
          },{
            cond: 'min-width: 960px',
            size: '29.61vw'
          },{
            cond: 'min-width: 768px',
            size: '41.36vw'
          },{
            cond: 'min-width: 480px',
            size: '44vw'
          },{
            cond: 'default',
            size: '88vw'
          }],
        },{
          selector: '.srcset-half-to-third',
          sizeList: [{
            cond: 'min-width: 1600px',
            size: '320px'
          },{
            cond: 'min-width: 960px',
            size: '19.74vw'
          },{
            cond: 'min-width: 768px',
            size: '27.57vw'
          },{
            cond: 'min-width: 480px',
            size: '44vw'
          },{
            cond: 'default',
            size: '88vw'
          }],
        },{
          selector: '.srcset-third',
          sizeList: [{
            cond: 'min-width: 1600px',
            size: '320px'
          },{
            cond: 'min-width: 960px',
            size: '19.74vw'
          },{
            cond: 'min-width: 768px',
            size: '27.57vw'
          },{
            cond: 'min-width: 480px',
            size: '29.33vw'
          },{
            cond: 'default',
            size: '88vw'
          }]
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['**/*.html', '!perf/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      },
    },
    imageoptim: {
      options: {
        quitAfter: true
      },
      dist: {
        options: {
          jpegMini: false,
          imageAlpha: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{gif,jpg,jpeg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      },
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    xmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.xml',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            // Jekyll processes and moves HTML and text files.
            // Usemin moves CSS and javascript inside of Usemin blocks.
            // Copy moves asset files and directories.
            'img/**/*',
            // Like Jekyll, exclude files & folders prefixed with an underscore.
            '!**/_*{,/**}',
            // Explicitly add any files your site needs for distribution here.
            'favicon*.{ico,png}'
          ],
          dest: '<%= yeoman.dist %>'
        }]
      },
      // Copy CSS into .tmp directory for Autoprefixer processing
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/css',
          src: '**/*.css',
          dest: '.tmp/css'
        }]
      },
      stageLoadCSS: {
        files: {
          '<%= yeoman.app %>/_includes/loadCSS.js': 'bower_components/loadCSS/loadCSS.js'
        }
      },
      stageOptimizedWebfontLoading: {
        files: {
          '<%= yeoman.app %>/_includes/fontloader.js': 'bower_components/OptimizedWebfontLoading/build/fontloader.js'
        }
      }
    },
    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%= yeoman.dist %>/js/**/*.js',
            '<%= yeoman.dist %>/css/styles.css',
            '<%= yeoman.dist %>/favicon*.png'
          ]
        }]
      }
    },
    buildcontrol: {
      dist: {
        options: {
          remote: 'git@github.com:davidensinger/davidensinger.github.io.git',
          branch: 'master',
          commit: true,
          push: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/**/*.js'
      ]
    },
    pagespeed: {
      options: {
        locale: 'en_GB',
        nokey: true,
        url: 'http://davidensinger.com'
      },
      desktop: {
        options: {
          strategy: 'desktop'
        }
      },
      mobile: {
        options: {
          strategy: 'mobile'
        }
      }
    },
    phantomas: {
      site: {
        options: {
          indexPath: '<%= yeoman.dist %>/perf/phantomas/',
          options   : {
            'film-strip': false,
            'no-externals': true,
            'timeout': 60
          },
          url: 'http://davidensinger.com/',
          buildUi: true
        }
      }
    },
    concurrent: {
      server: [
        'sass',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'sass',
        'copy:dist'
      ]
    }
  });

  // Define Tasks
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'postcss:server',
      'browserSync:server',
      'watch'
    ]);
  });

  grunt.registerTask('stage', [
    'copy:stageLoadCSS',
    'copy:stageOptimizedWebfontLoading'
  ]);

  grunt.registerTask('test', [
    'jshint:test',
    'clean:server',
    'concurrent:server',
    'browserSync:server'
  ]);

  grunt.registerTask('check', [
    'devUpdate',
    'clean:server',
    'jekyll:check',
    'scsslint',
    'jshint'
  ]);

  grunt.registerTask('perf', [
    'pagespeed',
    'phantomas'
  ]);

  grunt.registerTask('build', [
    'clean',
    'stage',
    'jekyll:dist',
    'concurrent:dist',
    //'responsive_images_extender',
    //'responsive_images',
    'imageoptim',
    'useminPrepare',
    'concat',
    'postcss:dist',
    'csscomb',
    'cssmin',
    'uglify',
    'svgmin',
    'filerev',
    'usemin',
    'htmlmin',
    'xmlmin'
  ]);

  grunt.registerTask('deploy', [
    //'perf',
    'build',
    'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'check',
    'build'
  ]);
};
