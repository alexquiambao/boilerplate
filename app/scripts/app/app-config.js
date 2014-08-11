/*! ========================================================================
 * angular-barebone v0.1.7
 * =========================================================================
 * a simple project scaffold for prototyping angularjs projects
 * Authored by Pongstr Ordillo [twiz.tickler@gmail.com]
 * ========================================================================= */

'use strict';

angular
  .module('AppName')
  .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

  // Enable HTML5Mode for location
  $locationProvider.html5Mode(true);

  // Make a trailing slash optional for all routes
  $urlRouterProvider.rule(function ($injector, $location) {
    var path = $location.url();

    // check to see if the path already has a slash where it should be
    if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
      return;
    }

    if (path.indexOf('?') > -1) {
      return path.replace('?', '/?');
    }

    return path + '/';
  });

});
