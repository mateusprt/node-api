import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { loggerMiddleware } from './logger/middlewares/loggerMiddleware';

dotenv.config();

const server = express();

server.use(express.json());
server.use(helmet());
server.use(loggerMiddleware)

server.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello world' });
})

server.listen(process.env.SERVER_PORT, ()=> console.log(`Server running on port ${process.env.SERVER_PORT}...`));