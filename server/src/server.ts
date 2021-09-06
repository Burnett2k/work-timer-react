require('dotenv').config();
import express from 'express';
import passport from 'passport';
import { router as authRoutes } from './routes/auth';
import { router as sessionRoutes } from './routes/session';
import cors from 'cors';
import mongoose from 'mongoose';
require('./passport-setup');

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 300,
    serverSelectionTimeoutMS: 60000
  });
} catch (error) {
  console.log(error);
}

const db = mongoose.connection;
db.on('connected', () => {
  console.log('connected!');
});
db.on('disconnected', () => {
  console.log('connected!');
});
db.on('error', (error) => {
  console.log(`mongoose error occurred: ${error}`);
});

process.on('unhandledRejection', (error: any) => {
  console.log('unhandled rejection: houston, we had a major problem!')
  console.log(error.message);
});

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL ?? 'http://localhost:3000';
const SESSION_SECRET = process.env.SESSION_SECRET ?? '';

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(require('cookie-parser')());
app.use(express.json());
const expressSessionOptions = {
  secret: SESSION_SECRET,
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
