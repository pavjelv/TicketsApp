import {TicketModel} from "@pavo/shared-services-shared/src";

export interface TicketDAO extends TicketModel {
    addReporter: (reporter: string) => Promise<unknown>;
    assign: (assignee: string) => Promise<unknown>;
    addAnswer: (answer: string) => Promise<unknown>;
    resolve: () => Promise<unknown>;
}
