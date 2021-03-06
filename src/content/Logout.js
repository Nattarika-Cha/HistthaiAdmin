import React, { Component } from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: []
        };
    }

    componentWillMount() {
        this.setState({
            token: cookies.remove('token_key', { path: '/Admin/' }),
            user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login/', false); 
      }

    render() {
        return (
            <div className="content">
            </div>
        );
    }
}