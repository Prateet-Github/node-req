import dotenv from 'dotenv';

dotenv.config();

const env = {
EXPRESS_PORT: process.env.EXPRESS_PORT,
KOA_PORT: process.env.KOA_PORT,
FASTIFY_PORT: process.env.FASTIFY_PORT,
NESTJS_PORT: process.env.NESTJS_PORT,
};

const requiredVars = [
  'EXPRESS_PORT',
  'KOA_PORT',
  'FASTIFY_PORT',
  'NESTJS_PORT',
];

requiredVars.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;