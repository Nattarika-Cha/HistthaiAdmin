import React, { Component } from 'react';
import { Col, Form, Input, Row, Button } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Login.css';

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {

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