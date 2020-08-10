const noop = () => { };
const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
const isArray = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Array]';
};
const isFunction = (arr) => {
  return Object.prototype.toString.call(arr) === '[object Function]';
};
const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]';
};
const isBoolean = (str) => {
  return Object.prototype.toString.call(str) === '[object Boolean]';
};
const isUndefined = (str) => {
  return Object.prototype.toString.call(str) === '[object Undefined]';
};
const isNull = (str) => {
  return Object.prototype.toString.call(str) === '[object Null]';
};
const isNumber = (str) => {
  return Object.prototype.toString.call(str) === '[object Number]';
};
const stringify = (obj) => {
  return JSON.stringify(obj);
};
const parse = (str) => {
  return JSON.parse(str);
};

/**
 * options.isReverse  是否反向循环
 * */
const forEach = (obj, callback, options) => {
  options = options || {};
  callback = callback || noop;
  let { isReverse } = options;
  let loopObj = () => {
    for (let key in obj) {
      callback(obj[key], key, obj);
    }
  };
  let loopArr = () => {
    if (isReverse) {
      for (let i = obj.length - 1; i >= 0; i--) {
        callback(obj[i], i);
      }
    } else {
      for (let j = 0, len = obj.length; j < len; j++) {
        callback(obj[j], j);
      }
    }
  };
  if (isObject(obj)) {
    loopObj();
  }
  if (isArray(obj)) {
    loopArr();
  }
};

const isEmpty = (obj) => {
  let result = true;
  if (isObject(obj)) {
    forEach(obj, () => {
      result = false;
    });
  }
  if (isString(obj) || isArray(obj)) {
    result = obj.length === 0;
  }
  if (isNumber(obj)) {
    result = obj === 0;
  }
  return result;
};
const rename = (origin, newNames) => {
  let isObj = isObject(origin);
  if (isObj) {
    origin = [origin];
  }
  origin = parse(stringify(origin));
  let updateProperty = function (val, key, obj) {
    delete obj[key];
    key = newNames[key];
    obj[key] = val;
  };
  forEach(origin, (item) => {
    forEach(item, (val, key, obj) => {
      let isRename = (key in newNames);
      (isRename ? updateProperty : noop)(val, key, obj);
    });
  });
  return isObject ? origin[0] : origin;
};
const extend = (destination, sources) => {
  for (let key in sources) {
    let value = sources[key];
    if (!isUndefined(value)) {
      destination[key] = value;
    }
  }
  return destination;
};
const deferred = (callback) => {
  return new Promise(callback);
};
const tplEngine = (tpl, data, regexp) => {
  if (!(isArray(data))) {
    data = [data];
  }
  let ret = [];
  let replaceAction = (object) => {
    return tpl.replace(regexp || (/\\?\{([^}]+)\}/g), (match, name) => {
      if (match.charAt(0) === '\\') return match.slice(1);
      return (object[name] !== undefined) ? object[name] : '{' + name + '}';
    });
  };
  for (let i = 0, j = data.length; i < j; i++) {
    ret.push(replaceAction(data[i]));
  }
  return ret.join('');
};
// 暂时支持 String
const isContain = (str, keyword) => {
  return str.indexOf(keyword) > -1;
};
const isEqual = (source, target) => {
  return source === target;
};
const request = (url, option) => {
  return deferred((resolve, reject) => {
    option = option || {};
    let xhr = new XMLHttpRequest();
    let method = option.method || 'GET';
    xhr.open(method, url, true);
    let headers = option.headers || {};
    forEach(headers, (header, name) => {
      xhr.setRequestHeader(name, header);
    });
    let body = option.body || {};
    let isSuccess = () => {
      return /^(200|202)$/.test(xhr.status);
    };
    let timeout = option.timeout;
    if (timeout) {
      xhr.timeout = timeout;
    }
    xhr.onreadystatechange = function () {
      if (isEqual(xhr.readyState, 4)) {
        let { responseText } = xhr;
        responseText = responseText || '{}';
        let result = JSON.parse(responseText);
        if (isSuccess()) {
          resolve(result);
        } else {
          let { status } = xhr;
          extend(result, {
            status
          });
          reject(result);
        }
      }
    };
    xhr.onerror = (error) => {
      reject(error);
    }
    xhr.send(body);
  });
};
const map = (source, event) => {
  forEach(source, (item, index) => {
    source[index] = event(item, index)
  })
  return source;
};
const filter = (arrs, callback) => {
  return arrs.filter(callback);
};
const some = (arrs, callback) => {
  return arrs.some(callback);
};
const toJSON = (value) => {
  return JSON.stringify(value);
}
const toArray = (obj) => {
  let arrs = [];
  forEach(obj, (v, k) => {
    arrs.push([k, v]);
  });
  return arrs;
};
const isInclude = (str, match) => {
  return str.indexOf(match) > -1;
};
const clone = (source) => {
  return JSON.parse(JSON.stringify(source));
};
function Observer() {
  let observers = [];
  this.add = (observer, force) => {
    if (isFunction(observer)) {
      if (force) {
        return observers = [observer];
      }
      observers.push(observer);
    }
  };
  this.remove = (observer) => {
    observers = filter(observers, (_observer) => {
      return _observer !== observer
    });
  };
  this.emit = (data) => {
    forEach(observers, (observer) => {
      observer(data);
    });
  };
}
const getBrowser = () => {
  let userAgent = navigator.userAgent;
  let name = '', version = '';
  if (/(Msie|Firefox|Opera|Chrome|Netscape)\D+(\d[\d.]*)/.test(userAgent)) {
    name = RegExp.$1;
    version = RegExp.$2;
  }
  if (/Version\D+(\d[\d.]*).*Safari/.test(userAgent)) {
    name = 'Safari';
    version = RegExp.$1;
  }
  return {
    name,
    version
  };
};

function getUrlParam(name, url) {
  if (!url && typeof location !== 'undefined') {
    url = location.href
  }
  name = name.replace(/[\[\]]/g, "\\$&");

  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"), results = regex
    .exec(url);

  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const isSmallScreen = () => {
  if (typeof document !== 'undefined') {
    return document.body.clientWidth < 900
  } else {
    return false
  }
}

const setHomeBodyClass = (option = {}) => {
  const { isRemove, className } = option
  try {
    const appEl = document.body
    isRemove ? appEl.classList.remove(className) : appEl.classList.add(className)
  } catch (e) {
    //
  }
}

const getDropdownVersions = (context) => {
  const path = context.$route.path
  const splitList = path.split('/')
  const fileName = splitList[splitList.length - 1]
  const isOldVersion = context.$themeConfig.isOldVersion
  const { $themeConfig: { oldBase, newBase }} = context
  if (!oldBase || !newBase) {
    return
  }
  const newVersionClickEvent = isOldVersion ? () => {
    const pathNameList = window.location.pathname.split(oldBase)
    if (pathNameList.length > 1) {
      window.location.href = window.location.origin + newBase + pathNameList[1]
    } else {
      window.location.href = window.location.origin + newBase
    }
  } : () => { }
  const oldVersionClickEvent = isOldVersion ? () => { } : () => {
    const pathNameList = window.location.pathname.split(context.$themeConfig.newBase)
    if (pathNameList.length > 1) {
      window.location.href = window.location.origin + oldBase + pathNameList[1]
    } else {
      window.location.href = window.location.origin + oldBase
    }
  }

  const isIM = path.indexOf('/views/im/') !== -1
  if (isIM) {
    const isMobile = ['ios.html', 'android.html', 'ios2.html', 'ios4.html', 'android2.html', 'android4.html'].indexOf(fileName) !== -1
    if (isMobile) {
      return [{ name: '4.x 版本', click: newVersionClickEvent }, { name: '2.x 版本', click: oldVersionClickEvent }]
    }
    const isWeb = ['web.html', 'web3.html'].indexOf(fileName) !== -1
    if (isWeb) {
      return [{ name: '3.x 版本', click: newVersionClickEvent }, { name: '2.x 版本', click: oldVersionClickEvent }]
    }
  }

  const isRTC = path.indexOf('/views/rtc/') !== -1
  if (isRTC) {
    const isMobile = ['ios.html', 'android.html', 'ios3.html', 'ios4.html', 'android4.html', 'android4.html'].indexOf(fileName) !== -1
    if (isMobile) {
      return [{ name: '4.x 版本', click: newVersionClickEvent }, { name: '3.x 版本', click: oldVersionClickEvent }]
    }
  }
}

export default {
  getDropdownVersions,
  noop,
  isObject,
  isArray,
  isFunction,
  isString,
  isBoolean,
  isUndefined,
  isNull,
  isNumber,
  stringify,
  parse,
  forEach,
  isEmpty,
  rename,
  extend,
  deferred,
  tplEngine,
  isContain,
  isEqual,
  request,
  map,
  filter,
  some,
  toJSON,
  toArray,
  isInclude,
  clone,
  getBrowser,
  getUrlParam,
  isSmallScreen,
  setHomeBodyClass
}