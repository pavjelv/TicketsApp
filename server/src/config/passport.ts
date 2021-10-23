import passport from "passport";
import {Strategy} from "passport-local";
import {SecureUser} from "../models/SecureUser";
import {SecureUserModel} from "@pavo/shared-services-shared/src";

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email: string, password: string, done) => {
  SecureUser.findOne({ email })
    .then((user: SecureUserModel) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { message: 'email or password is invalid' });
      }
      return done(null, user);
    }).catch(done);
}));
