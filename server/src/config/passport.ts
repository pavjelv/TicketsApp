import passport from "passport";
import * as passportLocal from "passport-local";
import {SecureUser} from "../models/SecureUser";
import {SecureUserModel} from "@pavo/shared-services-shared/src";

const LocalStrategy = passportLocal.Strategy;

export function addLocalStrategy() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email: string, password: string, done) => {
        SecureUser.findOne({email})
            .then((user: SecureUserModel) => {
                if (!user || !user.validatePassword(password)) {
                    return done(null, false, {message: 'email or password is invalid'});
                }
                return done(null, user);
            }).catch(done);
    }));
}
