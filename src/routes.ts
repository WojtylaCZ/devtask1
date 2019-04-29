import * as Router from 'koa-router';

import { routes as textAnalysisRoutes } from './components/textanalysis/routes';

const router = new Router();

router.use('/', textAnalysisRoutes);

export const routes = router.routes();
