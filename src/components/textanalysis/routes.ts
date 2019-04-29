import koaBody = require('koa-body');
import * as Router from 'koa-router';

import { lexicalComplexity } from './resolvers';

export const router = new Router();

router.post('text-lexical-complexity', 'complexity/', koaBody(), async ctx => {
  ctx.body = await lexicalComplexity(ctx.request.body, ctx.request.query);
});

export const routes = router.routes();
