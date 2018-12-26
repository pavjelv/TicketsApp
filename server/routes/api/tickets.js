const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const ticketController = require ('../../controllers/ticket.ctrl')
const multipart = require ('connect-multiparty')
const multipartWare = multipart()

router.get('/allTickets', auth.optional, ticketController.getAll)

router.get('/getTicket/:id', auth.optional, ticketController.getTicket)

router.post('/addTicket', auth.required, ticketController.addTicket)

router.post('/getMyTickets', auth.required, ticketController.getMyTickets)

router.post('/getAssignedTickets', auth.required, ticketController.getAssignedTickets)

router.post('/assign', auth.required, ticketController.assign)

router.post('/resolve', auth.required, ticketController.resolve)

router.post('/answer', auth.required, ticketController.addAnswer)

router.get('/getAllUnresolved', auth.required, ticketController.getAllUnresolved)

router.post('/getAssignedUnresolved', auth.required, ticketController.getAssinedUnresolvedTickets)

router.post('/getReportedUnresolved', auth.required, ticketController.getMyUnresolvedTickets)

module.exports = router;