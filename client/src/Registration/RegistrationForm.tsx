import React, {ChangeEvent, ReactElement} from 'react';
import {userService} from '../Services/UserService';
import {RegistrationPageModel} from "@pavo/shared-services-shared/src";

export class RegistrationForm extends React.Component<unknown, RegistrationPageModel> {
    constructor(props: unknown) {
        super(props);

        userService.logout();

        this.state = {
            password: "",
            firstName: "",
            lastName: "",
            middleName: "",
            phone: 0,
            email: '',
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
            case "firstName":
                this.setState({firstName: e.target.value});
                break;
            case "lastName":
                this.setState({lastName: e.target.value});
                break;
            case "middleName":
                this.setState({middleName: e.target.value});
                break;
            case "phone":
                this.setState({phone: e.target.value as unknown as number});
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

        this.setState({ loading: true });
        userService.register(this.state);
        // .then(
        //     error => this.setState({ error, loading: false })
        // );
    }

    render(): ReactElement {
        const { email, firstName, lastName, middleName, phone, submitted, loading, error, password } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-danger' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                        <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !firstName ? ' has-danger' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                        {submitted && !firstName &&
                        <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !middleName ? ' has-danger' : '')}>
                        <label htmlFor="middleName">Middle Name</label>
                        <input type="text" className="form-control" name="middleName" value={middleName} onChange={this.handleChange} />
                        {submitted && !middleName &&
                        <div className="help-block">Middle Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !lastName ? ' has-danger' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                        {submitted && !lastName &&
                        <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !phone ? ' has-danger' : '')}>
                        <label htmlFor="phone">Phone</label>
                        <input type="number" className="form-control" name="phone" value={phone} onChange={this.handleChange} />
                        {submitted && !phone &&
                        <div className="help-block">Phone is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-danger' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Register</button>
                        {loading &&
                        <p> Loading...</p>
                        }
                    </div>
                    {error &&
                    <div className={'alert alert-danger'}>Parameters are incorrect</div>
                    }
                </form>
            </div>
        );
    }
}

