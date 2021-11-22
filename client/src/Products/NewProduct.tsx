import React, {Component} from 'react';
import axiosInstance from "../Auth/AxiosInstance";
import {Button, Form, FormInstance, Input, InputNumber} from "antd";
import {withRouter} from "react-router-dom";

interface NewProductState {
    disabled: boolean;
    title: string;
    description: string;
    price: number;
    participantsAmount: number;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class NewProduct extends Component<any, NewProductState> {
    formRef = React.createRef<FormInstance>();

    constructor(props: unknown) {
        super(props);

        this.state = {
            disabled: false,
            title: '',
            description: '',
            price: 0,
            participantsAmount: 0,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: NewProductState): void {
        this.setState({
          disabled: true,
        });

        axiosInstance.post(`/products/addProduct`,e).then((_result) => {
            this.props.history.push('/products');
        });
    }

    render() {
        return (
            <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <h2 style={{paddingBottom: "15px"}}>New Product</h2>
                <Form {...layout}
                      ref={this.formRef}
                      name="control-ref"
                      className="login-form"
                      style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "50%",
                          paddingRight: "12%"
                      }}
                      onFinish={this.handleSubmit}>
                    <Form.Item name="title" label="Title" rules={[
                        {
                            required: true,
                            message: "Please, input title!"
                        }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[
                        {
                            required: true,
                            message: "Please, input price!"
                        }]}>
                        <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                    <Form.Item name="participantsAmount" label="Participants Amount" rules={[
                        {
                            required: true,
                            message: "Please, input Participants Amount!"
                        }]}>
                        <InputNumber style={{width: "100%"}} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
      }
}

export default withRouter(NewProduct);
