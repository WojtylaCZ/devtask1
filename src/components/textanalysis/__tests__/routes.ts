import { Server } from 'http';
import * as request from 'supertest';

import koaApp from '../../../app';
import { lexicalComplexity } from '../resolvers';
import { router } from '../routes';
let app: Server;

jest.mock('../resolvers');

beforeEach(() => {
  app = koaApp.listen();
});

afterEach(() => {
  app.close();
});

describe('text analysis routes', () => {
  it('calls the complexity for valid text-lexical-complexity POST', async () => {
    expect.assertions(1);
    const text = 'lorem ipsum';
    const response = await request(app)
      .post(router.url('text-lexical-complexity', {}))
      .send({ text });

    expect(lexicalComplexity).toHaveBeenCalled();
  });
});
