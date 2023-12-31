import { NextFunction, Request, Response } from "express";
import { logger } from "../../config/logger/logger";

export function loggerMiddleware(request: Request, response: Response, next: NextFunction) {
  logger.info(`[${new Date()}] [${request.ip}] - ${request.method} ${request.url}`);
  next();
}