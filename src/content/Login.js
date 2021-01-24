import React, { Component } from 'react';
import { Col, Form, Input, Row, Button } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Login.css';
import axios from 'axios';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var ip = "http://128.199.198.10/API";

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [ip];
        const token = localStorage.getItem('token');
        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        token: "",
        user: [],
        statusSend: false
      }

      this.onLogin = this.onLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            token: cookies.get('token', { path: '/' }),
            user: cookies.get('user', { path: '/' })
        });
    }

    async onLogin(values) {
        this.setState({
            statusSend: true
        });
        const data = {
            userName: values.username,
            passWord: values.password
        };

        var config = {
            method: 'post',
            url: ip + '/UserProfile/login/admin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        const login = await axios(config);
        const data_login = login.data;
        if (data_login.statusCode === 200) {
            const user_data = {
                id: data_login.id,
                username: data_login.user,
                name: data_login.name,
                img: data_login.img,
                levelId: data_login.levelId
            }
            // console.log(data_login, " user_data");
            cookies.set('user', JSON.stringify(user_data), { path: '/' });
            cookies.set('token', data_login.token, { path: '/' });
            this.setState({
                storedJwt: data_login.token
            });
               window.location.replace('/Admin/Home', false);    
        } else {
            swal("Error!", "Username หรือ Password ผิดพลาด", "error").then((value) => {
                this.setState({
                    statusSend: false
                });
            });

        }
    }

    render() {
        return (
            <Container>
                <Row id="Header">เข้าสู่ระบบ</Row>
                <Form onFinish={this.onLogin}>
                    <Row id="Login">
                        <Col md={2} xl={6}></Col>
                        <Col md={20} xl={12}>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Username
                                </Col>
                                <Col xs={22} md={14} xl={14} >
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}>
                                        <Input id="Input" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24} md={8} xl={6} id="List">
                                    Password
                                </Col>
                                <Col xs={22} md={14} xl={14}>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณากรอกรหัสผ่าน!',
                                            },
                                        ]}
                                        hasFeedback >
                                        <Input.Password id="Password" />
                                    </Form.Item>
                                </Col>
                                <Col xs={2} md={2} xl={4} id="request-mask">
                                    *
                                </Col>
                            </Row>
                            <Row id="Row">
                                <Button type="primary" htmlType="submit" id="Button-submit">เข้าสู่ระบบ</Button>
                            </Row>
                        </Col>
                        <Col md={2} xl={6}></Col>
                    </Row>
                </Form>
            </Container>
        )
    }
}