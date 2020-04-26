setTimeout(() => {
  func();
}, 2000)
var filter = function (arrs, callback) {
  var _arrs = [];
  for (var i = 0; i < arrs.length; i++) {
    var item = arrs[i];
    if (callback(item)) {
      _arrs.push(item);
    }
  }
  return _arrs;
};
function func() {
  var elements = document.querySelectorAll('h5');
  var beforeScrollTop = window.pageYOffset;
  var lastUpNode = null, lastDownNode = null;
  var CLASS_NAME = 'rong-scroll-active';
  var addClass = function (id) {
    var reg = /[\u4E00-\u9FFF]+/;
    var isChina = reg.test(id);
    if (isChina) {
      id = ' ' + id;
    }
    var nextNavs = document.querySelectorAll('a[href="#' + id + '"]')
    var nextNav = filter(nextNavs, (nav) => {
      return nav.className.indexOf('header-anchor') == -1;
    })[0];
    if (nextNav) {
      nextNav.parentNode.classList.add(CLASS_NAME)
      lastUpNode = nextNav;
    }
  };
  var removeClass = function(){
    if (lastUpNode) {
      lastUpNode.parentNode.classList.remove(CLASS_NAME);
    }
  };
  var direction = {
    up: function (scrollTop) {
      var first = elements[0];
      var isTop = scrollTop < first.offsetTop;
      if (isTop) {
        return addClass(first.id);
      }
      for (var i = elements.length - 1; i >= 0; i--) {
        var el = elements[i];
        removeClass();
        if (el.offsetTop <= window.pageYOffset) {
          return addClass(el.id)
        }
      }
    },
    down: function (scrollTop) {
      var last = elements[elements.length - 1];
      var isBottom = scrollTop > last.offsetTop;
      if (isBottom) {
        return addClass(last.id);
      }
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        removeClass();
        let id = el.id
        if (el.offsetTop >= window.pageYOffset) {
          return addClass(el.id);
        }
      }
    }
  };
  window.addEventListener('scroll', function (event) {
    var afterScrollTop = window.pageYOffset;
    delta = afterScrollTop - beforeScrollTop;
    if (delta === 0) {
      return false;
    }
    var type = delta > 0 ? "down" : "up";
    direction[type](afterScrollTop);
    beforeScrollTop = afterScrollTop;
  });
}