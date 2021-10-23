import {DetailedUser} from "../models/DetailedUser";
import {DetailedUserModel} from "@pavo/shared-services-shared/src";
import {NextFunction, Request, Response} from "express";

export function getUser (req: Request, res: Response, next: NextFunction) {
    DetailedUser.findById(req.body.id).exec((err: unknown, user: DetailedUserModel) => {
        if (err) {
            return next(err);
        }
        res.send(user);
    });
}

export function getAll (_req: Request, res: Response, next: NextFunction) {
    return DetailedUser.find({}, function(err: unknown, user: DetailedUserModel[]) {
        if (err) {
            return next(err);
        }
        let usersToSend = [];
        for(var i = 0; i < user.length; i++){
            if(user[i].role != 'User'){
                usersToSend.push(user[i]);
            }
        }
        res.send(usersToSend);
        next();
    })
}

export function createUser (req: Request, res: Response, next: NextFunction) {
    const user = new DetailedUser(
        {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            token: "STDAFX.H",
            role: req.body.role,
            email: req.body.email
        }
    );

    user.save(function(err: unknown) {
        if (err) {
            return next(err);
        }
        res.send('User created successfully')
    });
}
