import {CredentialsModel} from "./credentials.model";

export interface OrderModel {
    _id: string;
    reporter: any;
    assignee: any;
    product: any;
    isResolved: boolean;
}

export interface OrdersState {
    orders: OrderModel[];
    credentials: CredentialsModel;
}
