const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
      '/callback',
      '/api',
      '/auth',
    ], { target: 'http://localhost:6500/' }));
  };
