const express = require('express');
const fs = require('fs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const server = express();

server.use(express.static(path.join(__dirname,  'build')));

server.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.use(
  '/proxy',
  createProxyMiddleware({
    target: 'http://s.only4.tv',
    changeOrigin: true,
    secure: false, // This will allow you to access HTTP content
    pathRewrite: {
      '^/proxy': '', // remove /proxy from the request URL
    },
  })
);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
