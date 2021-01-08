import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import {Row, Col, Input, Select, Button, Popconfirm, Table, Modal, Form, Avatar } from 'antd'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { PrinterTwoTone, DeleteTwoTone, EyeTwoTone, AntDesignOutlined } from '@ant-design/icons';
import '../css/User.css';

const { Option } = Select;

const data = [
    {
        key: '1',
        member:'Platinum',
        memberId: '4040404040',
        name: 'sompot sathongngak',
        email: 's5902041620113@email.kmutnb.ac.th',
        telephonenumber: '0989973910',
        address: '48/2 หมู่ 6 ตำบลสิ อำเภอขุนหาญ จังหวักศรีสะเกษ 33150',
        date: '40-40-4400',
    },
];

function handleChange(value) {
    console.log(`selected ${value}`);
}
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            isModalVisible: false,
        };

        this.product = [
            {
                title: 'ประเภทสมาชิก',
                dataIndex: 'member',
                key: 'member',
                width: 120,
            },
            {
                title: 'รหัสสมาชิก',
                dataIndex: 'memberId',
                key: 'memberId',
                width: 120,
            },
            {
                title: 'ชื่อสมาชิก',
                dataIndex: 'name',
                key: 'name',
                width: 120,
            },
            {
                title: 'อีเมลล์',
                dataIndex: 'email',
                key: 'email',
                ellipsis: true, 
            },
            {
                title: 'เบอร์โทร',
                dataIndex: 'telephonenumber',
                key: 'telephonenumber',
                width: 120,
            },
            {
                title: 'ที่อยู่',
                dataIndex: 'address',
                key: 'address',
                ellipsis: true, 
            },
            {
                title: 'วันที่',
                dataIndex: 'date',
                key: 'date',
                width: 120,
            },
            {
                title: '',
                dataIndex: 'edit',
                key: 'edit',
                width: 40,
                render: () =>
                    <>
                        <div type="primary" onClick={this.showModal}><EyeTwoTone style={{ fontSize: '20px' }} twoToneColor="#63549B"/></div>
                    </>,
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 60,
                render: () =>
                    <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
                        <div><DeleteTwoTone  style={{ fontSize: '20px' }} twoToneColor="#DA213D"/></div>
                    </Popconfirm>,
            },
        ]

        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
                <Row id="product">
                    <Col xs={1} md={1} xl={1} id="icon">
                        <BsFillPersonLinesFill style={{ fontSize: '400%', color: '#DA213D' }} />
                    </Col>
                    <Col xs={5} md={5} xl={5} id="page-user">
                        สมาชิก
                    </Col>
                </Row>
                <Row id="input-search1">
                    <Input.Group compact>
                        <Input.Search style={{ width: '30%' }} placeholder="ค้นหาสมาชิก (ประเภทสมาชิก รหัสสมาชิก ชื่อสมาชิก)" />
                    </Input.Group>
                </Row>
                <Row id="input-search1">
                    <Col md={2} xl={2}><div>เรียงลำดับตาม</div></Col>
                    <Col md={3} xl={3} id="col">
                        <Select defaultValue="เรียงลำดับตาม" style={{ width: 130 }} onChange={handleChange}>
                            <Option value="รหัสสมาชิก">รหัสสมาชิก</Option>
                            <Option value="ประเภทสมาชิก">ประเภทสมาชิก</Option>
                            <Option value="ชื่อสมาชิก">ชื่อสมาชิก</Option>
                        </Select>
                    </Col>
                    <Col md={5} xl={4} id="col">
                        <Button id="button-print" icon={<PrinterTwoTone twoToneColor="#DA213D"/>}>ปริ้นรายการสินค้า</Button>
                    </Col>
                </Row>
                <Row id="input-search1">
                    <Table columns={this.product} dataSource={data} />
                </Row>
                <Modal
                    // title="รายละเอียดสมาชิก" 
                    visible={this.state.isModalVisible} 
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}
                    width={600}>
                    <Form>
                        <Row id="row-header">รายละเอียดสมาชิก</Row>
                        <Col md={24} xl={24} id="image-profile">
                            <Avatar
                                size={{ md: 100, lg: 130, xl: 150, xxl: 200 }}
                                icon={<AntDesignOutlined />}
                            />
                        </Col>
                        <Col md={24} xl={24}>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">ประเภทสมาชิก</Col>
                                <Col>
                                    <Select defaultValue="ประเภทสมาชิก" style={{ width: 140 }} onChange={handleChange} id="input">
                                        <Option value="silver">Silver</Option>
                                        <Option value="gold">Gold</Option>
                                        <Option value="platinum">Platinum</Option>
                                        <Option value="user">End User</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">รหัสสมาชิก</Col>
                                <Col>มะนาว</Col>
                            </Row>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">ชื่อสมาชิก</Col>
                                <Col>มะนาว</Col>
                            </Row>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">อีเมลล์</Col>
                                <Col>มะนาว</Col>
                            </Row>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">เบอร์โทร</Col>
                                <Col>มะนาว</Col>
                            </Row>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">ที่อยู่</Col>
                                <Col>มะนาว</Col>
                            </Row>
                            <Row id="row-margin">
                                <Col md={6} xl={6}></Col>
                                <Col md={5} xl={5} id="col-header">วันที่</Col>
                                <Col>มะนาว</Col>
                            </Row>
                        </Col>
                    </Form>
                </Modal>   
            </Container>
        )
    }
}