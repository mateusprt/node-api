import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import AppError from "../../exceptions/AppError";
import { logger } from "../../config/logger/logger";

export function handleErrors(error: Error, request: Request, response: Response, next: NextFunction) {
  logger.error(`[${new Date()}] [${request.ip}] - ${request.method} ${request.url} - ${error.message} ${error.stack}`);
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
}