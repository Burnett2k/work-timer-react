require('dotenv').config();

const express = require('express');
const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;

passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.REDIRECT_URL,
        },
        function(accessToken, refreshToken, profile, cb) {
            // In this example, the user's Facebook profile is supplied as the user
            // record.  In a production-quality application, the Facebook profile should
            // be associated with a user record in the application's database, which
            // allows for account linking and authentication with other identity
            // providers.
            return cb(null, profile);
        }
    )
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    null, obj;
});

// Create a new Express application.
var app = express();
app.set('port', process.env.PORT || 8080);

// Configure view engine to render EJS templates.
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
    require('express-session')({
        secret: 'hellotheremydarling',
        resave: true,
        saveUninitialized: true,
    })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
// app.get('/', function(req, res) {
//     res.render('home', { user: req.user });
// });

// app.get('/login', function(req, res) {
//     res.render('login');
// });

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log('successful authentication');
        res.redirect('localhost:3000/');
    }
);

app.get('/logout', function(req, res) {
    req.logOut();
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(), function(
    req,
    res
) {
    res.render('profile', { user: req.user });
});

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`);
});
