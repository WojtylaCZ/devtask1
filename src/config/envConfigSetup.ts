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
  env: {
    env: 'NODE_ENV',
    type: 'enum',
    values: Object.values(Env)
  }
};
