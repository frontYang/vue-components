const PORT = 9527
const Koa = require('koa')
const app = new Koa()
const path = require('path')
function resolve(dir) {
  return path.resolve(__dirname, './', dir)
}

app.use(require('koa-static')(resolve('../dist')))

// 开启服务器
app.listen(PORT, () => {
  console.log('server start http://localhost:' + PORT)
})
