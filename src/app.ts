import * as Koa from 'koa';

import errorMiddleware from './middlewares/errorMiddleware';
import { routes } from './routes';

const app = new Koa();

// Catch all downstream errors with error middleware
app.use(errorMiddleware);

app.use(routes);

export default app;
