import mongoose from 'mongoose';
import {OrderDao} from "./dao/order.dao";
const Schema = mongoose.Schema;

const OrderSchema = new Schema<OrderDao>({
    product : {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: "DetailedUser"
    }],
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'DetailedUser'
    },
    isResolved: {
        type: Boolean
    }
});


export interface IOrderRepository {

}

export const OrderRepository = mongoose.model('Order', OrderSchema);
