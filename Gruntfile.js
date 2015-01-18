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
        tasks: ['sass', 'autoprefixer:server', 'penthouse']
      },
      autoprefixer: {
        files: ['<%= yeoman.app %>/css/styles.css'],
        tasks: ['copy:stageCss', 'autoprefixer:server']
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
            // Running Jekyll also cleans the target directory.  Exclude any
            // non-standard `keep_files` here (e.g., the generated files
            // directory from Jekyll Picture Tag).
            '!<%= yeoman.dist %>/.git*',
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
        bundleExec: true,
        sourcemap: 'none'
      },
      dist: {
        files: {
          '.tmp/css/styles.css': '<%= yeoman.app %>/_scss/styles.scss'
        }
      },
    },
    autoprefixer: {
      options: {
        browsers: [
          'last 2 version',
          'safari 6',
          'ie 9',
          'opera 12.1',
          'ios 6',
          'android 4'
        ]
      },
      dist: {
        expand: true,
        cwd: '.tmp',
        src: 'concat/css/styles.css',
        dest: '.tmp'
      },
      server: {
        expand: true,
        cwd: '.tmp',
        src: 'css/*.css',
        dest: '.tmp'
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
        patterns: {
          html: [
            [/<link[^\>]+href=['"]([^"']+)["']/gm, 'Update the link tags'],
            [/<meta[^\>]+content=['"]http?:?\/\/[^\/"']+([^"']+)["']/gm,'Update meta tags'],
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
    cssmin: {
      dist: {
        options: {
          check: 'min'
        }
      }
    },
    imageoptim: {
      options: {
        quitAfter: true
      },
      distLossless: {
        options: {
          jpegMini: false,
          imageAlpha: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{gif,png}',
          dest: '<%= yeoman.dist %>'
        }]
      },
      distLossy: {
        options: {
          jpegMini: true,
          imageAlpha: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg}',
          dest: '<%= yeoman.dist %>'
        }]
      }
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
          '<%= yeoman.app %>/_includes/loadCSS.js': '<%= yeoman.app %>/_bower_components/loadCSS/loadCSS.js'
        }
      },
      stageOptimizedWebfontLoading: {
        files: {
          '<%= yeoman.app %>/_includes/fontloader.js': '<%= yeoman.app %>/_bower_components/OptimizedWebfontLoading/build/fontloader.js'
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
            '<%= yeoman.dist %>/favicon*.png',
            '<%= yeoman.dist %>/img/**/*.{gif,jpg,jpeg,png,svg}'
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
        '<%= yeoman.app %>/js/**/*.js',
        'test/**/*.js'
      ]
    },
    casperjs: {
      all: ['test/tests.js']
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
      'autoprefixer:server',
      'browserSync:server',
      'watch'
    ]);
  });

  grunt.registerTask('stage', [
    'copy:stageLoadCSS',
    'copy:stageOptimizedWebfontLoading'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'clean:server',
    'concurrent:server',
    'browserSync:server',
    'casperjs'
  ]);

  grunt.registerTask('check', [
    'devUpdate',
    'clean:server',
    'jekyll:check',
    'scsslint',
    'jshint',
  ]);

  grunt.registerTask('perf', [
    'pagespeed',
    'phantomas'
  ]);

  grunt.registerTask('build', [
    'clean',
    'stage',
    'jekyll:dist',
    'newer:imageoptim',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
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
    'perf',
    'build',
    'buildcontrol'
  ]);

  grunt.registerTask('default', [
    'check',
    'build'
  ]);
};
