const Ticket = require ('./../models/Ticket')
const User = require ('./../models/User')
const fs = require ('fs')

module.exports = {
    addTicket: (req, res, next) => {
        let { description } = req.body
            saveTicket({description})
    
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
    getAll: (req, res, next) => {
        Ticket.find(req.params.id)
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
    }
}