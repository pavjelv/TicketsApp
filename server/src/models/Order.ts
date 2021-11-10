import mongoose from 'mongoose';
import {OrderModel} from "@pavo/shared-services-shared/src";
import {OrderDao} from "./dao/order.dao";
const Schema = mongoose.Schema;

const OrderSchema = new Schema<OrderDao>({
    product : {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'DetailedUser'
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'DetailedUser'
    },
    isResolved: {
        type: Boolean
    }
});

OrderSchema.methods.addOrder = function(): Promise<unknown> {
    return this.save();
}

OrderSchema.methods.addReporter = function(_id: string): Promise<unknown> {
    this.reporter = _id;
    return this.save();
}

OrderSchema.methods.assign = function(assigneeId: string): Promise<unknown> {
    this.assignee = assigneeId;
    return this.save();
}

OrderSchema.methods.resolve = function(): Promise<unknown> {
    this.isResolved = true;
    return this.save();
}

OrderSchema.statics.getAllTickets = function(): OrderModel[] {
    return this.find({'isResolved' : false}).then((ticket: OrderModel) => {
        return ticket
    });
}

OrderSchema.methods.getId = function(assigneeId) {
    return this.assignee._id == assigneeId
}

export const Order = mongoose.model('Order', OrderSchema);
