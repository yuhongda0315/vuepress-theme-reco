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
      let { frontmatter: { languages, categorys, platforms } } = page;
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
    context.$router.beforeEach((to, from, next) => {
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
        if (_default != current) {
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