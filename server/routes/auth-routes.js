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

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
    '/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        res.render('profile', { user: req.user });
    }
);

module.exports = router;
