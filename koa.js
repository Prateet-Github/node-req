import Koa from 'koa';
import env from './config/env.js';

const app = new Koa();

app.use(ctx => {
  ctx.body = 'pong';
});

const server = app.listen(env.KOA_PORT, () => {
  console.log(`Koa server is running on port ${env.KOA_PORT}`);
});

server.on('error', (err) => {
  console.error('Error starting Koa server:', err);
  process.exit(1);
});