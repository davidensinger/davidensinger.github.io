/* global errorTracking */

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

// Error tracking
errorTracking.init();