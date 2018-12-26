const ticketController = require ('./../controllers/ticket.ctrl')
const multipart = require ('connect-multiparty')
const multipartWare = multipart()

module.exports = (router) => {
    router 
        .route('/allTickets')
        .get(ticketController.getAll)

    router 
        .route('/ticket')
        .post(multipartWare, ticketController.addTicket)

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
        .route('/getAssignedUnresolved')
        .post(ticketController.getAssinedUnresolvedTickets)

    router
        .route('/getReportedUnresolved')
        .post(ticketController.getMyUnresolvedTickets)
}