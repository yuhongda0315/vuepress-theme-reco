const getPaths = (options = {}) => {
  return [
    { title: '状态码', path: `/views/im/noui/intro/test.md`, depth: `test.html`, match: 'hahatest2' }
  ]
};

module.exports = [
  {
    title: 'Android',
    depth: ``,
    children: getPaths({ match: 'hahatest2' })
  }
];