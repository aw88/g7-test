const Koa = require('koa');
const Router = require('@koa/router');

const { CITIES } = require('./constants');
const getUsersInCity = require('./getUsersInCity');
const getUsersNearLocation = require('./getUsersNearLocation');

const app = new Koa();
const router = new Router();

const NODE_PORT = process.env.NODE_PORT || 3000;

router.get('/london', async (ctx) => {
  ctx.body = await getUsersInCity('London');
});

router.get('/london/near', async (ctx) => {
  ctx.body = await getUsersNearLocation(CITIES.London);
});

router.get('/', async (ctx) => {
  ctx.body = 'OK';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(NODE_PORT, () => {
  console.log(`Listening at http://localhost:${NODE_PORT}/`);
});
