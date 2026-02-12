import Fastify from 'fastify';
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

  const buildApp = () => {
  const app = Fastify({ logger: false });

  app.get('/', (_request, reply) => {
    reply.send('pong');
  });

  return app;
};

const startServer = async () => {
  const app = buildApp();

  try {
    await app.listen({
      port: env.FASTIFY_PORT,
      host: '0.0.0.0',
    });

    console.log(`Fastify server running on port ${env.FASTIFY_PORT}`);
  } catch (err) {
    console.error('Error starting Fastify server:', err);
    process.exit(1);
  }
};

startServer();

}

