import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { loggerMiddleware } from './middlewares/logger/loggerMiddleware';
import { handleErrors } from './middlewares/errors/handleErrors';
import routes from './routes/index.routes';

dotenv.config();

const server = express();

server.use(express.json());
server.use(helmet());
server.use(loggerMiddleware);

// routes
server.use('/api/v1', routes);

// global error handler
server.use(handleErrors);

server.listen(process.env.SERVER_PORT, ()=> console.log(`Server running on port ${process.env.SERVER_PORT}...`));