export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash(path) {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function isExternal(path) {
  return outboundRE.test(path)
}

export function isMailto(path) {
  return /^mailto:/.test(path)
}

export function isTel(path) {
  return /^tel:/.test(path)
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

function formatUrl(url) {
  var obj = {}
  var arr1 = url.split('?')
  arr1 = arr1[1]
  if (!arr1) {
    return {}
  }

  if (arr1 && arr1.indexOf('#') !== -1) {
    arr1 = arr1.split('#')[0]
  }

  var arr2 = arr1.split('&')
  for (var i = 0; i < arr2.length; i++) {
    var res = arr2[i].split('=')
    obj[res[0]] = res[1]
  }
  return obj
}

const isPage = (name) => {
  name = name.replace('.html', '');
  let platforms = [
    'android', 'android2', 'android4', 'ios', 'ios2', 'ios4', 'web', 'web3', 'mini', 'uniapp', 'flutter',
    'nodejs', 'serverapi', 'python', 'golang',
    'rong', 'mi', 'hw', 'meizu', 'oppo', 'vivo', 'fcm',
    'private-p', 'group-p', 'system-p', 'chatroom-p'
  ]
  return platforms.some((platform) => { return platform == name });
};
export function isActive(route, path) {
  const routeHash = route.hash
  const linkHash = getHash(path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const matchVal = formatUrl(path).match
  const queryMatchVal = route.query.match
  if (queryMatchVal && queryMatchVal !== matchVal) {
    return false
  }

  const matchIndex = path.indexOf('?match')

  const routePath = route.path
  const pagePath = matchIndex !== -1 ? path.substring(0, matchIndex) : path;

  const routePathes = routePath.split('/');
  const name = routePathes.pop();
  if (isPage(name)) {
    const pagePathes = pagePath.split('/');
    pagePathes.pop();
    return pagePathes.join('/') === routePathes.join('/')
  }

  return routePath === pagePath;
}

export function resolvePage(pages, rawPath, base, option = {}) {
  const { match } = option
  if (base) {
    rawPath = resolvePath(rawPath, base)
  }
  option = option || {};
  const isRoot = option.isRoot;
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      const path = ensureExt(pages[i].path)
      return Object.assign({}, pages[i], {
        type: 'page',
        isRoot: isRoot,
        path: match ? `${path}?match=${match}` : path
      })
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

function resolvePath(relative, base, append) {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveSidebarItems(page, regularPath, site, localePath) {
  const { pages, themeConfig } = site

  const localeConfig = localePath && themeConfig.locales
    ? themeConfig.locales[localePath] || themeConfig
    : themeConfig

  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar
  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page)
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar
  if (!sidebarConfig) {
    return []
  } else {
    const { base, config } = resolveMatchingConfig(regularPath, sidebarConfig)
    return config
      ? config.map(item => resolveItem(item, pages, base))
      : []
  }
}

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeaders(page) {
  const headers = groupHeaders(page.headers || [])
  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: page.path + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

export function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h))
  let lastH2
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}

export function resolveNavLinkItem(linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export function resolveMatchingConfig(regularPath, config) {
  if (Array.isArray(config) && config.length && config[0].key) {
    for (var i = 0, max = config.length; i < max; i++) {
      const item = config[i]
      const { key: base, bars, isMatchQuery } = item
      if (typeof location !== 'undefined' && location && location.href) {
        const href = location.href
        if (isMatchQuery && href.indexOf(base) !== -1) {
          return {
            base: '',
            config: bars
          }
        }
      }
      if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
        return {
          base: '',
          config: bars
        }
      }
    }
    return {}
  }
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }
  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
      return {
        base,
        config: config[base]
      }
    }
  }
  return {}
}

export function formatDate(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  time = time.replace(/-/g, '/')
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length)
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (const key in o) {
    if (RegExp(`(${key})`).test(fmt)) {
      const str = o[key] + ''
      fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : '0' + str)
    }
  }
  return fmt
}

// 获取时间的数字类型
export function getTimeNum(date) {
  return new Date(date.frontmatter.date).getTime()
}

// 比对时间
export function compareDate(a, b) {
  return getTimeNum(b) - getTimeNum(a)
}

function ensureEndingSlash(path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem(item, pages, base, groupDepth = 1) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    if (groupDepth > 3) {
      console.error(
        '[vuepress] detected a too deep nested sidebar group.'
      )
    }
    const children = item.children || []
    if (children.length === 0 && item.path) {
      return Object.assign(resolvePage(pages, item.path, base, item), {
        title: item.title
      })
    }
    return {
      type: 'group',
      path: item.path,
      title: item.title,
      isRoot: item.isRoot,
      sidebarDepth: item.sidebarDepth,
      children: children.map(child => resolveItem(child, pages, base, groupDepth + 1)),
      collapsable: item.collapsable !== false
    }
  }
}

const isUndefined = (str) => {
  return Object.prototype.toString.call(str) === '[object Undefined]';
};

export function extend(destination, sources) {
  for (let key in sources) {
    let value = sources[key];
    if (!isUndefined(value)) {
      destination[key] = value;
    }
  }
  return destination;
}