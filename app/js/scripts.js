var keyboardNavigation = (function () {

  var navigationElement = function (id) {
    var element = document.getElementById('js-navigation--' + id);

    if (element) {
      var anchor = element.getAttribute('href');

      window.location.href = anchor;
      return false;
    }
  };

  return {
    navigationElement: navigationElement
  };

})();

document.onkeydown = function(e) {
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 37: // left
      keyboardNavigation.navigationElement('previous');
      break;
    case 39: // right
      keyboardNavigation.navigationElement('next');
      break;
    default: return;
  }
  e.preventDefault();
};

// http://blog.gospodarets.com/track_javascript_angularjs_and_jquery_errors_with_google_analytics/
window.addEventListener('error', function (err) {
  var lineAndColumnInfo = err.colno ? ' line:' + err.lineno +', column:'+ err.colno : ' line:' + e.lineno;
  ga(
    'send',
    'event',
    'JavaScript Errors',
    err.message,
    err.filename + lineAndColumnInfo + ' -> ' +  navigator.userAgent,
    0,
    true
  );
});
