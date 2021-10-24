import express from "express";

const router = express.Router();

import {auth} from "../auth";
import * as ticketController from "../../controllers/ticket.ctrl";

router.get('/allTickets', auth.optional, ticketController.getAll)

router.get('/getTicket/:id', auth.optional, ticketController.getTicket)

router.post('/addTicket', auth.required, ticketController.addTicket)

router.post('/getMyTickets', auth.required, ticketController.getMyTickets)

router.post('/getAssignedTickets', auth.required, ticketController.getAssignedTickets)

router.post('/assign', auth.required, ticketController.assign)

router.post('/resolve', auth.required, ticketController.resolve)

router.post('/answer', auth.required, ticketController.addAnswer)

router.get('/getAllUnresolved', auth.required, ticketController.getAllUnresolved)

router.post('/getUnassignedUnresolved', auth.required, ticketController.getUnassignedUnresolvedTickets)

router.post('/getReportedUnresolved', auth.required, ticketController.getMyUnresolvedTickets)

module.exports = router;
