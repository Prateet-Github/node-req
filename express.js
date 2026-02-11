import express from 'express';
import env from './config/env.js';

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