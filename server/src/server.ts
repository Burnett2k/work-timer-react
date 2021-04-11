require('dotenv').config();
import express from 'express';
import passport from 'passport';
import { router as authRoutes } from './routes/auth';
import { router as sessionRoutes } from './routes/session';
import cors from 'cors';
require('./passport-setup');
require('./mongo-setup');

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(require('cookie-parser')());
app.use(express.json());
const expressSessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 1000,
};

app.use(require('express-session')(expressSessionOptions));

const corsOptions = {
  origin: CLIENT_HOME_PAGE_URL, // allow to server to accept request from different origin
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true, // allow session cookie from browser to pass through
};

// set up cors to allow us to accept requests from our client
app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);

app.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});
