import {OrderModel} from "@pavo/shared-services-shared/src";

export interface OrderDao extends OrderModel {
    addReporter: (reporter: string) => Promise<unknown>;
    assign: (assignee: string) => Promise<unknown>;
    addAnswer: (answer: string) => Promise<unknown>;
    resolve: () => Promise<unknown>;
}
