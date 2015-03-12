/* global ga */

var errorTracking = (function() {

  'use strict';

  // http://blog.gospodarets.com/track_javascript_angularjs_and_jquery_errors_with_google_analytics/
  var _sendErrorsToGoogleAnalytics = function () {

    window.addEventListener('error', function (err) {

      var ie = window.event || {};
      var errorMessage = err.message || ie.errorMessage;
      var errorFilename = err.filename || ie.errorUrl;
      var errorLineNumber = ', Line: ' + (err.lineno || ie.errorLine);
      var errorColumnNumber = ', Column: ' + (err.colno || 'undefined'); // print undefined as a string if it doesn’t exist
      var userAgent = ', User Agent: ' + navigator.userAgent;
      var platform = ', Platform: ' + navigator.platform;

      ga('send', 'event', 'JavaScript Errors', errorMessage, errorFilename + errorLineNumber + errorColumnNumber + userAgent + platform, 0, true);
    });
  };

  var init = function () {
    _sendErrorsToGoogleAnalytics();
  };

  return {
    init: init
  };
}());