import React, {ChangeEvent, ReactElement} from 'react';
import {userService} from '../Services/UserService';
import {LoginPageState} from "@pavo/shared-services-shared/src";
import {withRouter} from "react-router-dom";

class LoginPage extends React.Component<any, LoginPageState> {
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
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleChange(e: ChangeEvent<HTMLInputElement>) : void {
            switch (e.target.name) {
                case "email":
                    this.setState({email: e.target.value});
                    break;
                case "password":
                    this.setState({password: e.target.value});
                    break;
                default:
                    break;
            }
        }
    
        handleSubmit(e: ChangeEvent<HTMLFormElement>): void {
            e.preventDefault();
    
            this.setState({ submitted: true });
            const { email, password } = this.state;
    
            // stop here if form is invalid
            if (!(email && password)) {
                return;
            }
    
            this.setState({ loading: true });
            userService.login(email, password)
                .then(
                    () => {
                        this.props.history.push('/');
                    },
                    error => this.setState({ error, loading: false })
                );
        }
    
        render(): ReactElement {
            const { email, password, submitted, loading, error } = this.state;
            return (
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !email ? ' has-danger' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-danger' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Login</button>
                            {loading &&
                                <p> Loading...</p>
                            }
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>Username or password is incorrect</div>
                        }
                    </form>
                </div>
            );
        }
    }
    
export default withRouter(LoginPage);
