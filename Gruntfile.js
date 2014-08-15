/*! =========================================================================
 * Grunt Tasks for AngularJS web apps v0.1.0
 * Copyright 2014 (c) Pongstr Ordillo. MIT License.
 * ========================================================================= */

module.exports = function(grunt) {

  // Project Configuration

  grunt.initConfig({
    site: {
      app:      'app',
      src:      'src',
      bower:    'bower_components',
      dist_dir: '_dist'
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! ========================================================================\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> \n' +
            ' * =========================================================================\n' +
            ' * <%= pkg.description %> \n'+
            ' * Authored by <%= pkg.author %> [<%= pkg.email %>] \n' +
            ' * ========================================================================= */',

    // Copy assets that don't need processing
    copy: {
      fonts: {
        files: [
          { // Bootstrap Glyphicons
            expand: true,
            flatten: true,
            src: ['<%= site.bower %>/bootstrap/dist/fonts/*'],
            dest: '<%= site.app %>/assets/fonts/bootstrap/',
            filter: 'isFile'
          },
          { // Font-Awesome Glyphs
            expand: true,
            flatten: true,
            src: ['<%= site.bower %>/font-awesome/fonts/*'],
            dest: '<%= site.app %>/assets/fonts/font-awesome/',
            filter: 'isFile'
          }
        ]
      },

      javascript: {
        files: [
          { // Copy AngularJS library
            expand: true,
            flatten: true,
            src: [
              // Angular Library and Modules
              '<%= site.bower %>/angular/angular.js',
              '<%= site.bower %>/angular/angular.min.js',
              '<%= site.bower %>/angular-animate/angular-animate.js',
              '<%= site.bower %>/angular-animate/angular-animate.min.js',
              '<%= site.bower %>/angular-cookies/angular-cookies.js',
              '<%= site.bower %>/angular-cookies/angular-cookies.min.js',
              '<%= site.bower %>/angular-loader/angular-loader.js',
              '<%= site.bower %>/angular-loader/angular-loader.min.js',
              '<%= site.bower %>/angular-resource/angular-resource.js',
              '<%= site.bower %>/angular-resource/angular-resource.min.js',
              '<%= site.bower %>/angular-sanitize/angular-sanitize.js',
              '<%= site.bower %>/angular-sanitize/angular-sanitize.min.js',
              '<%= site.bower %>/angular-scenario/angular-scenario.js',
              '<%= site.bower %>/angular-scenario/angular-scenario.min.js',
              '<%= site.bower %>/angular-touch/angular-touch.js',
              '<%= site.bower %>/angular-touch/angular-touch.min.js',

              // UI Bootstrap
              '<%= site.bower %>/angular-bootstrap/ui-bootstrap.js',
              '<%= site.bower %>/angular-bootstrap/ui-bootstrap.min.js',
              '<%= site.bower %>/angular-bootstrap/ui-bootstrap-tpls.js',
              '<%= site.bower %>/angular-bootstrap/ui-bootstrap-tpls.min.js',

              // UI-Router
              '<%= site.bower %>/angular-ui-router/release/angular-ui-router.js',
              '<%= site.bower %>/angular-ui-router/release/angular-ui-router.min.js',

            ],
            dest: '<%= site.app %>/scripts/lib/angular/',
            filter: 'isFile'
          },
          { // Copy jQuery library
            expand: true,
            flatten: true,
            src: [
              '<%= site.bower %>/jquery/dist/jquery.js',
              '<%= site.bower %>/jquery/dist/jquery.min.js',
              '<%= site.bower %>/jquery/dist/jquery.min.map'
            ],
            dest: '<%= site.app %>/scripts/lib/jquery/',
            filter: 'isFile'
          }
        ]
      },

      lessfiles: {
        files: [
          { // Copy Bootstrap Less files
            expand: true,
            cwd: '<%= site.bower %>/bootstrap/less/',
            src: ['**'],
            dest: '<%= site.src %>/less/bootstrap',
            filter: 'isFile'
          },
          { // Font-awesome less stylesheets
            expand: true,
            flatten: true,
            src: ['<%= site.bower %>/font-awesome/less/*'],
            dest: '<%= site.src %>/less/font-awesome',
            filter: 'isFile'
          }
        ]
      }
    },

    // Compile Less stylesheets
    less: {
      development: {
        options: {
          strictMath: true,
          sourceMap: false
        },
        files: {
          '<%= site.app %>/assets/css/<%= pkg.name %>.css' : '<%= site.src %>/less/bootstrap.less',
          '<%= site.app %>/assets/css/font-awesome.css': '<%= site.src %>/less/font-awesome/font-awesome.less'
        }
      },
      production: {
        options: {
          strictMath: true,
          sourceMap: false,
          compress: true
        },
        files: {
          '<%= site.app %>/assets/css/<%= pkg.name %>.min.css' : '<%= site.src %>/less/bootstrap.less',
          '<%= site.app %>/assets/css/font-awesome.min.css': '<%= site.src %>/less/font-awesome/font-awesome.less'
        }
      }
    },

    // Watch Tasks
    watch: {
      less: {
        files: ['<%= site.src %>/less/{,*/}*.less'],
        tasks: ['less:development']
      },
      jshint: {
        files: [
          'server/server.js',
          '<%= site.app %>/scripts/app/*.js',
          '<%= site.app %>/scripts/app/**/*.js'
        ],
        tasks: ['jshint']
      }
    },

    // Optimise Image Assets
    imagemin: {
      dynamic: {
        options: {
          pngquant: true,
          optimizationLevel: 3
        },
        files:[
          {
            expand: true,
            src: ['*.{png,jpg,gif}'],
            cwd: '<%= site.src %>/img/',
            dest: '<%= site.app %>/assets/img/'
          }
        ]
      }
    },

    // Add Banners for Application Build info
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %> \n',
          linebreak: true
        },
        files: {
          src: [
            '<%= site.app %>/assets/css/<%= pkg.name %>.css',
            '<%= site.app %>/assets/css/<%= pkg.name %>.min.css',
            '<%= site.app %>/core/app/app.js'
          ]
        }
      }
    },

    // Lint gruntfile and js apps
    jshint: {
      grunt: {
        src: ['Gruntfile.js']
      },
      express: {
        options: { jshintrc: 'server/.jshintrc' },
        src: ['server/server.js']
      },
      app: {
        options: { jshintrc: 'server/.jshintrc'
        },
        src: [
          '<%= site.app %>/scripts/app/app.js',
          '<%= site.app %>/modules/**/*.js'
        ]
      }
    },

    bump: {
      options: {
        file: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        createTag: false,
        tagName: '%VERSION%-angularjs',
        tagMessage: 'version v%VERSION%',
        push: false,
        pushTo: 'origin'
      }
    }
  });

  // These grunt plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Update Frontend Packages
  grunt.registerTask('updatepkg', ['copy']);

  // Less CSS Tasks
  grunt.registerTask('watchless', ['watch:less']);
  grunt.registerTask('buildless', ['less']);

  // Javascript Tasks
  grunt.registerTask('lintjs', ['jshint']);
  grunt.registerTask('watchjs', ['watch:jshint']);

  // Optimise and Build images for production
  grunt.registerTask('buildimg', ['imagemin']);

  // Release/Bump a version
  grunt.registerTask('release-version', ['less', 'imagemin', 'bump', 'usebanner']);

  // Default Task
  grunt.registerTask('default', ['jshint', 'less', 'imagemin']);

};
