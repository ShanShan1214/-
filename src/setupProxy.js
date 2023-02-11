const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3003',
            changeOrigin: true,
            // 去掉我们添加的前缀，保证我们传递给后端的接口是正常的
            pathRewrite: { "^/api": '' }
        })
    );
};
