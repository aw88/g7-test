const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

const NODE_PORT = process.env.NODE_PORT || 3000;

router.get('/', async (ctx) => {
  ctx.body = 'OK';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(NODE_PORT, () => {
  console.log(`Listening at http://localhost:${NODE_PORT}/`);
});
