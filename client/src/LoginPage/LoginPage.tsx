import React, {ReactElement} from 'react';
import {userService} from '../Services/UserService';
import {LoginPageState} from "@pavo/shared-services-shared/src";
import {withRouter} from "react-router-dom";
import {Button, Form, FormInstance, Input} from "antd";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

class LoginPage extends React.Component<any, LoginPageState> {
    formRef = React.createRef<FormInstance>();

    constructor(props: unknown) {
        super(props);
        userService.logout();
        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e: LoginPageState): void {
        // this.setState({ submitted: true });
        const { email, password } = e;
    
        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }

        // this.setState({ loading: true });
        userService.login(email, password)
            .then(
                () => {
                    this.props.history.push('/');
                },
                error => this.setState({ error, loading: false })
            );
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
    
export default withRouter(LoginPage);
