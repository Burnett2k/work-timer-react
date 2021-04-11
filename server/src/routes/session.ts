import { NextFunction, Request, Response, Router } from 'express';

import {
  retrieveSessions,
  getSessionSummary,
  saveSessions,
} from '../controllers/sessionController';

export const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('request to session endpoint');
  next();
});

router.get('/', retrieveSessions);

router.post('/save', saveSessions);

router.get('/summary', getSessionSummary);
