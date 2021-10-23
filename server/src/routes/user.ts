import * as userController from "../controllers/user.ctrl";
import {Router} from "express";

export default (router: Router) => {
    router
        .route ('/getUser')
        .post(userController.getUser)

    router
        .route ('/getAllUsers')
        .get(userController.getAll)

    router
        .route ('/createUser')
        .post(userController.createUser)
}
