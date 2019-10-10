const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = 'localhost:3000';
const GOOGLE_STRATEGY = 'google';

router.use((req, res, next) => {
    console.log('Time: ', new Date());
    next();
});

router.get(
    '/google',
    passport.authenticate(GOOGLE_STRATEGY, { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate(GOOGLE_STRATEGY, {
        failureRedirect: '/login/failed',
        successRedirect: CLIENT_HOME_PAGE_URL,
    })
);

// when login failed, send failed msg
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'user failed to authenticate.',
    });
});

// when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: 'user has successfully authenticated',
            user: req.user,
            cookies: req.cookies,
        });
    }
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

module.exports = router;
