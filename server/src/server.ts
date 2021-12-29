require('dotenv').config();
import express from 'express';
import passport from 'passport';
import { router as authRoutes } from './routes/auth';
import { router as sessionRoutes } from './routes/session';
import cors from 'cors';
import mongoose from 'mongoose';
import {logger} from "./logger"
require('./passport-setup');

try {
  mongoose.connect(process.env.MONGO_URI, {
    connectTimeoutMS: 60000,
    serverSelectionTimeoutMS: 60000
  });
} catch (error) {
  logger.error(error);
}

const db = mongoose.connection;
db.on('connected', () => {
  logger.info('connected to database');
});
db.on('disconnected', () => {
  logger.warn('disconnected from database');
});
db.on('error', (error) => {
  logger.error(error, "database error occurred");
});

process.on('unhandledRejection', (error: any) => {
  logger.error(error, 'unhandled rejection: houston, we had a major problem!')
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
  methods: ['GET', 'POST'],
  credentials: true, // allow session cookie from browser to pass through
};

// set up cors to allow us to accept requests from our client
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);

app.listen(app.get('port'), () => {
  logger.info(`listening on ${app.get('port')}`);
});
