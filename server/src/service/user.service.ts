import {DetailedUser} from "../repository/detailed-user.repository";
import {DetailedUserModel, SecureUserModel} from "@pavo/shared-services-shared/src";
import {NextFunction, Request, Response} from "express";
import {SecureUser} from "../repository/secure-user.repository";

export interface IUserService {
    getUser: (req: Request, res: Response, next: NextFunction) => unknown;
    getAll: (_req: Request, res: Response, next: NextFunction) => unknown;
    createUser: (req: Request, res: Response, _next: NextFunction) => unknown;
}

class UserService implements IUserService {
    getUser(req: Request, res: Response, next: NextFunction) {
        DetailedUser.findById(req.body.id).exec((err: unknown, user: DetailedUserModel) => {
            if (err) {
                return next(err);
            }
            res.send(user);
        });
    }

    getAll(_req: Request, res: Response, next: NextFunction) {
        return DetailedUser.find({}, function(err: unknown, user: DetailedUserModel[]) {
            if (err) {
                return next(err);
            }
            let usersToSend = [];
            for(let i = 0; i < user.length; i++){
                if(user[i].role != 'User'){
                    usersToSend.push(user[i]);
                }
            }
            res.send(usersToSend);
            next();
        })
    }

   createUser(req: Request, res: Response, _next: NextFunction) {

        let user = ({
            email: req.body.email,
            password: req.body.password
        })
        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        const finalUser = new SecureUser(user);

        finalUser.setPassword(user.password);

        return finalUser.save()
            .then((secureUser: SecureUserModel) => {
                const user = new DetailedUser(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        phone: req.body.phone,
                        token: "STDAFX.H",
                        role: "User",
                        email: req.body.email
                    }
                );

                user.save()
                    .then((userDetails: DetailedUserModel) => {
                        let credentials = {
                            firstName : userDetails.firstName,
                            token : "Token=" + secureUser.generateJWT(),
                            role: userDetails.role,
                            _id : userDetails._id
                        }
                        console.log(credentials)
                        return res.json({credentials});
                    });
            });
    }
}

export default new UserService();
