export default {
  mounted() {
    let context = this;
    let getPage = (_path) => {
      let { $site: { pages } } = context;
      let cache = {
        path: '',
        frontmatter: {}
      };
      for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        let { path, frontmatter } = page;
        if (_path == path) {
          cache.path = path;
          cache.frontmatter = frontmatter;
          break;
        }
      }
      return cache;
    };
    let getLinks = (page) => {
      let links = [];
      const { frontmatter: $frontmatter } = page
      let { frontmatter: { languages, categorys, platforms }} = page
      let { $themeConfig: { tabs }} = context
      tabs = tabs || {}
      if (!categorys && !platforms && !languages) {
        for (const key in $frontmatter) {
          if ($frontmatter[key] && tabs[key]) {
            const matchVal = tabs[key]
            matchVal.categorys && (categorys = matchVal.categorys)
            matchVal.platforms && (platforms = matchVal.platforms)
            matchVal.languages && (languages = matchVal.languages)
          }
        }
      }
      let add = (languages) => {
        languages.forEach((lan) => {
          if (lan.name == 'multi') {
            links = links.concat(lan.children);
          } else {
            links.push(lan);
          }
        });
      };
      if (languages) {
        add(languages);
      }
      if (platforms) {
        add(platforms);
      }
      if (categorys) {
        categorys.forEach((category) => {
          let { languages } = category;
          add(languages);
        })
      }
      return links;
    };
    let isSameCategory = (page1, page2) => {
      let servers = ['java', 'nodejs', 'php', 'golang', 'go', 'serverapi'];
      let isPage1 = servers.some((server) => { return page1.indexOf(server) > -1 });
      let isPage2 = servers.some((server) => { return page2.indexOf(server) > -1 });
      return isPage1 == isPage2;
    };
    context.$router.beforeEach((to, from, next) => {
      localStorage.setItem('rong-referer-href', window.location.href)
      if (window.testDebugger) {
        debugger;
      }
      let page = getPage(to.path);
      let links = getLinks(page);
      let current = localStorage.getItem('rong-current-page') || '';
      let isSome = links.some(({ link }) => {
        return link == current
      });
      if (isSome) {
        current = `${current.replace('./', '')}.html`;
        let { path } = to;
        let items = path.split('/');
        let _default = items.pop();
        if (_default != current && isSameCategory(_default, current)) {
          items.push(current);
          return next({
            path: items.join('/')
          })
        }
      }
      next();
    })
  }
}