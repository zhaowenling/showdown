/**
 * Created by Tivie on 12-11-2014.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                sourceMap: true,
                banner: ";/*! <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n(function(){\n 'use strict';\n",
                footer: "}).call(this)"
            },
            dist: {
                src: ['src/showdown.js', 'src/helpers.js', 'src/subParsers/*.js', 'src/loader.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js']
        },
        simplemocha: {
            node: {
                src: 'test/node/**/*.js',
                options: {
                    globals: ['should'],
                    timeout: 3000,
                    ignoreLeaks: false,
                    reporter: 'spec'
                }
            },
            browser: {
                src: 'test/browser/**/*.js',
                options: {
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', ['jshint', 'concat', 'simplemocha']);
    grunt.registerTask('test-without-building', ['simplemocha']);
    grunt.registerTask('build', ['jshint', 'concat', 'test', 'uglify']);

    // Default task(s).
    grunt.registerTask('default', []);
};
