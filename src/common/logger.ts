import * as log4js from 'log4js';

import config from '../config/envConfig';
import { Env } from '../config/envConfigSetup';

export const configDev = {
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: 'all' } }
};

export const configProduction = {
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: 'info' } }
};

export function init() {
  if (config.env === Env.Production) {
    log4js.configure(configProduction);
  } else if (config.env === Env.Test) {
    log4js.getLogger().level = 'off';
  } else {
    log4js.configure(configDev);
  }
}

export default log4js.getLogger();
