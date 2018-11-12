require('isomorphic-unfetch');

const path = require('path');

const Koa = require('koa');
const nextApp = require('next');
const Router = require('koa-router');
const graphql = require('koa-graphql');

const schema = require('../schemas');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 8000;
const app = nextApp({ dir: path.resolve(__dirname, '..'), dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.all('/graphql', graphql({
    schema,
    graphiql: true,
  }));

  router.all('/login', ctx => {
    ctx.cookies.set('token', 'login');
  });

  router.get('*', async ctx => {
    ctx.req.token = ctx.cookies.get('token');
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
