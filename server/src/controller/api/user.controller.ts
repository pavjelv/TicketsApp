import express from "express";
import userService from "../../service/user.service";
import {auth} from "../../auth/auth";

const router = express.Router();

router.post('/getUser', auth.required, userService.getUser)
 
router.get('/getAllUsers', auth.required, userService.getAll)

router.post('/createUser', auth.optional, userService.createUser)

module.exports = router;
