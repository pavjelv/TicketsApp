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
    price: {
        type: Number,
        required: true
    }
});

export const Product = mongoose.model('Product', ProductSchema);

