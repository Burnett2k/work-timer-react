require('dotenv').config();
const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
require('./passport-setup');

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });

try {
    client.connect((err) => {
        if (err) {
            throw err;
        }
        const collection = client.db('work-timer-text').collection('users');
        // perform actions on the collection object
        collection.insertOne({ name: 'sawyer' });
    });
} catch (error) {
    console.log(error);
}

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

app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
    next();
};

app.get('/', authCheck, (req, res) => {
    res.status(200);
});

app.listen(app.get('port'), () => {
    console.log(`listening on ${app.get('port')}`);
});
