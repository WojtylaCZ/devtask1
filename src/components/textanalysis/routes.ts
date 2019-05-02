import koaBody = require('koa-body');
import * as Router from 'koa-router';

import { addNonLexicalWord, lexicalComplexity } from './resolvers';

export const router = new Router();

router.post('text-lexical-complexity', 'complexity/', koaBody(), async ctx => {
  ctx.body = await lexicalComplexity(ctx.request.body, ctx.request.query);
});

router.post('text-nonlexicalwords-add', 'nonlexicalwords/add', koaBody(), async ctx => {
  ctx.body = await addNonLexicalWord(ctx.request.body);
});

export const routes = router.routes();
