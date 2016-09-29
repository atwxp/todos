VEMN Todo App
====

VEMN(vue express mongodb node)

## 特性

- `webpack-dev-server` 实现前端自动刷新

- `nodemon` 自动重启服务器

- `browserSync` 自动刷新

browserSync 代理到 express，express 代理到 webpack

## 命令

前后端本地服务开发

`npm run start`

前端本地服务开发

`npm run server`

前端本地构建

`npm run build`

生产环境下的前端构建

`npm run pub`

后端抓取开发环境下的前端代码

`babel-node app.js`

后端抓取生产环境下的前端代码

`NODE_ENV=production babel-node app.js`
