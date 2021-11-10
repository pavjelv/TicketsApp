import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import {userService} from "../Services/UserService";
import {ProductModel, ProductsState} from "@pavo/shared-services-shared/src";
import {api_url} from "../environment";

class ProductsListPage extends Component<any, ProductsState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            products: null,
            credentials: null,
        };
    }

    async componentDidMount() {
        const products: ProductModel[] = (await axios.get(`${api_url}/products/allProducts`)).data;
        this.setState({
            products,
            credentials: userService.getCredentials(),
        });
    }

     createOrder(id: string) {
        axios.post(`${api_url}/orders/addOrder`, {
            product: id,
        }, {
                headers: { 'Authorization':  userService.getCredentials().token }
        }).then(() => {
            this.props.history.push('/');
        }, (error: unknown) => console.log(error));
    }

    render() {
        return (
            <div className="container">
                 { userService.isAuthenticated() && (userService.hasRole('User') || userService.hasRole('Admin')) &&
                    <div className= "float-right"> 
                        <Link to='/newProduct'>
                                <button type="button" className="btn btn-primary btn-lg">New Product</button>
                        </Link>
                    </div>
                }
                <div className="row">
                    {this.state.products === null && <p>Loading products... </p>}
                    {
                        this.state.products && this.state.products.map(product => (
                            <div key={product._id} className="col-sm-12 col-md-4 col-lg-3">
                                 <div className={"card text-white bg-success mb-3"}>
                                    <div className="card-body">
                                        <h2 className="card-title">{product.title}</h2>
                                        <h4 className="card-text">{product.description}</h4>
                                        <h4 className="card-text">{product.price}</h4>
                                        <button type="button" className="btn btn-primary btn-md" onClick={() => this.createOrder(product._id)}>Create Order</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ProductsListPage);
