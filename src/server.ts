import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', err => {
  errorlogger.error('uncaught Exception is detected', err);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connected successfully');
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('failed to connect', err);
  }
  process.on('unhandledRejection', err => {
    errorlogger.error(err);
    if (server) {
      server.close(() => {
        errorlogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', err => {
  logger.info('SIGTERM is Received', err);
  if (server) {
    server.close();
  }
});
