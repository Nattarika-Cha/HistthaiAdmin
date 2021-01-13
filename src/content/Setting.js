import React, { Component } from "react";
import { Row, Col, Table, Modal, Button, Form, Input, Popconfirm, Select } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Setting.css';
import { SettingOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons'; 
import axios from 'axios';

var ip = "http://localhost:5000";

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
  }
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            member: [],
            point: [],
            catalog: [],
            isModalVisible: false,
            isModalAddPointVisible: false,
            isModalPointVisible: false,
            isModalCatalogVisible: false,
            isModalAddCatalogVisible: false,
        };

        this.member = [
            {
                title: 'ระดับตัวแทนจำหน่าย',
                dataIndex: 'memberName',
                key: 'memberName',
            },
        ]

        this.catalog = [
            {
                title: 'รหัสประเภทสินค้า',
                dataIndex: 'catCode',
                key: 'catCode',
            },
            {
                title: 'ชื่อประเภทสินค้า',
                dataIndex: 'catName',
                key: 'catName',
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 45,
                render: (record) =>
                    <>
                        <div type="primary" onClick={() => this.showModalCatalog(record)}><EditTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#63549B" /></div>
                    </>,
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 45,
                render: () =>
                    <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
                        <div><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
                    </Popconfirm>,
            },
        ]

        this.point = [
            {
                title: 'รหัสการขาย',
                dataIndex: 'orderCode',
                key: 'orderCode',
            },
            {
                title: 'คะแนน',
                dataIndex: '',
                key: 'x',
                render: (record) =>
                <>
                    {(record.pointState === "1") ? "+ " + record.point : "- " + record.point}
                </>
            },
            {
                title: 'รหัสพนักงานขาย',
                dataIndex: 'userCode',
                key: 'userCode',
            },
            {
                title: 'วันที่',
                dataIndex: 'pointDate',
                key: 'pointDate',
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 45,
                render: (record) =>
                    <>
                        <div type="primary" onClick={() => this.showModalPoint(record)}><EditTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#63549B" /></div>
                    </>,
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 45,
                render: () =>
                    <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
                        <div><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
                    </Popconfirm>,
            },
        ]
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.showModalAddCatalog = this.showModalAddCatalog.bind(this);
        this.handleAddCatalogOk = this.handleAddCatalogOk.bind(this);
        this.handleAddCatalogCancel = this.handleAddCatalogCancel.bind(this);

        this.showModalAddPoint = this.showModalAddPoint.bind(this);
        this.handleAddPointOk = this.handleAddPointOk.bind(this);
        this.handleAddPointCancel = this.handleAddPointCancel.bind(this);

        this.showModalPoint = this.showModalPoint.bind(this);
        this.handlePointOk = this.handlePointOk.bind(this);
        this.handlePointCancel = this.handlePointCancel.bind(this);

        this.showModalCatalog = this.showModalCatalog.bind(this);
        this.handleCatalogOk = this.handleCatalogOk.bind(this);
        this.handleCatalogCancel = this.handleCatalogCancel.bind(this);
    }

    async componentDidMount() {
        var url_member = ip + "/Member/find/all";
        const member = await (await axios.get(url_member)).data;
        this.setState({
            member: member,
            memberstatus: false
        });

        var url_point = ip + "/point/find/all";
        const point = await (await axios.get(url_point)).data;
        this.setState({
            point: point,
            pointstatus: false
        });

        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog
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

    showModalAddCatalog(){
        this.setState({ isModalAddCatalogVisible: true});
    }
    handleAddCatalogOk() {
        this.setState({ isModalAddCatalogVisible: false });
    };
    handleAddCatalogCancel() {
        this.setState({ isModalAddCatalogVisible: false})
    }

    showModalAddPoint() {
        this.setState({ isModalAddPointVisible: true});
    };
    handleAddPointOk() {
        this.setState({ isModalAddPointVisible: false });
    };

    handleAddPointCancel() {
        this.setState({ isModalAddPointVisible: false})
    }

    showModalPoint() {
        this.setState({ isModalPointVisible: true});
    };
    handlePointOk() {
        this.setState({ isModalPointVisible: false });
    };

    handlePointCancel() {
        this.setState({ isModalPointVisible: false})
    }


    showModalCatalog() {
        this.setState({ isModalCatalogVisible: true});
    };
    handleCatalogOk() {
        this.setState({ isModalCatalogVisible: false });
    };
    handleCatalogCancel() {
        this.setState({ isModalCatalogVisible: false})
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
                    <Col md={11} xl={11} id="col-level">
                        <Col md={24} xl={24} id="header-collevel">ประเภทสมาชิก</Col>
                            <Col md={24} xl={24}>
                                <Table
                                    columns={this.member}
                                    dataSource={this.state.member}
                                    // loading={this.state.productstatus}
                                    pagination={false}/>
                            </Col>
                        <Col id="col-editlevel" md={24} xl={24}> 
                            <Button id="edit-level" onClick={() => this.showModal()}>แก้ไข</Button>
                        </Col>
                    </Col>
                    <Col md={12} xl={12} id="col-level1">
                        <Col md={24} xl={24} id="header-collevel">ประเภทรายการสินค้า</Col>
                        <Col md={24} xl={24}>
                            <Button id ="button-addcatalog" onClick={this.showModalAddCatalog}>เพิ่มประเภทรายการสินค้า</Button>
                        </Col>
                            <Col md={24} xl={24}>
                                <Table
                                    columns={this.catalog}
                                    dataSource={this.state.catalog}
                                    pagination={{ pageSize: 4 }}
                                    // loading={this.state.catalogstatus}
                                    />
                            </Col>
                    </Col>
                </Row>
                <Row id="change-imagehome">
                    <Col md={24} xl={24}>คะแนนสมาชิก</Col>
                    <Col md={24} xl={24}>
                        <Button id ="button-addcatalog" onClick={this.showModalAddPoint}>เพิ่มคะแนนสมาชิก</Button>
                    </Col>
                    <Col md={24} xl={24}>
                        <Table
                            columns={this.point}
                            dataSource={this.state.point}
                            loading={this.state.productstatus}
                            // pagination={false}
                        >
                        </Table>
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

                <Modal
                    title="ประเภทสินค้า" 
                     visible={this.state.isModalAddCatalogVisible} 
                     onOk={this.handleAddCatalogOk} 
                     onCancel={this.handleAddCatalogCancel}
                     width={600}>
                         <Form>
                             <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>ชื่อประเภทสินค้า</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                     </Form>
                </Modal>

                <Modal
                     title="Hits Piont" 
                     visible={this.state.isModalAddPointVisible} 
                     onOk={this.handleAddPointOk} 
                     onCancel={this.handleAddPointCancel}
                     width={600}>
                         <Form>
                             <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสการขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>สถานะ</Col>
                                    <Col md={6} xl={6}>
                                    <Select defaultValue="สถานะ" style={{ width: 195 }} onChange={handleChange} id="input-point">
                                        <Option value="0">0 : ลบคะแนน</Option>
                                        <Option value="1">1 : เพิ่มคะแนน</Option>
                                    </Select>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>คะแนน</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสพนักงานขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>                               
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>วันที่</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                     </Form>
                </Modal>

                <Modal
                     title="Hits Piont" 
                     visible={this.state.isModalPointVisible} 
                     onOk={this.handlePointOk} 
                     onCancel={this.handlePointCancel}
                     width={600}>
                         <Form>
                             <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสการขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>สถานะ</Col>
                                    <Col md={6} xl={6}>
                                    <Select defaultValue="สถานะ" style={{ width: 195 }} onChange={handleChange} id="input-point">
                                        <Option value="0">0 : ลบคะแนน</Option>
                                        <Option value="1">1 : เพิ่มคะแนน</Option>
                                    </Select>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>คะแนน</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสพนักงานขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>                               
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>วันที่</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                     </Form>
                </Modal>

                <Modal
                    title="ประเภทสินค้า" 
                     visible={this.state.isModalCatalogVisible} 
                     onOk={this.handleCatalogOk} 
                     onCancel={this.handleCatalogCancel}
                     width={600}>
                         <Form>
                             <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>ชื่อประเภทสินค้า</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="level"/></Col>
                                </Row>
                            </Col>
                     </Form>
                </Modal>
                     
            </Container>
        )
    }
}