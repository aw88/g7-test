const Koa = require('koa');
const Router = require('@koa/router');

const { CITIES, DEFAULT_CITY } = require('./constants');
const getUsersInCity = require('./getUsersInCity');
const getUsersNearLocation = require('./getUsersNearLocation');
const mergeUserLists = require('./mergeUserLists');

const app = new Koa();
const router = new Router();

const NODE_PORT = process.env.NODE_PORT || 3000;

router.get('/:city', async (ctx) => {
  ctx.body = await getUsersInCity(ctx.params.city);
});

router.get('/:city/near', async (ctx) => {
  const { city, distance } = ctx.params;

  if (CITIES[city]) {
    ctx.body = await getUsersNearLocation(CITIES[ctx.params.city], distance);
  } else {
    ctx.status = 404;
    ctx.message = `City not found: ${city}`;
  }
});

router.get('/', async (ctx) => {
  const city = ctx.query?.city ?? DEFAULT_CITY;
  const distance = ctx.query?.distance;

  if (CITIES[city]) {
    const londonUsers = await getUsersInCity(city);
    const nearLondonUsers = await getUsersNearLocation(CITIES[city], distance);

    const users = mergeUserLists(londonUsers, nearLondonUsers);

    ctx.body = users;
  } else {
    ctx.status = 404;
    ctx.message = `City not found: ${city}`;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(NODE_PORT, () => {
  console.log(`Listening at http://localhost:${NODE_PORT}/`);
});
