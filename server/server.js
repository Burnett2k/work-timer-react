require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');

require('./passport-setup');

// connect to mongo
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to mongo db');
    }
);

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

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
    next();
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
