import express from "express";
import {IUserService, UserService} from "../../service/user.service";
import {auth} from "../../auth/auth";

const userService: IUserService = new UserService();
const router = express.Router();

// stub
export class UserController {
    getUser() {
        new UserService().getUser({} as any, {} as any, {} as any);
    }

    getAllUsers() {}

    createUser() {}
}

router.post('/getUser', auth.required, userService.getUser)
 
router.get('/getAllUsers', auth.required, userService.getAll)

router.post('/createUser', auth.optional, userService.createUser)

module.exports = router;
