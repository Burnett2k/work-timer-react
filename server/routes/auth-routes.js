const router = require('express').Router();

const authController = require('../controllers/authController');

router.use((req, res, next) => {
  console.log('request to auth endpoint at Time: ', new Date());
  next();
});

// when login is successful, retrieve user info
router.get('/login/success', authController.loginSuccess);

// when login failed, send failed msg
router.get('/login/failed', authController.loginFailed);

// when user logs out, redirect to client
router.get('/logout', authController.logout);

// call authenticate for google strategy
router.get('/google', authController.authenticate);

// redirect after auth completes successfully
router.get('/google/redirect', authController.redirect);

module.exports = router;
