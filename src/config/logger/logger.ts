import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: 'errors.log', level: 'error' }),
    new transports.File({ filename: 'logs.log' }),
    new transports.Console()
  ]
})