import express from 'express';
import env from './config/env.js';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello from Express!');
});

const startServer = () => {
  try {
    app.listen(env.EXPRESS_PORT, () => {
      console.log(`Express server running on port ${env.EXPRESS_PORT}`);
    });
    console.log('PORT =', env.EXPRESS_PORT);

  } catch (error) {
    console.error('Error starting Express server:', error);
    process.exit(1);
  }
};

startServer();