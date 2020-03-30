setTimeout(() => {
  func();
  scroll(function (direction) { console.log(direction) });
}, 1000)

function func() {
  var elements = document.querySelectorAll('.table-of-contents > ul > li > ul > li');
  var beforeScrollTop = window.pageYOffset;
  var style = "border-left:1px solid #09f;background:#e8e8e8";
  var direction = {
    up: function (scrollTop) {
      var fisrt = elements[0];
      var isTop = scrollTop < fisrt.offsetTop;
      if (isTop) {
        return fisrt.style = style;
      }
      for (var i = elements.length - 1; i >= 0; i--) {
        var el = elements[i];
        if (el.offsetTop >= window.pageYOffset) {
          el.style = '';
          var next = elements[i - 1];
          if (next) {
            next.style = style;
          }
        }
      }
    },
    down: function (scrollTop) {
      var last = elements[elements.length - 1];
      var isBottom = scrollTop > last.offsetTop;
      if (isBottom) {
        return last.style = style;
      }
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.offsetTop <= window.pageYOffset) {
          el.style = '';
          var next = elements[i + 1];
          if (next) {
            next.style = style;
          }
        }
      }
    }
  };
  // window.addEventListener('scroll', function (event) {
  //   var afterScrollTop = window.pageYOffset;
  //   console.log(afterScrollTop, beforeScrollTop, elements[0].offsetTop, elements[elements.length - 1].offsetTop)
  //   delta = afterScrollTop - beforeScrollTop;
  //   if (delta === 0) {
  //     return false;
  //   }
  //   var type = delta > 0 ? "down" : "up";
  //   direction[type](afterScrollTop);
  //   beforeScrollTop = afterScrollTop;
  // });
}