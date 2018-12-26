const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const userController = require ('../../controllers/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

router.post('/getUser', auth.required, userController.getUser)
 
router.get('/getAllUsers', auth.required, userController.getAll)

router.post('/createUser', auth.required, userController.createUser)

module.exports = router;