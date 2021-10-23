import * as ticketController from "../controllers/ticket.ctrl";
import {Router} from "express";

export default (router: Router) => {
    router 
        .route('/allTickets')
        .get(ticketController.getAll)

    router
        .route('/getTicket/:id')
        .get(ticketController.getTicket)
    
    router 
        .route('/addTicket')
        .post(ticketController.addTicket)

    router
        .route('/getMyTickets')
        .post(ticketController.getMyTickets)

    router 
        .route('/getAssignedTickets')
        .post(ticketController.getAssignedTickets)

    router
        .route('/assign')
        .post(ticketController.assign)

    router
        .route('/resolve')
        .post(ticketController.resolve)

    router
        .route('/answer')
        .post(ticketController.addAnswer)

    router
        .route('/getAllUnresolved')
        .get(ticketController.getAllUnresolved)

    router 
        .route('/getUnassignedUnresolved')
        .post(ticketController.getUnassignedUnresolvedTickets)

    router
        .route('/getReportedUnresolved')
        .post(ticketController.getMyUnresolvedTickets)
}
