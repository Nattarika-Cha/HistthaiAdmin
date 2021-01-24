import React, { Component } from "react";
import { Container, Image } from 'react-bootstrap';
import { Row, Col, Input, Select, Popconfirm, Table, Modal, Form, Avatar, Button, Space, Spin } from 'antd'
import { BsFillPersonLinesFill } from "react-icons/bs";
import { DeleteTwoTone, EditTwoTone, AntDesignOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import '../css/User.css';

const { Option } = Select;

var ip = "https://www.hitsthai.com/API";
var ip_img_profile = "https://www.hitsthai.com/API/profile/";
// const data = [
//     {
//         key: '1',
//         member:'Platinum',
//         memberId: '4040404040',
//         name: 'sompot sathongngak',
//         email: 's5902041620113@email.kmutnb.ac.th',
//         telephonenumber: '0989973910',
//         address: '48/2 หมู่ 6 ตำบลสิ อำเภอขุนหาญ จังหวักศรีสะเกษ 33150',
//         date: '40-40-4400',
//     },
// ];

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            isModalVisible: false,
            userstatus: false,

            searchText: '',
            searchedColumn: '',
            member: [],
            level: [],
            // userCode: [],

            userProfileId: 0,
            memberId: 0,
            levelId: 0,
            userCode: '',
            name: '',
            line: '',
            email: '',
            phone: '',
            address: '',
            createDate: '',
            img: '',

            statusButtonEdit: false,
            usertable: [
                {
                    title: 'ประเภทสมาชิก',
                    dataIndex: 'memberName',
                    key: 'memberName',
                    width: 120,
                    filters: [],
                    onFilter: (value, record) => record.memberName.indexOf(value) === 0,
                },
                {
                    title: 'รหัสสมาชิก',
                    dataIndex: 'userCode',
                    key: 'userCode',
                    width: 120,
                    ...this.getColumnSearchProps('userCode'),
                },
                {
                    title: 'ชื่อสมาชิก',
                    dataIndex: 'name',
                    key: 'name',
                    width: 120,
                    ...this.getColumnSearchProps('name'),
                },
                {
                    title: 'อีเมลล์',
                    dataIndex: 'email',
                    key: 'email',
                    width: 150,
                },
                {
                    title: 'เบอร์โทร',
                    dataIndex: 'phone',
                    key: 'phone',
                    width: 120,
                    ...this.getColumnSearchProps('phone'),
                },
                {
                    title: 'ที่อยู่',
                    dataIndex: 'address',
                    key: 'address',
                    ellipsis: true,
                    width: 200,
                },
                {
                    title: 'วันที่',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    ellipsis: true,
                    width: 120,
                    render: render =>
                    <>
                        <div>{moment(render).format('L')}</div>
                    </>
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'x',
                    width: 60,
                    render: (record) =>
                        <>
                            <div type="primary" onClick={() => this.showModal(record)}><EditTwoTone style={{ fontSize: '20px' }} twoToneColor="#63549B" /></div>
                        </>,
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'x',
                    width: 50,
                    render: (record) =>
                        <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteUser(record.userProfileId)}>
                            <div><DeleteTwoTone style={{ fontSize: '20px' }} twoToneColor="#DA213D" /></div>
                        </Popconfirm>,
                },
            ]
        };

        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeMemberIdEdit = this.handleChangeMemberIdEdit.bind(this);
        this.handleChangeLevelIdEdit = this.handleChangeLevelIdEdit.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.onChangeFilduserCode = this.onChangeFilduserCode.bind(this);
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
                        // icon={<SearchOutlined style={{ color: '#FFFFFF' }}/>}
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


    async showModal(record) {
        var url_level = ip + "/Level/find/memberId/" + record.memberId;
        const level = await (await axios.get(url_level)).data;
        this.setState({
            isModalVisible: true,
            userProfileId: record.userProfileId,
            memberId: record.memberId,
            levelId: record.levelId,
            userCode: record.userCode,
            name: record.name,
            line: record.line,
            email: record.email,
            phone: record.phone,
            address: record.address,
            createDate: record.createDate,
            img: ip_img_profile + record.img,
            level: level
        });
    };

    onChangeFilduserCode(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleOk() {
        this.setState({ statusButtonEdit: true });
        const data = {
            memberId: this.state.memberId,
            levelId: this.state.levelId,
            userCode: this.state.userCode,
        };

        var url_update_member_level = ip + "/UserProfile/updatememberlevel/" + this.state.userProfileId;
        const updatememberlevel = await (await axios.put(url_update_member_level, data)).data;

        if (updatememberlevel[0] > 0) {
            this.setState({ statusButtonEdit: false, userstatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    isModalVisible: false
                });
            });

            var url_user = ip + "/UserProfile/find/all/admin";
            const user = await (await axios.get(url_user)).data;
            this.setState({
                user: user,
                userstatus: false
            });
        } else {

        }
    };

    handleCancel() {
        this.setState({
            isModalVisible: false,
            userProfileId: 0,
            memberId: 0,
            levelId: 0,
            userCode: '',
            name: '',
            line: '',
            email: '',
            phone: '',
            address: '',
            createDate: '',
            level: [],
            img: ''
        })
    }

    async handleChangeMemberIdEdit(value) {
        var url_level = ip + "/Level/find/memberId/" + value.value;
        const level = await (await axios.get(url_level)).data;
        this.setState({
            memberId: value.value,
            level: level
        });
    }

    handleChangeLevelIdEdit(value) {
        this.setState({
            levelId: value.value
        });
    }

    async componentDidMount() {
        var url_user = ip + "/UserProfile/find/all/admin";
        const user = await (await axios.get(url_user)).data;
        this.setState({
            user: user,
            userstatus: false
        });

        var url_member = ip + "/Member/find/all";
        const member = await (await axios.get(url_member)).data;
        this.setState({
            member: member
        });

        var memberFilter = [];
        await member.forEach(async (member, index) => {
            var filter = { text: member.memberName, value: member.memberName }
            memberFilter.push(filter);
        });


        this.setState({
            usertable: [
                {
                    title: 'ประเภทสมาชิก',
                    dataIndex: 'memberName',
                    key: 'memberName',
                    width: 120,
                    filters: memberFilter,
                    onFilter: (value, record) => record.memberName.indexOf(value) === 0,
                },
                {
                    title: 'รหัสสมาชิก',
                    dataIndex: 'userCode',
                    key: 'userCode',
                    width: 120,
                    ...this.getColumnSearchProps('userCode'),
                },
                {
                    title: 'ชื่อสมาชิก',
                    dataIndex: 'name',
                    key: 'name',
                    width: 120,
                    ...this.getColumnSearchProps('name'),
                },
                {
                    title: 'อีเมลล์',
                    dataIndex: 'email',
                    key: 'email',
                    width: 150,
                },
                {
                    title: 'เบอร์โทร',
                    dataIndex: 'phone',
                    key: 'phone',
                    width: 120,
                    ...this.getColumnSearchProps('phone'),
                },
                {
                    title: 'ที่อยู่',
                    dataIndex: 'address',
                    key: 'address',
                    ellipsis: true,
                    width: 200,
                },
                {
                    title: 'วันที่',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    ellipsis: true,
                    width: 120,
                    render: render =>
                    <>
                        <div>{moment(render).format('L')}</div>
                    </>
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'x',
                    width: 60,
                    render: (record) =>
                        <>
                            <div type="primary" onClick={() => this.showModal(record)}><EditTwoTone style={{ fontSize: '20px' }} twoToneColor="#63549B" /></div>
                        </>,
                },
                {
                    title: '',
                    dataIndex: '',
                    key: 'x',
                    width: 50,
                    render: (record) =>
                        <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteUser(record.userProfileId)}>
                            <div><DeleteTwoTone style={{ fontSize: '20px' }} twoToneColor="#DA213D" /></div>
                        </Popconfirm>,
                },
            ]
        });
    }

    async handleDeleteUser(userProfileId) {
        this.setState({ statusButtonEdit: true });
        const data = {
            userStatus: "N"
        };

        var url_delete_user = ip + "/UserProfile/update/delete/" + userProfileId;
        const deleteuser = await (await axios.put(url_delete_user, data)).data;
        if (deleteuser[0] > 0) {
            this.setState({ statusButtonEdit: false, userstatus: true });

            var url_user = ip + "/UserProfile/find/all/admin";
            const user = await (await axios.get(url_user)).data;
            this.setState({
                user: user,
                userstatus: false
            });
        } else {

        }
    }

    render() {
        return (
            <Container fluid>
                <Spin spinning={this.state.statusButtonEdit} size="large">
                    <Row id="product">
                        <Col xs={1} md={1} xl={1} id="icon-user">
                            <BsFillPersonLinesFill style={{ fontSize: '400%', color: '#DA213D' }} />
                        </Col>
                        <Col xs={5} md={5} xl={5} id="page-user"> สมาชิก </Col>
                    </Row>
                    <Row id="input-search1">
                        <Table columns={this.state.usertable} dataSource={this.state.user} loading={this.state.userstatus} scroll={{ x: 1500 }} />
                    </Row>
                    <Modal
                        title="รายละเอียดสมาชิก"
                        visible={this.state.isModalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={600}>
                        <Form>
                            <Row id="row-header">รายละเอียดสมาชิก</Row>
                            <Col md={24} xl={24} id="image-profile">
                                {
                                    (this.state.img === "https://www.hitsthai.com/API/profile/null") ?
                                        <Avatar size={{ md: 100, lg: 130, xl: 150, xxl: 200 }} icon={<AntDesignOutlined />} />
                                        :
                                        <Image src={this.state.img} alt="imgProfile" id="imgprofile" responsive />
                                }

                            </Col>
                            <Col md={24} xl={24}>

                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">ประเภทสมาชิก</Col>
                                    <Col>
                                        <Select defaultValue="ประเภทสมาชิก" style={{ width: 140 }} labelInValue value={{ value: this.state.memberId }} onChange={this.handleChangeMemberIdEdit} id="input" name="memberId">
                                            {
                                                this.state.member?.map((member) => {
                                                    return <Option value={member.memberId}>{member.memberName}</Option>
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">Level สมาชิก</Col>
                                    <Col>
                                        <Select defaultValue="ประเภทสมาชิก" style={{ width: 140 }} labelInValue value={{ value: this.state.levelId }} onChange={this.handleChangeLevelIdEdit} id="input" name="levelId">
                                            {
                                                this.state.level?.map((level) => {
                                                    return <Option value={level.levelId}>{level.didplayName}</Option>
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">รหัสสมาชิก</Col>
                                    <Col><Input id="input-level" name="userCode" value={this.state.userCode} onChange={this.onChangeFilduserCode} /></Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">ชื่อสมาชิก</Col>
                                    <Col>{this.state.name}</Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">Line</Col>
                                    <Col>{this.state.line}</Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">อีเมลล์</Col>
                                    <Col>{this.state.email}</Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">เบอร์โทร</Col>
                                    <Col>{this.state.phone}</Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">ที่อยู่</Col>
                                    <Col>{this.state.address}</Col>
                                </Row>
                                <Row id="row-margin">
                                    <Col md={6} xl={6}></Col>
                                    <Col md={5} xl={5} id="col-header">วันที่</Col>
                                    <Col>{moment(this.state.createDate).format('L')}</Col>
                                </Row>
                            </Col>
                        </Form>
                    </Modal>
                </Spin>
            </Container>
        )
    }
}