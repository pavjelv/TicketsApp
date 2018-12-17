const Ticket = require ('./../models/Ticket')
const User = require ('./../models/User')
const fs = require ('fs')

module.exports = {
    getUser: (req, res, next) => {
        let { firstName } = req.body
            findUser({firstName})
    
        function findUser(obj) {
           return User.getUser(firstName)
        }
    }
}