const Ticket = require ('./../models/Ticket')
const User = require ('./../models/User')
const fs = require ('fs')

module.exports = {
    getUser: (req, res, next) => {
        let firstName  =  req.body.firstName
            findUser({firstName})
    
        function findUser(obj) {
           return User.findById(firstName, function(err, user){
               if(err) {
                return next(err);
               }
               res.send(user); 
           })
        }
    },

    getAll: (req, res, next) => {
        return User.find({}, function(err, user) {
            if(err) {
                return next(err);
            }
            res.send(user);
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
                role: req.body.role
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