const Ticket = require ('./../models/Ticket')
const User = require ('./../models/User')
const fs = require ('fs')

module.exports = {

    getUser: (req, res, next) => {
        User.findById(req.body.id).exec((err, user) => {
            if(err) {
            return next(err);
            }
            res.send(user); 
        })
    },

    getAll: (req, res, next) => {
        return User.find({}, function(err, user) {
            if(err) {
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
    },

    createUser: (req, res, next) => {
        let user = new User(
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
        
        user.save(function(err) {
            if(err){
                return next(err);
            }
            res.send('User created successfully')
        })
    }
}   