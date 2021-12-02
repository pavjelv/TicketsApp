import {clearDatabase, closeDatabase, connect} from "../db.setup";
import {OrderModel, ProductModel} from "@pavo/shared-services-shared/src";
import {ProductService} from "../../src/service/product.service";
import {OrderService} from "../../src/service/order.service";

const product: ProductModel = {
    title: "title MONGOOSE",
    description: "description",
    price: 123,
    participantsAmount: 1,
};
let productId;

beforeAll(async () => {
    await connect();
    await setUp();
});

afterEach(async () => { await clearDatabase() });

afterAll(async () => { await closeDatabase() });

async function setUp() {
    const service = new ProductService();
    const createdProduct = await service.addProduct(product);
    productId = createdProduct._id;
}

describe("OrderService Test", () => {
    it("Should create order", async () => {
        const service = new OrderService();
        expect.assertions(3);
        jest.spyOn(service, "addOrder");

        const orderModel: OrderModel = {
            participants: [],
            isSubmitted: false,
            product: productId,
        }
        const createdOrder = await service.addOrder(orderModel);
        expect(createdOrder.product).toEqual(orderModel.product);
        expect(createdOrder.isSubmitted).toEqual(orderModel.isSubmitted);
        expect(createdOrder.participants.length).toEqual(orderModel.participants.length);
    })
});
