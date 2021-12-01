import {Schema, model} from "mongoose"
import crypto from "crypto";
import * as jwt from "jsonwebtoken";
import {SecureUserDao} from "./dao/secure-user.dao";

const UsersSchema = new Schema<SecureUserDao>({
  email: String,
  hash: String,
  salt: String,
});

UsersSchema.methods.setPassword = function(password: string): void {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function(): string {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(String(expirationDate.getTime() / 1000), 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
}

export const SecureUserRepository = model('SecureUser', UsersSchema);

