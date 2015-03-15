/* global ga */

// http://philipwalton.com/articles/measuring-your-sites-responsive-breakpoint-usage/
var breakpointsTracking = (function() {

  'use strict';

  var _breakpoints = {
    xs: '(max-width: 479px)',
    s: '(min-width: 480px) and (max-width: 767px)',
    m: '(min-width: 768px) and (max-width: 959px)',
    l: '(min-width: 960px) and (max-width: 1599px)',
    xl: '(min-width: 1600px) and (max-width: 1799px)',
    xxl: '(min-width: 1800px)'
  };

  var _sendBreakpointsToGoogleAnalytics = function () {

    // Do nothing in browsers that don't support `window.matchMedia`.
    if (!window.matchMedia) return;

    // Prevent rapid breakpoint changes for all firing at once.
    var timeout;

    Object.keys(_breakpoints).forEach(function(breakpoint) {
      var mql = window.matchMedia(_breakpoints[breakpoint]);

      // Set the breakpoint on pageload.
      if (mql.matches) {
        ga('set', 'dimension1', breakpoint);
      }

      // Update the breakpoint as the matched media changes, and send an event.
      mql.addListener(function (mql) {
        if (mql.matches) {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            ga('set', 'dimension1', breakpoint);
            ga('send', 'event', 'Breakpoint', 'change', breakpoint);
          }, 1000);
        }
      });
    });
  };

  var init = function () {
    _sendBreakpointsToGoogleAnalytics();
  };

  return {
    init: init
  };
}());
