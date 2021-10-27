import mongoose from 'mongoose';
import {ProductDao} from "./dao/product.dao";
const Schema = mongoose.Schema;

const ProductSchema = new Schema<ProductDao>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'DetailedUser'
    }
});

ProductSchema.methods.addParticipant = function(_id: string): Promise<unknown> {
    this.participant = _id;
    return this.save();
}

export const Product = mongoose.model('Product', ProductSchema);

