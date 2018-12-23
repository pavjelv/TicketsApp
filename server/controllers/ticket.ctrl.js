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

    getMyTickets: (req, res, next) => {
        Ticket.find({"reporter": {"id" : req.body.id}})
        .populate('assignee')
        .exec((err, ticket) => {
            if(err){
                res.send(err)
            }
            res.send(ticket)
            next()
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
                //let ass = db.Ticket.find().toArray();
                res.send(ticket)
            }
            next()     
            //if(ticket.assignee._id == req.body.id) {
               // res.send(ticket)
              //  next()
            //}
        })
    }

}