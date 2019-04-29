import { Server } from 'http';
import * as request from 'supertest';

import koaApp from '../../../app';
import { router } from '../routes';
let app: Server;

describe('complexity api', () => {
  beforeEach(() => {
    app = koaApp.listen();
  });

  afterEach(() => {
    app.close();
  });

  it('returns 200 for valid text-lexical-complexity POST', async () => {
    expect.assertions(1);
    const text = 'lorem ipsum';
    const response = await request(app)
      .post(router.url('text-lexical-complexity', {}))
      .send({ text });

    expect(response.status).toBe(200);
  });

  it('returns 200 for valid text-lexical-complexity POST with param', async () => {
    expect.assertions(1);
    const text = 'lorem ipsum';
    const response = await request(app)
      .post(router.url('text-lexical-complexity', { mode: 'verbose' }))
      .send({ text });

    expect(response.status).toBe(200);
  });

  it('returns 400 error for missing text in body text-lexical-complexity POST', async () => {
    expect.assertions(1);
    const text = 'foo';
    const response = await request(app)
      .post(router.url('text-lexical-complexity', {}))
      .send({});

    expect(response.status).toBe(400);
  });

  it('returns 400 if text in body is longer than 1000characters for text-lexical-complexity POST', async () => {
    expect.assertions(1);
    const text =
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum' +
      'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum';

    const response = await request(app)
      .post(router.url('text-lexical-complexity', {}))
      .send({ text });

    expect(response.status).toBe(400);
  });

  it('returns 400 error if mode param is not verbose for text-lexical-complexity POST', async () => {
    expect.assertions(1);
    const text = 'foo';
    const response = await request(app)
      .post(router.url('text-lexical-complexity', {}))
      .query({ mode: 'foo' })
      .send({ text });

    expect(response.status).toBe(400);
  });
});
