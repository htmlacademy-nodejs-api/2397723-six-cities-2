import {User} from '../../types/index.js';
import {Document, model, Schema} from 'mongoose';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  isPro: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
