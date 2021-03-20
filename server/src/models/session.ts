import { Schema, model } from 'mongoose';

const sessionSchema = new Schema({
  userId: String,
  date: { type: Date, default: Date.now },
  secondsElapsed: Number,
  notes: {
    text: String,
  },
});

export const Session = model('session', sessionSchema);
