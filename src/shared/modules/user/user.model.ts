import {User} from '../../types/index.js';
import {Document, model, Schema} from 'mongoose';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  name: String,
  avatarUrl: String,
  isPro: Boolean,
  email: String,
  token: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
