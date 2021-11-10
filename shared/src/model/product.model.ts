import {CredentialsModel} from "./credentials.model";

export interface ProductModel {
    _id: string;
    title: string;
    description: string;
    price: number;
}

export interface ProductsState {
    products: ProductModel[];
    credentials: CredentialsModel;
}
