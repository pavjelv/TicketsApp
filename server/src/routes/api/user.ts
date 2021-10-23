import express from "express";
import * as userController from "../../controllers/user.ctrl";
import {auth} from "../auth";

const router = express.Router();

router.post('/getUser', auth.required, userController.getUser)
 
router.get('/getAllUsers', auth.required, userController.getAll)

router.post('/createUser', auth.required, userController.createUser)

module.exports = router;
