export enum Env {
  Production = 'production',
  Stage = 'stage',
  Development = 'development',
  Test = 'test'
}

export const envConfigSetup = {
  appPort: {
    env: 'PORT',
    type: 'integer',
    required: true
  },
  dbHost: {
    env: 'DB_HOST',
    type: 'string',
    required: true
  },
  dbPort: {
    env: 'DB_PORT',
    type: 'integer',
    required: true
  },
  dbName: {
    env: 'DB_NAME',
    type: 'string',
    required: true
  },
  dbUsername: {
    env: 'DB_USERNAME',
    type: 'string',
    required: true
  },
  dbPassword: {
    env: 'DB_PASSWORD',
    type: 'string',
    required: true
  },
  env: {
    env: 'NODE_ENV',
    type: 'enum',
    values: Object.values(Env)
  }
};
