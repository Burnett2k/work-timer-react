const router = require('express').Router();
const CLIENT_HOME_PAGE_URL = 'localhost:3000/';
const passport = require('passport');

router.use((req, res, next) => {
    console.log('Time: ', new Date());
    next();
});

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log('successful authentication');
        res.redirect(CLIENT_HOME_PAGE_URL);
    }
);

router.get('/logout', function(req, res) {
    req.logOut();
});

router.get(
    '/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        res.render('profile', { user: req.user });
    }
);

module.exports = router;
