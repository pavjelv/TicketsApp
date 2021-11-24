import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {userService} from '../Services/UserService';
import {Menu, Layout, Button} from "antd";
const { Header} = Layout;

function NavBar(): ReactElement {
    return (
        <Header className="main-header">
            <Menu
                style={{minWidth: "20vw"}}
                theme="dark"
                mode="horizontal">
                <Menu.Item
                    key="1">
                    <Link to={`/`}>
                        All Orders
                    </Link>
                </Menu.Item>
                { (userService.hasRole("Admin") || userService.hasRole("User")) &&
                <Menu.Item
                    key="2">
                    <Link to={`/products`}>
                        All Products
                    </Link>
                </Menu.Item>
                }
            </Menu>
            <div className="header-button-panel">
                { !userService.isAuthenticated() &&
                    <Button type="primary" style={{ marginRight: "10px" }}>
                        <Link to={`/login`}>
                            <span>Sign In</span>
                        </Link>
                    </Button>
                }
                { !userService.isAuthenticated() &&
                    <Button type="primary">
                        <Link to={`/register`}>
                            <span>Sign Up</span>
                        </Link>
                    </Button>
                }
                { userService.isAuthenticated() &&
                    <div>
                        <Link to={`/user/${userService.getCredentials().id}`}>
                            <span>{userService.getCredentials().firstName}</span>
                        </Link>
                        <Button
                            style={{ marginLeft: "10px" }}
                            type="primary"
                            onClick={() => {userService.logout(); }}
                        >
                            <Link to={`/login`}>
                                <span>Sign Out</span>
                            </Link>
                        </Button>
                    </div>
                }
            </div>
        </Header>
    );
}

export default NavBar;
