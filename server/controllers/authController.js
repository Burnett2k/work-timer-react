const passport = require('passport');
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const GOOGLE_STRATEGY = 'google';

exports.loginSuccess = function(req, res) {
    if (req.user) {
        res.json({
            success: true,
            message: 'user has successfully authenticated',
            user: req.user,
            cookies: req.cookies,
        });
    } else {
        res.status(401).json({ success: false });
    }
};

exports.loginFailed = function(req, res) {
    res.status(401).json({
        success: false,
        message: 'user failed to authenticate.',
    });
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
};

exports.authenticate = function(req, res, next) {
    passport.authenticate(GOOGLE_STRATEGY, { scope: ['profile', 'email'] })(
        req,
        res,
        next
    );
};

exports.redirect = function(req, res, next) {
    passport.authenticate(GOOGLE_STRATEGY, {
        failureRedirect: '/login/failed',
        successRedirect: CLIENT_HOME_PAGE_URL,
    })(req, res, next);
};
