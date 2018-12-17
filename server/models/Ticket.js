const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TicketSchema = new Schema({
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {type: String, required: true},
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: {type: String, require: false},
    isResolved: {type: Boolean}
});

TicketSchema.methods.addTicket = function() {
    return this.save()
}
TicketSchema.methods.addReporter = function(_id) {
    this.reporter = _id
    return this.save()
}
TicketSchema.methods.assign = function(assigneeId) {
    this.assignee = assigneeId
    return this.save()
}
TicketSchema.methods.addAnswer = function(answer) {
    this.answer = answer;
    return this.save()
}
TicketSchema.methods.resolve = function(isResolved = true) {
    this.isResolved = isResolved;
    return this.save()
}
TicketSchema.methods.getUserTickets = function(_id) {
    Ticket.find({'reporter' : _id}).then((ticket) => {
        return ticket
    })
}
TicketSchema.methods.getAssignedTickets = function(_id) {
    Ticket.find({'assignee' : _id}).then((ticket) => {
        return ticket
    })
}
TicketSchema.methods.getAllTickets = function() {
    Ticket.find({'isResolved' : false}).then((ticket) => {
        return ticket
    })
}
module.exports = mongoose.model('Ticket', TicketSchema);