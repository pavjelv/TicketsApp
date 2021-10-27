import {CredentialsModel} from "./credentials.model";

export interface OrderModel {
    _id: string;
    title: string;
    reporter: any;
    description: string;
    assignee: any;
    answer: string;
    isResolved: boolean;
}

export interface OrdersState {
    orders: OrderModel[];
    credentials: CredentialsModel;
}
