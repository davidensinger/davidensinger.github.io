// Keyboard navigation
function keyboardNavigation(ID) {
  var element = document.getElementById('js-navigation--' + ID);
  if (element) {
    var anchor = element.getAttribute('href');
    window.location.href = anchor;
    return false;
  }
}

document.onkeydown = function(e) {
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 37: // left
      keyboardNavigation('previous');
      break;
    case 39: // right
      keyboardNavigation('next');
      break;
    default: return;
  }
  e.preventDefault();
};
