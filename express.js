import express from 'express';
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
    });
    
}
else{

const app = express();

app.get('/', (_req, res) => {
  res.end('pong');
});

const server = app.listen(env.EXPRESS_PORT, () => {
  console.log(`Express server is running on port ${env.EXPRESS_PORT}`);
});

server.on('error', (err) => {
  console.error('Error starting Express server:', err);
  process.exit(1);
});

}

