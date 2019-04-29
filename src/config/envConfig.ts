/*tslint:disable:no-reference*/
/// <reference path="../typings.d.ts" />

import * as createEnvConfig from '12factor-config';

import { envConfigSetup } from './envConfigSetup';

export interface IEnvConfig {
  appPort: number;
  env: string;
}

const envConfig: IEnvConfig = createEnvConfig(envConfigSetup);
export default envConfig;
