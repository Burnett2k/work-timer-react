import passport from 'passport';
import { NextFunction, Request, Response } from 'express';

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const GOOGLE_STRATEGY = 'google';

export const loginSuccess = function(req: Request, res: Response) {
  if (req.user) {
    const message = 'user has successfully authenticated';
    console.log(message);
    res.json({
      success: true,
      message: message,
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({ success: false });
  }
};

export const loginFailed = function(req: Request, res: Response) {
  console.log('failed authentication attempt');
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
};

export const logout = function(req: Request, res: Response) {
  console.log('logout attempted');
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
};

export const authenticate = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(GOOGLE_STRATEGY, { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
};

export const redirect = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(GOOGLE_STRATEGY, {
    failureRedirect: '/login/failed',
    successRedirect: CLIENT_HOME_PAGE_URL,
  })(req, res, next);
};
