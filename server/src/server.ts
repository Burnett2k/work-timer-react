require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
// const authRoutes = require('./routes/auth-routes');
import { router as authRoutes } from './routes/auth-routes';
// const sessionRoutes = require('./routes/session-routes');
import { router as sessionRoutes } from './routes/session-routes';
import cors from 'cors';
const offline = process.env.OFFLINE === 'true' ? true : false;
require('./passport-setup');

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;

// connect to mongo
if (!offline) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 3000,
  });

  var db = mongoose.connection;

  db.on('connected', () => {
    console.log('connected!');
  });
  db.on('disconnected', () => {
    console.log('connected!');
  });
  db.on('error', (error) => {
    console.log(`error occurrect: ${error}`);
  });
} else {
  console.log('offline mode: will not connect to mongodb');
}

var app = express();

app.set('port', process.env.PORT || 8080);

app.use(require('cookie-parser')());
app.use(express.json());
app.use(
  require('express-session')({
    secret: process.env.SESSION_SECRET,
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

app.use(passport.initialize());
app.use(passport.session());

// add routes
app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);

app.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});
