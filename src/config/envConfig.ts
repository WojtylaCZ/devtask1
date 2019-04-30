/*tslint:disable:no-reference*/
/// <reference path="../typings.d.ts" />

import * as createEnvConfig from '12factor-config';

import { envConfigSetup } from './envConfigSetup';

export interface IEnvConfig {
  appPort: number;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  env: string;
}

const envConfig: IEnvConfig = createEnvConfig(envConfigSetup);
export default envConfig;
