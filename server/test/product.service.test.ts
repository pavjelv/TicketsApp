import {ProductService} from "../src/service/product.service";
import {ProductModel} from "@pavo/shared-services-shared/src";

describe("ProductService Test", () => {
    it('should validate product parameters', () => {
        const service = new ProductService();
        const product: ProductModel = {
            title: "title",
            description: "description",
            price: null,
            participantsAmount: 1,
        };
        jest.spyOn(service, "addProduct");

        expect(service.addProduct(product)).rejects.toEqual("price is required");
    });
})
