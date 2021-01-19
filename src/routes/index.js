import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from "../content/Home";
import Product from "../content/Product";
import User from "../content/User";
import Setting from "../content/Setting";
import Login from "../content/Login";
import Logout from "../content/Logout";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            statusUser: false
        };
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            statusUser: true
        });
    }

    componentDidMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' }),
            statusUser: true
        });
    }

    render() {
        return (
            <Switch>
                {
                    (this.state.statusUser) ?
                        (this.state.token !== undefined) ?
                            <>
                                <Route exact path="/Home" component={Home} />
                                <Route exact path="/Product" component={Product} />
                                <Route exact path="/User" component={User} />
                                <Route exact path="/Setting" component={Setting} />
                                <Route exact path="/Logout" component={Logout} />
                            </>
                            :
                            <Route exact path="/Login" component={Login} />
                        :
                        <></>
                }

            </Switch>
        );
    }
}