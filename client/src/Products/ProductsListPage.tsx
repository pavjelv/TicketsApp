import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {userService} from "../Services/UserService";
import {ProductModel, ProductsState} from "@pavo/shared-services-shared/src";
import axiosInstance from "../Auth/AxiosInstance";
import {Button, Card, Col, notification, Row} from "antd";

class ProductsListPage extends Component<any, ProductsState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            products: null,
            credentials: null,
        };
        this.createOrder = this.createOrder.bind(this);
    }

    async componentDidMount() {
        const products: ProductModel[] = (await axiosInstance.get(`/products/allProducts`)).data;
        this.setState({
            products,
            credentials: userService.getCredentials(),
        });
    }

     createOrder(id: string) {
        axiosInstance.post(`/orders/addOrder`, {
            product: id,
        }).then((_order) => {
            this.successNotification();
            // this.props.history.push('/');
        }, (error: unknown) => {
            console.log(error)
        });
    }

    successNotification() {
        notification["success"]({
            message: 'Order has been successfully created!',
        });
    };

    render() {
        return (
            <div className="products-page-cards-container">
                { userService.isAuthenticated() && (userService.hasRole('User') || userService.hasRole('Admin')) &&
                    <div style={{paddingBottom: "15px"}}>
                        <Button type={"primary"}>
                            <Link to='/newProduct'>
                                New Product
                            </Link>
                        </Button>

                    </div>
                }
                <Row gutter={16}>
                {this.state.products === null && <p>Loading products... </p>}
                    {
                        this.state.products?.map(product => (
                            <Col span={6}
                                 style={{paddingBottom: "10px"}}
                                 key={product._id}
                            >
                                <Card
                                    title={product.title}
                                    style={{ width: 300 }}
                                    actions={[
                                        <Button
                                            type={"primary"}
                                            onClick={() => this.createOrder(product._id)}
                                        >
                                            Create Order
                                        </Button>
                                    ]}
                                >
                                    <p>{product.description}</p>
                                    <b>Price: {product.price}</b>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}

export default withRouter(ProductsListPage);
