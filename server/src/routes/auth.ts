import { NextFunction, Request, Response, Router } from 'express';

import {
  loginFailed,
  authenticate,
  loginSuccess,
  logout,
  redirect,
} from '../controllers/authController';

export const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('request to auth endpoint at Time: ', new Date().toISOString());
  next();
});

// when login is successful, retrieve user info
router.get('/login/success', loginSuccess);

// when login failed, send failed msg
router.get('/login/failed', loginFailed);

// when user logs out, redirect to client
router.get('/logout', logout);

// call authenticate for google strategy
router.get('/google', authenticate);

// redirect after auth completes successfully
router.get('/google/redirect', redirect);
