import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {userService} from "../Services/UserService";

// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        userService.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
