import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import logger, { init as initLogger } from './common/logger';
import envConfig from './config/envConfig';

initLogger();

app.listen(envConfig.appPort, () => logger.info(`Server is listening on port ${envConfig.appPort}`));
