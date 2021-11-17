import React, {ReactElement} from 'react';
import {userService} from '../Services/UserService';
import {DetailedUserModel, RegistrationPageModel} from "@pavo/shared-services-shared/src";
import {Button, Form, FormInstance, Input, InputNumber} from "antd";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export class RegistrationForm extends React.Component<any, RegistrationPageModel> {
    formRef = React.createRef<FormInstance>();

    constructor(props: unknown) {
        super(props);

        userService.logout();

        this.state = {
            password: "",
            firstName: "",
            lastName: "",
            phone: 0,
            email: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: DetailedUserModel): void {
        this.setState({ ...e, ...{submitted: true } });

        this.setState({ loading: true });
        userService.register(this.state)
        .then(() => {
            this.props.history.push("/")
        });
    }

    render(): ReactElement {
        return (
            <Form {...layout} ref={this.formRef} name="control-ref" className="login-form" onFinish={this.handleSubmit}>
                <Form.Item name="email" label="E-mail" rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: "Please, input your E-mail!"
                    }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[
                    {
                        required: true,
                        message: "Please, input your First Name!"
                    }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[
                    {
                        required: true,
                        message: "Please, input your Last Name!"
                    }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" rules={[
                    {
                        required: true,
                        message: "Please, input your phone!"
                    }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[
                    {
                        required: true,
                        message: "Please, input your password!"
                    }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

