const Ticket = require ('./../models/Ticket')
const User = require ('./../models/User')
const UserCredentials = require('../models/Users')
const fs = require ('fs')

module.exports = {
    addTicket: (req, res, next) => {
        const { payload: { id } } = req;
        let ticket = new Ticket (
            {
                title: req.body.title,
                description: req.body.description,
                answer: req.body.answer,
                isResolved: false

            }
        );
            saveTicket(ticket)
            
        function saveTicket(obj) {
            UserCredentials.findById(id).then((user) => {
                User.find({"email" : user.email}).then((userProps)=>{
                    new Ticket(obj).save((err, ticket) => {
                        if (err)
                            res.send(err)
                        else if (!ticket)
                        res.status(400).send()
                        else {
                            return ticket.addReporter(userProps[0]._id).then((_ticket) => {
                            return res.send(_ticket)
                            })
                        }
                        next()
            })
        })
        })
        }
    },

    assign: (req, res, next) => {
        Ticket.update({_id: req.body.ticketId}, {$set:{"assignee": req.body.id}}, function(err, ticket) {
            if(err) {
                return next(err)
            }
            res.status(200).send()
        })
    },

    addAnswer: (req, res, next) => {
        Ticket.update({_id: req.body.ticketId}, {$set:{"answer": req.body.answer}}, function(err, ticket) {
            if(err) {
                return next(err)
            }
            res.status(200).send()
        })
    },

    resolve: (req, res, next) => {
        Ticket.update({_id: req.body.ticketId}, {$set:{"isResolved": "true"}}, function(err, ticket) {
            if(err) {
                return next(err)
            }
            res.status(200).send()
        })
    },

    getAll: (req, res, next) => {
        Ticket.find({})
        .populate('reporter')
        .populate('assignee')
        .exec((err, ticket)=> {
            if (err)
                res.send(err)
            else if (!ticket)
                res.status(404).send()
            else
                res.send(ticket)
            next()            
        })
    },

    getTicket: (req,res, next) => {
        Ticket.findById(req.params.id)
        .populate('reporter')
        .populate('assignee').exec((err, ticket)=> {
            if (err)
                res.send(err)
            else if (!ticket)
                res.status(404).send()
            else
                res.send(ticket)
            next()            
        })
    },

    getAllUnresolved: (req,res, next) => {
        Ticket.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee').exec((err, ticket)=> {
            if (err)
                res.send(err)
            else if (!ticket)
                res.status(404).send()
            else
                res.send(ticket)
            next()            
        })
    },

    getMyUnresolvedTickets: (req,res, next) => {
        Ticket.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee').exec((err, ticket)=> {
            if (err)
                res.send(err)
            else if (!ticket)
            res.status(404).send()
            else { 
            let tickets = []
            for(let i = 0; i < ticket.length; i++) {
                let tckt = ticket[i];
                if(tckt.reporter._id == req.body.id) {
                    tickets.push(tckt)
                }
            }
            res.send(tickets)
            next()
        }      
        })
    },

    getMyTickets: (req, res, next) => {
        Ticket.find({})
        .populate('assignee')
        .exec((err, ticket) => {
            if(err) {
                res.send(err)
            }
            else if (!ticket) {
                res.status(404).send()
            }
            else {
            let tickets = []
            for(let i = 0; i < ticket.length; i++) {
                let tckt = ticket[i];
                if(tckt.reporter._id == req.body.id) {
                    tickets.push(tckt)
                }
            }
            res.send(tickets)
            next()
        }
        })
    },

    getAssinedUnresolvedTickets: (req, res, next) => {
        Ticket.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee').exec((err, ticket)=> {
            if (err)
                res.send(err)
            else if (!ticket)
            res.status(404).send()
            else { 
            let tickets = []
            for(let i = 0; i < ticket.length; i++) {
                let tckt = ticket[i];
                if(tckt.assigne._id == req.body.id) {
                    tickets.push(tckt)
                }
            }
            res.send(tickets)
            next()
        }      
        })
    },

    getAssignedTickets: (req, res, next) => {
        Ticket.find({})
        .populate ('assignee')
        .populate('reporter')
        .exec((err, ticket) => {
            if (err)
                res.send(err)
            else if (!ticket)
            res.status(404).send()
            else {
                let tickets = [];
                for(let i = 0; i < ticket.length; i++) {
                    let tckt = ticket[i];
                    if (tckt.assignee._id == req.body.id) {
                        tickets.push(tckt)
                    }
                }
                res.send(tickets)
            }
            next()     
        })
    }

}