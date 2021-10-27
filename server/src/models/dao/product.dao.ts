import {ProductModel} from "@pavo/shared-services-shared/src";

export interface ProductDao extends ProductModel {
    addParticipant: (participant: string) => Promise<unknown>;
}
