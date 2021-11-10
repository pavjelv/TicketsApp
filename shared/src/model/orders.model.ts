import {CredentialsModel} from "./credentials.model";
import {ProductModel} from "./product.model";
import {DetailedUserModel} from "./user-details.model";

export interface OrderModel {
    _id: string;
    participants: DetailedUserModel[];
    reporter: any;
    assignee: any;
    product: ProductModel;
    isResolved: boolean;
}

export interface OrdersState {
    orders: OrderModel[];
    credentials: CredentialsModel;
}
