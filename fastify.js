import Fastify from 'fastify';
import env from './config/env.js';

const buildApp = () => {
  const app = Fastify();

  app.get('/', async (_request, reply) => {
    reply.send('Hello from Fastify!');
  });

  return app;
}

const startServer = async () => {
  const app = buildApp();

  try {
   app.listen({port: env.FASTIFY_PORT, host:'0.0.0.0'});
    console.log(`Fastify server is running on port ${env.FASTIFY_PORT}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();