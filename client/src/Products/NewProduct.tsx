import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {userService} from "../Services/UserService";
import {api_url} from "../environment";

interface NewProductState {
    disabled: boolean;
    title: string;
    description: string;
    price: number;
}

class NewProduct extends Component<any, NewProductState> {
    constructor(props: unknown) {
        super(props);

        this.state = {
            disabled: false,
            title: '',
            description: '',
            price: 0,
        };
    }
    updateDescription(value: string) {
        this.setState({
          description: value,
        });
      }

    updatePrice(value: string) {
        this.setState({
            price: parseInt(value),
        });
    }

    updateTitle(value: string) {
        this.setState({
          title: value,
        });
      }
    
      async submit() {
        this.setState({
          disabled: true,
        });

        await axios.post(`${api_url}/products/addProduct`,{
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
          }, {
            headers: { 'Authorization':  userService.getCredentials().token}
        });

        this.props.history.push('/products');
    }

    render() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="card border-primary">
                  <div className="card-header">New Product</div>
                  <div className="card-body text-left">
                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.updateTitle(e.target.value)}}
                        className="form-control"
                        placeholder="Give your product a title."
                      />
                    </div>
                    <div className="form-group">
                      <label>Description:</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        onBlur={(e) => {this.updateDescription(e.target.value)}}
                        className="form-control"
                        placeholder="Give more context to your product."
                      />
                    </div>
                      <div className="form-group">
                          <label>Price:</label>
                          <input
                              disabled={this.state.disabled}
                              type="number"
                              onBlur={(e) => {this.updatePrice(e.target.value)}}
                              className="form-control"
                              placeholder="Price."
                          />
                      </div>
                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.submit()}}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
}

export default withRouter(NewProduct);
