import mongoose from 'mongoose';
import {TicketModel} from "@pavo/shared-services-shared/src";
import {TicketDAO} from "./dao/ticket.dao";
const Schema = mongoose.Schema;

const TicketSchema = new Schema<TicketDAO>({
    title: {
        type: String,
        required: false
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'UserBase'
    },
    description: {
        type: String,
        required: true
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'UserBase'
    },
    answer: {
        type: String,
        require: false
    },
    isResolved: {
        type: Boolean
    }
});

TicketSchema.methods.addTicket = function(): Promise<unknown> {
    return this.save();
}

TicketSchema.methods.addReporter = function(_id: string): Promise<unknown> {
    this.reporter = _id;
    return this.save();
}

TicketSchema.methods.assign = function(assigneeId: string): Promise<unknown> {
    this.assignee = assigneeId;
    return this.save();
}

TicketSchema.methods.addAnswer = function(answer: string): Promise<unknown> {
    this.answer = answer;
    return this.save();
}

TicketSchema.methods.resolve = function(): Promise<unknown> {
    this.isResolved = true;
    return this.save();
}

TicketSchema.statics.getAllTickets = function(): TicketModel[] {
    return this.find({'isResolved' : false}).then((ticket: TicketModel) => {
        return ticket
    });
}

TicketSchema.methods.getId = function(assigneeId) {
    return this.assignee._id == assigneeId
}

export const Ticket = mongoose.model('Ticket', TicketSchema);
