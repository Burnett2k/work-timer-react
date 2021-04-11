import { Schema, model, Document } from 'mongoose';

// create typescript type for model
export type UserDocument = Document & {
  firstName: string;
  lastName: string;
  screenName: string;
  googleId: string;
  emailAddress: string;
};

// create mongoose schema from UserDocument type
const userSchema = new Schema<UserDocument>({
  firstName: String,
  lastName: String,
  screenName: String,
  googleId: String,
  emailAddress: String,
});

export const User = model<UserDocument>('User', userSchema);
