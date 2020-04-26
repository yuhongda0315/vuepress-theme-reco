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
  var beforeScrollTop = 0;
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
  var removeClass = function () {
    if (lastUpNode) {
      lastUpNode.parentNode.classList.remove(CLASS_NAME);
    }
  };
  var getDownIndex = function (i, len) {
    var _i = 0;
    if (i != 0) {
      _i = i - 1;
    }
    if (i == len - 1) {
      _i = i;
    }
    return _i;
  };
  var getUpIndex = function(i, len){
    var _i = 0;
    var maxIndex = len - 1;
    if (i != maxIndex) {
      _i = i + 1;
    }
    if (i == maxIndex) {
      _i = maxIndex;
    }
    return _i;
  };
  var direction = {
    up: function (scrollTop) {
      var first = elements[0];
      var isTop = scrollTop < first.offsetTop;
      removeClass();
      if (isTop) {
        return addClass(first.id);
      }
      for (var i = elements.length - 1; i >= 0; i--) {
        var el = elements[i];
        if (el.offsetTop <= window.pageYOffset) {
          var index = getUpIndex(i, elements.length);
          el = elements[index];
          return addClass(el.id)
        }
      }
    },
    down: function (scrollTop) {
      var last = elements[elements.length - 1];
      var isBottom = scrollTop > last.offsetTop;
      removeClass();
      if (isBottom) {
        return addClass(last.id);
      }
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.offsetTop >= window.pageYOffset) {
          var index = getDownIndex(i, elements.length);
          el = elements[index];
          return addClass(el.id);
        }
      }
    }
  };
  var onScroll = function () {
    var afterScrollTop = window.pageYOffset;
    delta = afterScrollTop - beforeScrollTop;
    var type = delta > 0 ? "down" : "up";
    direction[type](afterScrollTop);
    beforeScrollTop = afterScrollTop;
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
}