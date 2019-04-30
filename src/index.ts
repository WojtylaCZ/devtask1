import * as dotenv from 'dotenv';
dotenv.config();

import * as mongoose from 'mongoose';

import app from './app';
import logger, { init as initLogger } from './common/logger';
import envConfig from './config/envConfig';

export async function bootstrap() {
  process.env.TZ = 'UTC';
  initLogger();
  await initDatabase();
}

export async function initDatabase() {
  await mongoose.connect(
    `mongodb://${envConfig.dbUsername}:${envConfig.dbPassword}@${envConfig.dbHost}:${envConfig.dbPort}/${
      envConfig.dbName
    }`,
    { useCreateIndex: true, useNewUrlParser: true }
  );
  logger.info(`Database connection to ${envConfig.dbName} on ${envConfig.dbHost} established.`);
}

bootstrap()
  .then(() => {
    app.listen(envConfig.appPort, () => logger.info(`Server is listening on port ${envConfig.appPort}`));
  })
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
