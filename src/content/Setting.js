import React, { Component } from "react";
import { Row, Col, Table, Modal, Button, Form, Input } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Setting.css';
import { SettingOutlined } from '@ant-design/icons'; 
import axios from 'axios';

var ip = "http://localhost:5000";
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            member: [],
            levelEdit: [],
            memberstatus: false,
            isModalVisible: false,
        };

        this.member = [
            {
                title: 'ระดับตัวแทนจำหน่าย',
                dataIndex: 'memberName',
                key: 'memberName',
            },
        ]
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async componentDidMount() {
        var url_member = ip + "/Member/find/all";
        const member = await (await axios.get(url_member)).data;
        this.setState({
            member: member,
            memberstatus: false
        });
      }

    showModal() {
        this.setState({ isModalVisible: true});
    };

    handleOk() {
        this.setState({ isModalVisible: false });
    };

    handleCancel() {
        this.setState({ isModalVisible: false})
    }

    render() {
        return (
            <Container fluid>
                <Row id="setting">
                    <Col md={1} xl={1} id="icon-setting">
                        <SettingOutlined style={{ fontSize: '300%', color: '#DA213D' }} />
                    </Col>
                    <Col md={5} xl={5} id="page-setting">
                        ตั้งค่า
                    </Col>
                </Row>
                <Row id="row-level">
                    <Col md={12} xl={12} id="col-level">
                        <Col md={24} xl={24} id="header-collevel">ประเภทสมาชิก</Col>
                            <Col md={24} xl={24}>
                                <Table
                                    columns={this.member}
                                    dataSource={this.state.member}
                                    loading={this.state.productstatus}
                                    pagination={false}/>
                            </Col>
                        <Col id="col-editlevel" md={24} xl={24}> 
                            <Button id="edit-level" onClick={() => this.showModal()}>แก้ไข</Button>
                        </Col>
                    </Col>
                </Row>
                <Row id="change-imagehome">
                    <Col md={24} xl={24}>ตั้งค่ารูปภาพหน้า Home</Col>
                    <Col></Col>
                </Row>
                <Row id="change-imagehome">
                    <Col md={24} xl={24}>ตั้งค่ารูปภาพหน้า Product</Col>
                    <Col></Col>
                </Row>
                <Modal
                    title="ประเภทสมาชิก" 
                     visible={this.state.isModalVisible} 
                     onOk={this.handleOk} 
                     onCancel={this.handleCancel}
                     width={600}>
                         <Form>
                             <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Adviser</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Dealer</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Buyer</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>                               
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Price Tag</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Admin</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                     </Form>
                     </Modal>
                     
            </Container>
        )
    }
}