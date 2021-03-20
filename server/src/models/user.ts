import { Schema, model, Document } from 'mongoose';

export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  screenName: string;
  googleId: string;
  emailAddress: string;
};

const userSchema = new Schema<UserDocument>({
  firstName: String,
  lastName: String,
  screenName: String,
  googleId: String,
  emailAddress: String,
});

export const User = model<UserDocument>('User', userSchema);
