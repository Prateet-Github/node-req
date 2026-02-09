import Koa from 'koa';
import env from './config/env.js';

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

const startServer = async () => {
  try {
    app.listen(env.KOA_PORT, () => {
      console.log(`Koa server running on port ${env.KOA_PORT}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();