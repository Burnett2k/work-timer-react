require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const sessionRoutes = require('./routes/session-routes');
const mongoose = require('mongoose');
const cors = require('cors');
const offline = process.env.OFFLINE === 'true' ? true : false;
require('./passport-setup');

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;

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
    console.log('offline mode: will not connect to mongodb');
}

// Create a new Express application.
var app = express();

app.set('port', process.env.PORT || 8080);

app.use(require('cookie-parser')());
app.use(express.json());
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
        origin: CLIENT_HOME_PAGE_URL, // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // allow session cookie from browser to pass through
    })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/session', sessionRoutes);

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
