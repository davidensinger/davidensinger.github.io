/* global ga */

var eventTracking = (function() {

  'use strict';

  // http://blog.gospodarets.com/track_javascript_angularjs_and_jquery_errors_with_google_analytics/
  var _sendErrorsToGoogleAnalytics = function () {
    window.addEventListener('error', function (err) {
      var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + err.lineno;
      ga(
        'send',
        'event',
        'JavaScript Errors',
        err.message,
        err.filename + lineAndColumnInfo + ' -> ' + navigator.userAgent + navigator.platform + screen.width + screen.height,
        0,
        true
      );
    });
  };

  var init = function () {
    _sendErrorsToGoogleAnalytics();
  };

  return {
    init: init
  };
}());