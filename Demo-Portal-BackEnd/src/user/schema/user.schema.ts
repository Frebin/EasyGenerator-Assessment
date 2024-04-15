import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  roleName: { type: String, required: true, default: 'User' },
  isNewUser: { type: Boolean, required: false, default: false },
  lastLoggedIn: { type: Date, required: false },
});

export interface User extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  roleName?: string
  isNewUser?: boolean;
  lastLoggedIn?: string
}
