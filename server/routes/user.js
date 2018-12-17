const userController = require ('./../controllers/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
    
    router
        .route ('/getUser')
        .post(userController.getUser)
}