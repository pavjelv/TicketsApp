import {CredentialsModel} from "./credentials.model";

export interface TicketModel {
    _id: string;
    title: string;
    reporter: any;
    description: string;
    assignee: any;
    answer: string;
    isResolved: boolean;
}

export interface TicketsState {
    tickets: TicketModel[];
    credentials: CredentialsModel;
}
