import React from 'react';
import { Link } from 'react-router-dom';
import {userService} from '../Services/UserService'
class LoginPage extends React.Component {
        constructor(props) {
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
    
        handleChange(e) {
            const { name, value } = e.target;
            this.setState({ [name]: value });
        }
    
        handleSubmit(e) {
            e.preventDefault();
    
            this.setState({ submitted: true });
            const { email, password, returnUrl } = this.state;
    
            // stop here if form is invalid
            if (!(email && password)) {
                return;
            }
    
            this.setState({ loading: true });
            userService.login(email, password)
                .then(
                    user => {
                        // if (user.message) {
                        //     this.setState({ error : user.message, loading: false })
                        // }
                        // else {
                        
                        const { from } = this.props.location.state || { from: { pathname: "/" } };
                        this.props.history.push(from);
                        
                    },
                    error => this.setState({ error, loading: false })
                );
        }
    
        render() {
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
    
export { LoginPage }; 