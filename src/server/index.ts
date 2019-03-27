import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();
const PORT = 3000;

// logger
app.use(async (ctx: Koa.Context, next: () => void) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx: Koa.Context, next: () => void) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

router.get('/ping', (ctx: Router.RouterContext) => {
  ctx.body = { status: 'ok' };
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);

console.log(`Server running on port ${PORT}`);
