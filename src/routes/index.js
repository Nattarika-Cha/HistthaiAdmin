import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from "../content/Home";
import Product from "../content/Product";
import User from "../content/User";
import Setting from "../content/Setting";
import Login from "../content/Login";
export default class Index extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/Home" component={Home} />
                <Route exact path="/Product" component={Product} />
                <Route exact path="/User" component={User} />
                <Route exact path="/Setting" component={Setting} />
                <Route exact path="/Login" component={Login} />
            </Switch>
        );
    }
}