import { Context } from 'koa';

import IApiErrorResponse from '../common/api/IApiErrorResponse';
import IApiResponse from '../common/api/IApiResponse';

async function errorMiddleware(ctx: Context, next: () => Promise<any>) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.httpCode || err.status || 500;
    const error: IApiErrorResponse = {
      message: ctx.status === 500 ? 'Internal server error' : err.message
    };
    if (ctx.status !== 500 && err.description) {
      error.description = err.description;
    }
    ctx.body = {
      error
    } as IApiResponse;

    // If code is 500, emit the error, so app can be restarted by process manager
    if (ctx.status === 500) {
      ctx.app.emit('error', err, ctx);
    }
  }
}

export default errorMiddleware;
