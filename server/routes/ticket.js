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
}