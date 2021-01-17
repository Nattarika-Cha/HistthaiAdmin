import React, { Component } from "react";
import { Row, Col, Table, Modal, Button, Form, Input, Popconfirm, Select, Spin, DatePicker, Space } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Setting.css';
import { SettingOutlined, EditTwoTone, DeleteTwoTone, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import swal from 'sweetalert';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

var ip = "http://localhost:5000";

const { Option } = Select;

// const config = {
//     rules: [
//       {
//         type: 'object',
//         required: true,
//         message: 'Please select time!',
//       },
//     ],
//   };

// function handleChange(value) {
//     console.log(`selected ${value}`);
// }
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            member: [],
            pointData: [],
            catalog: [],
            isModalVisible: false,
            isModalAddPointVisible: false,
            isModalPointVisible: false,
            isModalCatalogVisible: false,
            isModalAddCatalogVisible: false,

            statusButtonEdit: false,
            catName: '',
            catalogStatus: false,

            catNameEdit: '',
            catId: '',

            orderCode: '',
            pointState: '',
            point: '',
            userCode: '',
            pointDate: '',
            pointstatus: false,

            pointId: '',
            orderCodeEdit: '',
            pointStateEdit: '',
            pointEdit: '',
            userCodeEdit: '',
            pointDateEdit: '',
            pointstatusEdit: false,

            member1: '',
            member2: '',
            member3: '',
            EndUser: '',

            memberStatus: false,
            searchText: '',
            searchedColumn: '',
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
                ...this.getColumnSearchProps('catCode'),
            },
            {
                title: 'ชื่อประเภทสินค้า',
                dataIndex: 'catName',
                key: 'catName',
                ...this.getColumnSearchProps('catName'),
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
                render: (record) =>
                    <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteCatalog(record.catId)}>
                        <div><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
                    </Popconfirm>,
            },
        ]

        this.point = [
            {
                title: 'รหัสการขาย',
                dataIndex: 'orderCode',
                key: 'orderCode',
                ...this.getColumnSearchProps('orderCode'),
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
                ...this.getColumnSearchProps('userCode'),
            },
            {
                title: 'วันที่',
                dataIndex: 'pointDate',
                key: 'pointDate',
                render: render =>
                    <>
                        <div>{moment(render).format('L')}</div>
                    </>,

                ...this.getColumnSearchProps('pointDate'),
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
                render: (record) =>
                    <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeletePoint(record.pointId)}>
                        <div><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
                    </Popconfirm>,
            },
        ]
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.showModalAddCatalog = this.showModalAddCatalog.bind(this);
        this.handleSaveCatalog = this.handleSaveCatalog.bind(this);
        this.handleAddCatalogCancel = this.handleAddCatalogCancel.bind(this);
        this.onChangeFildCatalog = this.onChangeFildCatalog.bind(this);
        this.handleDeleteCatalog = this.handleDeleteCatalog.bind(this);

        this.showModalAddPoint = this.showModalAddPoint.bind(this);
        this.handleSavePoint = this.handleSavePoint.bind(this);
        this.handleAddPointCancel = this.handleAddPointCancel.bind(this);
        this.onChangeFildPoint = this.onChangeFildPoint.bind(this);
        this.onChangepointState = this.onChangepointState.bind(this);
        this.handleDeletePoint = this.handleDeletePoint.bind(this);

        this.showModalPoint = this.showModalPoint.bind(this);
        this.handlePointOk = this.handlePointOk.bind(this);
        this.handlePointCancel = this.handlePointCancel.bind(this);
        this.onChangeDatePointEdit = this.onChangeDatePointEdit.bind(this);

        this.showModalCatalog = this.showModalCatalog.bind(this);
        this.handleCatalogOk = this.handleCatalogOk.bind(this);
        this.handleCatalogCancel = this.handleCatalogCancel.bind(this);

        this.onChangeDatePoint = this.onChangeDatePoint.bind(this);
    }

    async componentDidMount() {
        var url_member = ip + "/Member/find/all";
        const member = await (await axios.get(url_member)).data;
        this.setState({
            member: member,
            member1: member.filter((item) => item.memberCode === "member1")[0]?.memberName,
            member2: member.filter((item) => item.memberCode === "member2")[0]?.memberName,
            member3: member.filter((item) => item.memberCode === "member3")[0]?.memberName,
            EndUser: member.filter((item) => item.memberCode === "EndUser")[0]?.memberName,
            memberStatus: false
        });

        console.log(member.filter((item) => item.memberCode === "member1")[0]?.memberName, " testststs");

        var url_pointData = ip + "/point/find/all";
        const pointData = await (await axios.get(url_pointData)).data;
        this.setState({
            pointData: pointData,
            pointstatus: false
        });

        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog
        });
    }


    showModal() {
        this.setState({ isModalVisible: true });
    };
    async handleOk() {
        this.setState({ statusButtonEdit: true });
        const data = {
            member1: this.state.member1,
            member2: this.state.member2,
            member3: this.state.member3,
            EndUser: this.state.EndUser
        };

        var url_update_member = ip + "/Member/update/";
        const updatemember = await (await axios.put(url_update_member, data)).data;
        console.log(updatemember, " updatecatalog")
        if (updatemember) {
            this.setState({ statusButtonEdit: false, memberStatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    isModalVisible: false
                });
            });

            var url_member = ip + "/Member/find/all";
            const member = await (await axios.get(url_member)).data;
            this.setState({
                member: member,
                member1: member.filter((item) => item.memberCode === "member1")[0]?.memberName,
                member2: member.filter((item) => item.memberCode === "member2")[0]?.memberName,
                member3: member.filter((item) => item.memberCode === "member3")[0]?.memberName,
                EndUser: member.filter((item) => item.memberCode === "EndUser")[0]?.memberName,
                memberStatus: false
            });
        } else {

        }
    };
    handleCancel() {
        this.setState({ isModalVisible: false })
    }

    showModalAddCatalog() {
        this.setState({ isModalAddCatalogVisible: true });
    }
    handleAddCatalogCancel() {
        this.setState({ isModalAddCatalogVisible: false })
    }

    showModalAddPoint() {
        this.setState({ isModalAddPointVisible: true });
    };
    handleAddPointCancel() {
        this.setState({ isModalAddPointVisible: false })
    }
    onChangepointState(value) {
        this.setState({
            pointState: value.value
        });
    }

    onChangeDatePointEdit(date, dateString, id) {
        this.setState({
            pointDateEdit: date?._d
        });
    }
    onChangepointStateEdit(value) {
        this.setState({
            pointStateEdit: value
        })
    }
    showModalPoint(record) {
        this.setState({
            isModalPointVisible: true,
            orderCodeEdit: record.orderCode,
            pointStateEdit: record.pointState,
            pointEdit: record.point,
            userCodeEdit: record.userCode,
            pointId: record.pointId,
            pointDateEdit: record.pointDate,
        });
    };
    async handlePointOk(values) {
        this.setState({ statusButtonEdit: true });
        const data = {
            orderCode: this.state.orderCodeEdit,
            pointState: this.state.pointStateEdit,
            point: this.state.pointEdit,
            userCode: this.state.userCodeEdit,
            pointDate: this.state.pointDateEdit,
        };

        var url_update_point = ip + "/Point/update/" + this.state.pointId;
        const updatepoint = await (await axios.put(url_update_point, data)).data;
        console.log(updatepoint, " updatepoint")
        if (updatepoint[0] > 0) {
            this.setState({ statusButtonEdit: false, pointStatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    orderCodeEdit: '',
                    pointStateEdit: '',
                    pointEdit: '',
                    userCodeEdit: '',
                    pointStatusEdit: '',
                    pointDateEdit: '',
                    isModalPointVisible: false
                });
            });
            var url_point = ip + "/Point/find/all";
            const point = await (await axios.get(url_point)).data;
            this.setState({
                pointData: point,
                pointStatus: false
            });
        } else {

        }
    };
    handlePointCancel() {
        this.setState({ isModalPointVisible: false })
    }


    showModalCatalog(record) {
        this.setState({
            isModalCatalogVisible: true,
            catNameEdit: record.catName,
            catId: record.catId
        });
    };
    async handleCatalogOk(values) {
        this.setState({ statusButtonEdit: true });
        const data = {
            catName: this.state.catNameEdit,
        };

        var url_update_catalog = ip + "/Catalog/update/" + this.state.catId;
        const updatecatalog = await (await axios.put(url_update_catalog, data)).data;
        console.log(updatecatalog, " updatecatalog")
        if (updatecatalog[0] > 0) {
            this.setState({ statusButtonEdit: false, catalogStatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    catNameEdit: '',
                    isModalCatalogVisible: false
                });
            });
            var url_catalog = ip + "/Catalog/find/all";
            const catalog = await (await axios.get(url_catalog)).data;
            this.setState({
                catalog: catalog,
                catalogStatus: false
            });
        } else {

        }
    };
    handleCatalogCancel() {
        this.setState({ isModalCatalogVisible: false })
    }


    onChangeFildCatalog(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async handleSaveCatalog() {
        this.setState({ statusButtonEdit: true });
        var dataSave = {
            catName: this.state.catName,
            catStatus: "A",
        }

        var url_create_catalog = ip + "/Catalog/create";
        const createcatalog = await (await axios.post(url_create_catalog, dataSave)).data
        // console.log(createcatalog, "mcdks")
        if (createcatalog !== null) {
            this.setState({ statusButtonEdit: false, catalogStatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    catName: '',
                    isModalAddCatalogVisible: false
                });
            });
            var url_catalog = ip + "/Catalog/find/all";
            const catalog = await (await axios.get(url_catalog)).data;
            this.setState({
                catalog: catalog,
                catalogStatus: false
            });
        } else {
            this.setState({ statusButtonEdit: false });
            swal("Warning!", "บันทึกข้อมูลไม่สำเร็จ", "warning").then((value) => {
            });
        }
    };
    async handleDeleteCatalog(catId) {
        const data = {
            catStatus: "N"
        };

        var url_delete_catalog = ip + "/Catalog/update/delete/" + catId;
        const deletecatalog = await (await axios.put(url_delete_catalog, data)).data;
        if (deletecatalog[0] > 0) {
            // const productnew = [...this.state.productnew];
            // this.setState({
            //   productnew: productnew.filter((item) => item.productId !== productId),
            //   searchnewstatus: false
            // });
            var url_catalog = ip + "/Catalog/find/all";
            const catalog = await (await axios.get(url_catalog)).data;
            this.setState({
                catalog: catalog,
                catalogStatus: false
            });
        } else {

        }
    }

    onChangeFildPoint(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDatePoint(date, dateString, id) {
        this.setState({
            pointDate: date?._d
        });
        // console.log(date, " date");
        // console.log(dateString, " dateString");
        // console.log(this.state.pointData, " id");
    }

    async handleSavePoint() {
        this.setState({ statusButtonEdit: true });
        var dataSave = {
            orderCode: this.state.orderCode,
            pointState: this.state.pointState,
            point: this.state.point,
            userCode: this.state.userCode,
            pointDate: this.state.pointDate,
            pointStatus: "A",
        }

        console.log(dataSave, " dataSave");

        var url_create_pointData = ip + "/Point/create";
        const createpointData = await (await axios.post(url_create_pointData, dataSave)).data
        // console.log(createcatalog, "mcdks")
        if (createpointData !== null) {
            this.setState({ statusButtonEdit: false, pointstatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    orderCode: '',
                    pointState: '',
                    point: '',
                    userCode: '',
                    pointDate: '',
                    isModalAddPointVisible: false
                });
            });
            var url_pointData = ip + "/point/find/all";
            const pointData = await (await axios.get(url_pointData)).data;
            this.setState({
                pointData: pointData,
                pointstatus: false
            });
        } else {
            this.setState({ statusButtonEdit: false });
            swal("Warning!", "บันทึกข้อมูลไม่สำเร็จ", "warning").then((value) => {
            });
        }
    };
    async handleDeletePoint(pointId) {
        const data = {
            pointStatus: "N"
        };

        var url_delete_point = ip + "/Point/update/delete/" + pointId;
        const deletepoint = await (await axios.put(url_delete_point, data)).data;
        if (deletepoint[0] > 0) {
            var url_point = ip + "/Point/find/all";
            const point = await (await axios.get(url_point)).data;
            this.setState({
                pointData: point,
                pointStatus: false
            });
        } else {

        }
    }


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        // icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };


    render() {
        return (
            <Container fluid>
                <Spin spinning={this.state.statusButtonEdit} size="large">
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
                                    loading={this.state.memberStatus}
                                    pagination={false} />
                            </Col>
                            <Col id="col-editlevel" md={24} xl={24}>
                                <Button id="edit-level" onClick={() => this.showModal()}>แก้ไข</Button>
                            </Col>
                        </Col>
                        <Col md={12} xl={12} id="col-level1">
                            <Col md={24} xl={24} id="header-collevel">ประเภทรายการสินค้า</Col>
                            <Col md={24} xl={24}>
                                <Button id="button-addcatalog" onClick={this.showModalAddCatalog}>เพิ่มประเภทรายการสินค้า</Button>
                            </Col>
                            <Col md={24} xl={24}>
                                <Table
                                    columns={this.catalog}
                                    dataSource={this.state.catalog}
                                    pagination={{ pageSize: 4 }}
                                    loading={this.state.catalogStatus}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row id="change-imagehome">
                        <Col md={24} xl={24}>คะแนนสมาชิก</Col>
                        <Col md={24} xl={24}>
                            <Button id="button-addcatalog" onClick={this.showModalAddPoint}>เพิ่มคะแนนสมาชิก</Button>
                        </Col>
                        <Col md={24} xl={24}>
                            <Table
                                columns={this.point}
                                dataSource={this.state.pointData}
                                loading={this.state.pointstatus}
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
                                    <Col md={4} xl={4}>Member1</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="member1" value={this.state.member1} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Member2</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="member2" value={this.state.member2} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>Member3</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="member3" value={this.state.member3} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={4} xl={4}>EndUser</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="EndUser" value={this.state.EndUser} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                        </Form>
                    </Modal>

                    <Modal
                        title="ประเภทสินค้า"
                        visible={this.state.isModalAddCatalogVisible}
                        onOk={this.handleSaveCatalog}
                        onCancel={this.handleAddCatalogCancel}
                        width={600}>
                        <Form>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>ชื่อประเภทสินค้า</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="catName" value={this.state.catName} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                        </Form>
                    </Modal>

                    <Modal
                        title="Hits Point"
                        visible={this.state.isModalAddPointVisible}
                        onOk={this.handleSavePoint}
                        onCancel={this.handleAddPointCancel}
                        width={600}>
                        <Form>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสการขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="orderCode" value={this.state.orderCode} onChange={this.onChangeFildPoint} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>สถานะ</Col>
                                    <Col md={6} xl={6}>
                                        <Select defaultValue="สถานะ" style={{ width: 195 }} labelInValue value={{ value: this.state.pointState }} name="pointState" onChange={this.onChangepointState} id="input-point">
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
                                    <Col md={6} xl={6}><Input id="input-level" name="point" value={this.state.point} onChange={this.onChangeFildPoint} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสพนักงานขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="userCode" value={this.state.userCode} onChange={this.onChangeFildPoint} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>วันที่</Col>
                                    <Col md={6} xl={6}>
                                        <Form.Item name="date-picker" value={this.state.pointDate} >
                                            <DatePicker name="pointDate" onChange={this.onChangeDatePoint} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Form>
                    </Modal>

                    <Modal
                        title="แก้ไข Hits Piont"
                        visible={this.state.isModalPointVisible}
                        onOk={this.handlePointOk}
                        onCancel={this.handlePointCancel}
                        width={600}>
                        <Form>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสการขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="orderCodeEdit" value={this.state.orderCodeEdit} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>สถานะ</Col>
                                    <Col md={6} xl={6}>
                                        <Select defaultValue="สถานะ" style={{ width: 195 }} id="input-point" name="pointStateEdit" value={this.state.pointStateEdit} onChange={this.onChangepointStateEdit}>
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
                                    <Col md={6} xl={6}><Input id="input-level" name="pointEdit" value={this.state.pointEdit} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>รหัสพนักงานขาย</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="userCodeEdit" value={this.state.userCodeEdit} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>วันที่</Col>
                                    <Col md={6} xl={6}>
                                        <Form.Item name="date-time-picker" value={this.state.pointDateEdit} >
                                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" name="pointDateEdit" onChange={this.onChangeDatePointEdit} />
                                        </ Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Form>
                    </Modal>

                    <Modal
                        title="แก้ไขประเภทสินค้า"
                        visible={this.state.isModalCatalogVisible}
                        onOk={this.handleCatalogOk}
                        onCancel={this.handleCatalogCancel}
                        width={600}>
                        <Form>
                            <Col md={24} xl={24} id="col-marginlevel">
                                <Row>
                                    <Col md={6} xl={6}></Col>
                                    <Col md={6} xl={6}>ชื่อประเภทสินค้า</Col>
                                    <Col md={6} xl={6}><Input id="input-level" name="catNameEdit" value={this.state.catNameEdit} onChange={this.onChangeFildCatalog} /></Col>
                                </Row>
                            </Col>
                        </Form>
                    </Modal>
                </Spin>
            </Container>
        )
    }
}