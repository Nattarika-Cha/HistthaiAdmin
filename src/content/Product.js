import React, { Component } from "react";
import { FaProductHunt } from "react-icons/fa";
import { Row, Col, Input, Select, Button, Table, Switch, Modal, Popconfirm, Upload, Form } from 'antd';
import { Container } from 'react-bootstrap';
import { CloseOutlined, CheckOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons'; //PrinterTwoTone
import '../css/Product.css';
import moment from 'moment';
import axios from 'axios';

var ip = "http://localhost:5000";

const { Option } = Select;
const { TextArea } = Input;

// function handleChange(value) {
//     console.log(`selected ${value}`);
// }

function handleChange1(value) {
    console.log(`selected ${value}`);
}

function handleChange2(value) {
    console.log(`selected ${value}`);
}

function handleChange3(value) {
    console.log(`selected ${value}`);
}

function handleChange4(value) {
    console.log(`selected ${value}`);
}

// const data = [
//     {
//         key: '1',
//         barcode: '8859653400017',
//         codeId: 'MRWG30440810',
//         name: 'แผ่นสเตนเลสสี / ผิวเงามิลเลอร์',
//         unit: 'กล่อง',
//         catalog: 'ใบตัดเหล็ก',
//         size: '1220 x 2440 x 1.0 มม.',
//         color: 'น้ำตาล',
//         date: '40-40-4400',
//     },
// ];

const prices = [
    {
        level: 'Silver',
        level1: '0',
        level2: '0',
        level3: '0',
        level4: '0',
        level5: '0',
    },
    {
        level: 'Gold',
        level1: '0',
        level2: '0',
        level3: '0',
        level4: '0',
        level5: '0',
    },
    {
        level: 'Platinum',
        level1: '0',
        level2: '0',
        level3: '0',
        level4: '0',
        level5: '0',
    },
    {
        level: 'End User',
        level1: '0',
        level2: '0',
        level3: '0',
        level4: '0',
        level5: '0',
    },
];

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function getBase641(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            product: [],
            productEdit: [],
            productstatus: true,
            isModalVisible: false,
            isModal1Visible: false,
            previewImage: '',
            previewTitle: '',
            previewImage1: '',
            previewTitle1: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-4',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
            fileList1: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-2',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-3',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
                {
                    uid: '-4',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ]
        };

        this.product = [
            {
                title: 'รูปภาพ',
                dataIndex: 'image',
                key: 'image',
            },
            {
                title: 'แสดง',
                dataIndex: '',
                key: 'x',
                render: (record) =>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        size="small"
                        checked={(record.productStatus === "A") ? true : false}
                        onChange={() => this.onChangeProduct(record)}
                    //defaultChecked
                    />,
            },
            {
                title: 'รหัสโค้ด',
                dataIndex: 'codeId',
                key: 'codeId',
            },
            {
                title: 'รหัสสินค้า',
                dataIndex: 'productCode',
                key: 'productCode',
            },
            {
                title: 'ชื่อสินค้า',
                dataIndex: 'name',
                key: 'name',
                // onFilter: (value, record) => record.name.indexOf(value) === 0,
                // sorter: (a, b) => a.name.length - b.name.length,
                // sortDirections: ['descend'],
            },
            {
                title: 'หน่วย',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: 'หมวดหมู่',
                dataIndex: 'catName',
                key: 'catName',
                // onFilter: (value, record) => record.catName.indexOf(value) === 0,
                // sorter: (a, b) => a.catName.length - b.catName.length,
                // sortDirections: ['descend'],
            },
            {
                title: 'ขนาด',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'สี',
                dataIndex: 'color',
                key: 'color',
            },
            {
                title: 'วันที่',
                dataIndex: 'createDate',
                key: 'createDate',
                render: render =>
                    <>
                        <div>{moment(render).format('L')}</div>
                    </>

            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 45,
                render: (record) =>
                    <>
                        <div type="primary" onClick={() => this.showModal(record)}><EditTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#63549B" /></div>
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

        this.price = [
            {
                title: 'ระดับ',
                dataIndex: 'level',
                width: 'fit-content',
            },
            {
                title: 'Level1',
                dataIndex: 'level1',
                editable: true,
                render: () =>
                    <Input id="input" />,
            },
            {
                title: 'Level2',
                dataIndex: 'level2',
                editable: true,
                render: () =>
                    <Input id="input" />,
            },
            {
                title: 'Level3',
                dataIndex: 'level3',
                editable: true,
                render: () =>
                    <Input id="input" />,
            },
            {
                title: 'Level4',
                dataIndex: 'level4',
                editable: true,
                render: () =>
                    <Input id="input" />,
            },
            {
                title: 'Level5',
                dataIndex: 'level5',
                editable: true,
                render: () =>
                    <Input id="input" />,
            },
        ]

        this.showModal = this.showModal.bind(this);
        this.showModal1 = this.showModal1.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleCancelimage = this.handleCancelimage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChangeimage = this.handleChangeimage.bind(this);

        this.handleCancelimage1 = this.handleCancelimage1.bind(this);
        this.handlePreview1 = this.handlePreview1.bind(this);
        this.handleChangeimage1 = this.handleChangeimage1.bind(this);

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onClickProduct = this.onClickProduct.bind(this);
        this.onChangeFildProduct = this.onChangeFildProduct.bind(this);
    }

    onChangeFildProduct(e) {
        this.setState({
            productEdit : { [e.target.name]: e.target.value }
        })
    }

    showModal(record) {
        console.log(record, " record")
        this.setState({
            isModalVisible: true,
            productEdit: record
        });
    };

    showModal1() {
        this.setState({ isModal1Visible: true });
    };

    handleOk(values) {
        console.log(values, " values");
        this.setState({ isModalVisible: false });
    };

    handleOk1() {
        this.setState({ isModal1Visible: false });
    };

    handleCancel() {
        this.setState({ isModalVisible: false });
    };

    handleCancel1() {
        this.setState({ isModalVisible: false });
    };

    handleCancelimage() {
        this.setState({ previewVisible: false });
    };
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChangeimage(fileList) {
        this.setState({ ...fileList });
    };

    handleCancelimage1() {
        this.setState({ preview1Visible: false });
    };
    handlePreview1 = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase641(file.originFileObj);
        }

        this.setState({
            previewImage1: file.url || file.preview,
            previewVisible: true,
            previewTitle1: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    handleChangeimage1(fileList) {
        this.setState({ ...fileList });
    };

    async onChangeProduct(record) {
        var productStatus = "";
        if (record?.productStatus === "A") {
            productStatus = "N";
        } else {
            productStatus = "A";
        }
        const data = {
            productStatus: productStatus
        };

        var url_update_product_status = ip + "/Product/update/productstatus/" + record?.productId;
        const updateproductstatus = await (await axios.put(url_update_product_status, data)).data;
        if (updateproductstatus[0] > 0) {
            const product = [...this.state.product];
            product.forEach((product, index) => {
                if (product.productId === record?.productId) {
                    product.productStatus = productStatus;
                }
            });
            this.setState({
                product: product,
                productstatus: false
            });
        } else {

        }
    }

    onClickProduct() {
        console.log("Switch click");
    }

    async componentDidMount() {
        var url_product = ip + "/Product/find/all/admin";
        const product = await (await axios.get(url_product)).data;
        this.setState({
            product: product,
            productstatus: false
        });
    }

    render() {
        const uploadButton = (
            <div>
                <PlusOutlined style={{ fontSize: "20px", color: '#DA213D' }} />
                <div style={{ marginTop: 8, color: '#DA213D' }}>เพิ่มรูปภาพ</div>
            </div>
        );
        const uploadButton1 = (
            <div>
                <PlusOutlined style={{ fontSize: "20px", color: '#DA213D' }} />
                <div style={{ marginTop: 8, color: '#DA213D' }}>เพิ่มรูปภาพ</div>
            </div>
        );
        return (
            <Container fluid>
                <Row id="product">
                    <Col xs={1} md={1} xl={1} id="icon-product">
                        <FaProductHunt style={{ fontSize: '400%', color: '#DA213D' }} />
                    </Col>
                    <Col xs={5} md={5} xl={5} id="page-product">
                        สินค้า
                    </Col>
                </Row>
                <Row id="input-search">
                    <Input.Group compact>
                        <Input.Search style={{ width: '30%' }} placeholder="ค้นหาสินค้า (รหัสสินค้า หรือ ชื่อสินค้า)" />
                    </Input.Group>
                </Row>
                <Row id="input-search">
                    {/* <Col md={2} xl={2}><div>เรียงลำดับตาม</div></Col>
                    <Col md={3} xl={3} id="col">
                        <Select defaultValue="เรียงลำดับตาม" style={{ width: 130 }} onChange={handleChange}>
                            <Option value="วันที่">วันที่</Option>
                            <Option value="ชื่อ">ชื่อ</Option>
                        </Select>
                    </Col>
                    <Col md={5} xl={4} id="col">
                        <Button id="button-print" icon={<PrinterTwoTone twoToneColor="#DA213D"/>}>ปริ้นรายการสินค้า</Button>
                    </Col> */}
                    <Col md={4} xl={3} id="col">
                        {/* <Button id="button-addproduct" icon={<FileAddTwoTone twoToneColor="#DA213D"/>}>เพิ่มรายการสินค้า</Button> */}
                        <Button id="button-addproduct" onClick={this.showModal1}>เพิ่มรายการสินค้า</Button>
                    </Col>
                    <Col md={5} xl={4} id="col">
                        <Button id="button-addproduct">เพิ่มไฟล์รายการสินค้า</Button>
                    </Col>
                </Row>
                <Row id="input-search">
                    <Table
                        columns={this.product}
                        dataSource={this.state.product}
                        loading={this.state.productstatus}
                        scroll={{ x: 1500 }}
                        // align={{center}}
                        pagination={{ pageSizeOptions: ['30', '40'], showSizeChanger: true }}
                    />
                </Row>
                {console.log(this.state.productEdit, " this.state.productEdit")}
                <Modal
                    title="แก้ไขรายการสินค้า"
                    visible={this.state.isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={800}>
                    <Form id="form">
                        <Col md={24} xl={24} id="product-detail">รายละเอียดสินค้า</Col>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>รหัสบาร์โค้ด :</Col>
                                    <Col md={12} xl={12}><Input id="input" name="codeId" value={this.state.productEdit?.codeId} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>รหัสสินค้า :</Col>
                                    <Col md={12} xl={12}><Input id="input" name="productCode" value={this.state.productEdit?.productCode} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>หน่วย :</Col>
                                    <Col md={12} xl={12}><Input id="input" name="unit" value={this.state.productEdit?.unit} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ชื่อสินค้า :</Col>
                                    <Col md={12} xl={12}><Input id="input" name="name" value={this.state.productEdit?.name} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ขนาด :</Col>
                                    <Col md={12} xl={12}><Input id="input" name="size" value={this.state.productEdit?.size} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>สถานะ :</Col>
                                    <Col md={12} xl={12}>
                                        <Select defaultValue="สถานะ" onChange={handleChange2} id="input">
                                            <Option value="มีจำหน่าย">มีจำหน่าย</Option>
                                            <Option value="รอเพิ่มเติมสินค้า">รอเพิ่มเติมสินค้า</Option>
                                            <Option value="สั่งสินค้าล่วงหน้า">สั่งสินค้าล่วงหน้า</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>สี :</Col>
                                    <Col md={12} xl={12}><Input id="input" name="color" value={this.state.productEdit?.color} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>หมวดหมู่ :</Col>
                                    <Col md={12} xl={12}>
                                        <Select defaultValue="หมวดหมู่" onChange={handleChange1} id="input">
                                            <Option value="อุปกรณ์เครืองมือช่าง">อุปกรณ์เครืองมือช่าง</Option>
                                            <Option value="แผ่นแสตนเลส">แผ่นแสตนเลส</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>วิธีการใช้งาน :</Col>
                                    <Col md={12} xl={12}><TextArea id="input" name="direction" value={this.state.productEdit?.direction} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ข้อควรระวัง :</Col>
                                    <Col md={12} xl={12}><TextArea id="input" name="caution" value={this.state.productEdit?.caution} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>วิธีเก็บรักษา :</Col>
                                    <Col md={12} xl={12}><TextArea id="input" name="keepespreserve" value={this.state.productEdit?.keepespreserve} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ขั้นตอนการปฐมพยาบาล :</Col>
                                    <Col md={12} xl={12}><TextArea id="input" name="firstaidprocedure" value={this.state.productEdit?.firstaidprocedure} onChange={this.onChangeFildProduct}/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row id="row-price">
                            <Table columns={this.price} dataSource={prices} />
                        </Row>
                        <Row id="add-img">
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChangeimage}
                            >
                                {this.state.fileList.length >= 5 ? null : uploadButton}
                            </Upload>
                            <Modal
                                visible={this.state.previewVisible}
                                title={this.state.previewTitle}
                                footer={null}
                                onCancel={this.handleCancelimage}
                            >
                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                            </Modal>
                        </Row>
                        <Button type="primary" htmlType="submit" id="Button-submit">
                            ยืนยัน
                            </Button>
                    </Form>
                </Modal>
                <Modal
                    title="แก้ไขรายการสินค้า"
                    visible={this.state.isModal1Visible}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                    width={800}>
                    <Form id="form">
                        <Col md={24} xl={24} id="product-detail">รายละเอียดสินค้า</Col>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>รหัสบาร์โค้ด :</Col>
                                    <Col md={12} xl={12}><Input id="input" /></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>รหัสสินค้า :</Col>
                                    <Col md={12} xl={12}><Input id="input" /></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>หน่วย :</Col>
                                    <Col md={12} xl={12}><Input id="input" /></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ชื่อสินค้า :</Col>
                                    <Col md={12} xl={12}><Input id="input" /></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ขนาด :</Col>
                                    <Col md={12} xl={12}><Input id="input" /></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>สถานะ :</Col>
                                    <Col md={12} xl={12}>
                                        <Select defaultValue="สถานะ" onChange={handleChange3} id="input">
                                            <Option value="มีจำหน่าย">มีจำหน่าย</Option>
                                            <Option value="รอเพิ่มเติมสินค้า">รอเพิ่มเติมสินค้า</Option>
                                            <Option value="สั่งสินค้าล่วงหน้า">สั่งสินค้าล่วงหน้า</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>สี :</Col>
                                    <Col md={12} xl={12}><Input id="input" /></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>หมวดหมู่ :</Col>
                                    <Col md={12} xl={12}>
                                        <Select defaultValue="หมวดหมู่" onChange={handleChange4} id="input">
                                            <Option value="อุปกรณ์เครืองมือช่าง">อุปกรณ์เครืองมือช่าง</Option>
                                            <Option value="แผ่นแสตนเลส">แผ่นแสตนเลส</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>วิธีการใช้งาน :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input" /></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ข้อควรระวัง :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input" /></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>วิธีเก็บรักษา :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input" /></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ขั้นตอนการปฐมพยาบาล :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input" /></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Row id="row-price">
                            <Table columns={this.price} dataSource={prices} />
                        </Row>
                        <Row id="add-img">
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={this.state.fileList1}
                                onPreview={this.handlePreview1}
                                onChange={this.handleChangeimage1}
                            >
                                {this.state.fileList1.length >= 5 ? null : uploadButton1}
                            </Upload>
                            <Modal
                                visible={this.state.previewVisible}
                                title={this.state.previewTitle1}
                                footer={null}
                                onCancel={this.handleCancelimage1}
                            >
                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage1} />
                            </Modal>
                        </Row>
                    </Form>
                </Modal>
            </Container>
        )
    }
}