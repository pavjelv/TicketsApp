import {CredentialsModel} from "./credentials.model";
import {ProductModel} from "./product.model";

export interface OrderModel {
    _id: string;
    reporter: any;
    assignee: any;
    product: ProductModel;
    isResolved: boolean;
}

export interface OrdersState {
    orders: OrderModel[];
    credentials: CredentialsModel;
}
