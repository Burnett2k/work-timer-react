require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');
const cors = require('cors');
const offline = Boolean(process.env.OFFLINE) || false;
require('./passport-setup');

// connect to mongo
if (!offline) {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('connected to mongo db');
        })
        .catch((err) => {
            console.log(`cannot connect to mongo: ${err}`);
            process.exit(1);
        });
} else {
    console.log('did not connect to mongo due to being in offline mode');
}

// Create a new Express application.
var app = express();

app.set('port', process.env.PORT || 8080);

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
        maxAge: 24 * 60 * 60 * 1000,
    })
);

// set up cors to allow us to accept requests from our client
app.use(
    cors({
        origin: 'http://localhost:3000', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // allow session cookie from browser to pass through
    })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: 'user has not been authenticated',
        });
    } else {
        next();
    }
};

app.get('/', authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: 'user successfully authenticated',
        user: req.user,
        cookies: req.cookies,
    });
});

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`);
});
