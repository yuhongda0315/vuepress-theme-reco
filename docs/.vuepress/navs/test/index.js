const getPaths = (options = {}) => {
  return [
    { title: '状态码', path: `/views/im/noui/quick-start/test.md`, depth: `test.html`, match: 'test' }
  ]
};

module.exports = [
  {
    title: 'Android',
    depth: ``,
    children: getPaths({ match: 'test' })
  }
];