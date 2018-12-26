const Ticket = require ('./../models/Ticket')
const User = require ('./../models/User')
const fs = require ('fs')

module.exports = {
    addTicket: (req, res, next) => {
        let ticket = new Ticket (
            {
                description: req.body.description,
                answer: req.body.answer,
                isResolved: false

            }
        );
            saveTicket(ticket)
    
        function saveTicket(obj) {
            new Ticket(obj).save((err, ticket) => {
                if (err)
                    res.send(err)
                else if (!ticket)
                    res.send(400)
                else {
                    return ticket.addReporter(req.body.reporterId).then((_ticket) => {
                        return res.send(_ticket)
                    })
                }
                next()
            })
        }
    },

    assign: (req, res, next) => {
        Ticket.update({_id: req.body.ticketId}, {$set:{"assignee": req.body.id}}, function(err, ticket) {
            if(err) {
                return next(err)
            }
            res.send(200)
        })
    },

    addAnswer: (req, res, next) => {
        Ticket.update({_id: req.body.ticketId}, {$set:{"answer": req.body.answer}}, function(err, ticket) {
            if(err) {
                return next(err)
            }
            res.send(200)
        })
    },

    resolve: (req, res, next) => {
        Ticket.update({_id: req.body.ticketId}, {$set:{"isResolved": req.body.isResolved}}, function(err, ticket) {
            if(err) {
                return next(err)
            }
            res.send(200)
        })
    },

    getAll: (req, res, next) => {
        Ticket.find({})
        .populate('reporter')
        .populate('assignee').exec((err, ticket)=> {
            if (err)
                res.send(err)
            else if (!ticket)
                res.send(404)
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
                res.send(404)
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
                res.send(404)
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
                res.send(404)
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
                res.send(404)
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
                res.send(404)
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