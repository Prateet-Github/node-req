import Koa from 'koa';
import env from './config/env.js';
import cluster from 'cluster';
import { availableParallelism } from 'os';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
console.log(`Primary ${process.pid} is running`);

for (let i = 0; i < numCPUs; i++) {
cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
})
}
else{

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

}

