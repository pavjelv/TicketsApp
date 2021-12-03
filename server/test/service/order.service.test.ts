import {clearDatabase, closeDatabase, connect} from "../db.setup";
import {OrderModel, ProductModel} from "@pavo/shared-services-shared/src";
import {ProductService} from "../../src/service/product.service";
import {OrderService} from "../../src/service/order.service";
import {RegistrationModel} from "../../src/service/user.service";
import {UserService} from "../../src/service/user.service";
import {DetailedUserRepository} from "../../src/repository/detailed-user.repository";
import {SecureUserRepository} from "../../src/repository/secure-user.repository";
jest.setTimeout(40000);

const product: ProductModel = {
    title: "title MONGOOSE",
    description: "description",
    price: 123,
    participantsAmount: 1,
};

const registrationModel: RegistrationModel = {
    email: "a@a.com",
    password: "1",
    firstName: "Test First Name",
    lastName: "Last Name",
    phone: 123123
};

const registrationModel2: RegistrationModel = {
    email: "aa@a.com",
    password: "1",
    firstName: "Test First Name1",
    lastName: "Last Name1",
    phone: 1231231
};

let productId;
let secureUserId;
let secureUserId2;

beforeAll(async () => { await connect() });

beforeEach(async () => { await setUp() });

afterEach(async () => { await clearDatabase() });

afterAll(async () => { await closeDatabase() });

async function setUp() {
    const service = new ProductService();
    const createdProduct = await service.addProduct(product);
    productId = createdProduct._id;
    const credentials = await new UserService().createUser(registrationModel);
    secureUserId = await DetailedUserRepository.findById(credentials._id)
        .exec()
        .then((detailedUser) => {
            return SecureUserRepository.findOne({"email" : detailedUser.email})
                .exec()
                .then((user) => Promise.resolve(user._id));
        });

    const credentials2 = await new UserService().createUser(registrationModel2);
    secureUserId2 = await DetailedUserRepository.findById(credentials2._id)
        .exec()
        .then((detailedUser) => {
            return SecureUserRepository.findOne({"email" : detailedUser.email})
                .exec()
                .then((user) => Promise.resolve(user._id));
        });
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
    });

    it("Should return orders", async () => {
        const service = new OrderService();
        expect.assertions(4);
        jest.spyOn(service, "getAll");

        const orderModel: OrderModel = {
            participants: [],
            isSubmitted: false,
            product: productId,
        }
        await service.addOrder(orderModel);
        const orders = await service.getAll();
        expect(orders.length).toEqual(1);
        expect(orders[0].product._id).toEqual(productId);
        expect(orders[0].participants.length).toEqual(orderModel.participants.length);

        await service.addOrder(orderModel);
        const moreOrders = await service.getAll();
        expect(moreOrders.length).toEqual(2);
    });

    it("Should return specific order", async () => {
        const service = new OrderService();
        expect.assertions(3);
        jest.spyOn(service, "getOrder");

        const orderModel: OrderModel = {
            participants: [],
            isSubmitted: false,
            product: productId,
        }
        const orderModel2: OrderModel = {
            participants: [],
            isSubmitted: true,
            product: productId,
        }
        await service.addOrder(orderModel);
        const createdOrder = await service.addOrder(orderModel2);
        const returnedOrder = await service.getOrder(createdOrder._id);

        expect(returnedOrder._id).toEqual(createdOrder._id);
        expect(returnedOrder.isSubmitted).toEqual(createdOrder.isSubmitted);
        expect(returnedOrder.product._id).toEqual(createdOrder.product);
    });

    it("Should add participant", async () => {
        const service = new OrderService();
        expect.assertions(2);
        jest.spyOn(service, "addParticipant");

        const orderModel: OrderModel = {
            participants: [],
            isSubmitted: false,
            product: productId,
        }

        const createdOrder = await service.addOrder(orderModel);
        const document = await service.addParticipant(secureUserId, createdOrder._id) as any;
        const updatedOrder = await service.getOrder(createdOrder._id);

        expect(document.nModified).toEqual(1);
        expect(updatedOrder.participants.length).toEqual(1);
    });

    it("Should validate participants", async () => {
        const service = new OrderService();
        expect.assertions(2);
        jest.spyOn(service, "addParticipant");

        const orderModel: OrderModel = {
            participants: [],
            isSubmitted: false,
            product: productId,
        }

        const createdOrder = await service.addOrder(orderModel);

        await service.addParticipant(secureUserId, createdOrder._id);
        await expect(service.addParticipant(secureUserId, createdOrder._id)).rejects.toEqual("You are participant already!");

        await expect(service.addParticipant(secureUserId2, createdOrder._id)).rejects.toEqual("Too many participants!");
    });
});
