import React, { Component } from "react";
import { FaProductHunt } from "react-icons/fa";
import { Row, Col, Input, Select, Button, Table, Switch, Modal, Popconfirm, Upload, Form, Spin } from 'antd';
import { Container } from 'react-bootstrap';
import { CloseOutlined, CheckOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons'; //PrinterTwoTone
import '../css/Product.css';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';

var ip = "http://localhost:5000";

const { Option } = Select;
const { TextArea } = Input;


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
            catalog: [],
            member: [],
            member1: '',
            member2: '',
            member3: '',
            EndUser: '',
            productEdit: [],
            productstatus: true,
            isModalVisible: false,
            isModalVisibleSave: false,

            statusButtonEdit: false,
            productId: 0,
            codeId: '',
            priceProductId: 0,
            barCode: '',
            productCode: '',
            unit: '',
            brand: '',
            name: '',
            size: '',
            flagProduct: 0,
            color: '',
            catId: 0,
            direction: '',
            caution: '',
            keepespreserve: '',
            firstaidprocedure: '',
            detail: '',
            level1: '',
            level2: '',
            level3: '',
            level4: '',
            level5: '',
            level6: '',
            level7: '',
            level8: '',
            level9: '',
            level10: '',
            level11: '',
            level12: '',
            level13: '',
            level14: '',
            level15: '',
            enduser: '',

            productIdSave: 0,
            codeIdSave: '',
            priceProductIdSave: 0,
            barCodeSave: '',
            productCodeSave: '',
            unitSave: '',
            brandSave: '',
            nameSave: '',
            sizeSave: '',
            flagProductSave: 0,
            colorSave: '',
            catIdSave: 0,
            directionSave: '',
            cautionSave: '',
            keepespreserveSave: '',
            firstaidprocedureSave: '',
            detailSave: '',
            level1Save: '',
            level2Save: '',
            level3Save: '',
            level4Save: '',
            level5Save: '',
            level6Save: '',
            level7Save: '',
            level8Save: '',
            level9Save: '',
            level10Save: '',
            level11Save: '',
            level12Save: '',
            level13Save: '',
            level14Save: '',
            level15Save: '',
            enduserSave: '',

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
                dataIndex: 'barCode',
                key: 'barCode',
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
        this.showModalSaveProduct = this.showModalSaveProduct.bind(this);
        this.handEditProduct = this.handEditProduct.bind(this);
        this.handleCancelEditProduct = this.handleCancelEditProduct.bind(this);

        this.handleCancelimage = this.handleCancelimage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChangeimage = this.handleChangeimage.bind(this);

        this.handleCancelimage1 = this.handleCancelimage1.bind(this);
        this.handlePreview1 = this.handlePreview1.bind(this);
        this.handleChangeimage1 = this.handleChangeimage1.bind(this);

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onClickProduct = this.onClickProduct.bind(this);
        this.onChangeFildProduct = this.onChangeFildProduct.bind(this);

        this.handleChangeFlagProductEdit = this.handleChangeFlagProductEdit.bind(this);
        this.handleChangeCatIdEdit = this.handleChangeCatIdEdit.bind(this);

        this.handleSaveProduct = this.handleSaveProduct.bind(this);
        this.handleCancelSaveProduct = this.handleCancelSaveProduct.bind(this);

        this.handleChangeFlagProductSave = this.handleChangeFlagProductSave.bind(this);
        this.handleChangeCatIdSave = this.handleChangeCatIdSave.bind(this);
    }

    onChangeFildProduct(e) {
        // const product = this.state.productEdit;
        // product[e.target.name] = e.target.value;
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showModal(record) {
        this.setState({
            isModalVisible: true,
            productEdit: record,
            productId: record.productId,
            codeId: record.codeId,
            priceProductId: record.priceProductId,
            barCode: record.barCode,
            productCode: record.productCode,
            unit: record.unit,
            brand: record.brand,
            name: record.name,
            size: record.size,
            flagProduct: record.flagProduct,
            color: record.color,
            catId: record.catId,
            direction: record.direction,
            caution: record.caution,
            keepespreserve: record.keepespreserve,
            firstaidprocedure: record.firstaidprocedure,
            detail: record.detail,
            level1: record.level1,
            level2: record.level2,
            level3: record.level3,
            level4: record.level4,
            level5: record.level5,
            level6: record.level6,
            level7: record.level7,
            level8: record.level8,
            level9: record.level9,
            level10: record.level10,
            level11: record.level11,
            level12: record.level12,
            level13: record.level13,
            level14: record.level14,
            level15: record.level15,
            enduser: record.enduser,
        });
    };

    handleChangeFlagProductEdit(value) {
        this.setState({
            flagProduct: value.value
        });
    }

    handleChangeFlagProductSave(value) {
        this.setState({
            flagProductSave: value.value
        });
    }

    handleChangeCatIdEdit(value) {
        this.setState({
            catId: value.value
        });
    }

    handleChangeCatIdSave(value) {
        this.setState({
            catIdSave: value.value
        });
    }

    showModalSaveProduct() {
        this.setState({ isModalVisibleSave: true });
    };

    async handEditProduct() {
        this.setState({ statusButtonEdit: true });
        var dataSave = {
            productId: this.state.productId,
            // codeId: this.state.codeId,
            priceProductId: this.state.priceProductId,
            //priceProductId: "",
            barCode: this.state.barCode,
            productCode: this.state.productCode,
            unit: this.state.unit,
            brand: this.state.brand,
            name: this.state.name,
            size: this.state.size,
            flagProduct: this.state.flagProduct,
            color: this.state.color,
            catId: this.state.catId,
            direction: this.state.direction,
            caution: this.state.caution,
            keepespreserve: this.state.keepespreserve,
            firstaidprocedure: this.state.firstaidprocedure,
            detail: this.state.detail,
            level1: this.state.level1,
            level2: this.state.level2,
            level3: this.state.level3,
            level4: this.state.level4,
            level5: this.state.level5,
            level6: this.state.level6,
            level7: this.state.level7,
            level8: this.state.level8,
            level9: this.state.level9,
            level10: this.state.level10,
            level11: this.state.level11,
            level12: this.state.level12,
            level13: this.state.level13,
            level14: this.state.level14,
            level15: this.state.level15,
            enduser: this.state.enduser,
        }

        var url_update_product_price = ip + "/Product/update/product/admin/";
        const updateproductprice = await (await axios.put(url_update_product_price, dataSave)).data;
        if (updateproductprice) {
            this.setState({ statusButtonEdit: false, productstatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    isModalVisibleSave: false,
                    productId: 0,
                    codeId: '',
                    priceProductId: 0,
                    barCode: '',
                    productCode: '',
                    unit: '',
                    brand: '',
                    name: '',
                    size: '',
                    flagProduct: 0,
                    color: '',
                    catId: 0,
                    direction: '',
                    caution: '',
                    keepespreserve: '',
                    firstaidprocedure: '',
                    detail: '',
                    level1: '',
                    level2: '',
                    level3: '',
                    level4: '',
                    level5: '',
                    level6: '',
                    level7: '',
                    level8: '',
                    level9: '',
                    level10: '',
                    level11: '',
                    level12: '',
                    level13: '',
                    level14: '',
                    level15: '',
                    enduser: '',
                    productEdit: []
                });
            });
            var url_product = ip + "/Product/find/all/admin";
            const product = await (await axios.get(url_product)).data;
            this.setState({
                product: product,
                productstatus: false
            });
        } else {
            this.setState({ statusButtonEdit: false });
            swal("Warning!", "บันทึกข้อมูลไม่สำเร็จ", "warning").then((value) => {
            });
        }
    };

    async handleSaveProduct() {
        this.setState({ statusButtonEdit: true });
        var dataSave = {
            barCode: this.state.barCodeSave,
            productCode: this.state.productCodeSave,
            unit: this.state.unitSave,
            brand: this.state.brandSave,
            name: this.state.nameSave,
            size: this.state.sizeSave,
            flagProduct: this.state.flagProductSave,
            color: this.state.colorSave,
            catId: this.state.catIdSave,
            direction: this.state.directionSave,
            caution: this.state.cautionSave,
            keepespreserve: this.state.keepespreserveSave,
            firstaidprocedure: this.state.firstaidprocedureSave,
            productStatus: "A",
            detail: this.state.detailSave,
            level1: this.state.level1Save,
            level2: this.state.level2Save,
            level3: this.state.level3Save,
            level4: this.state.level4Save,
            level5: this.state.level5Save,
            level6: this.state.level6Save,
            level7: this.state.level7Save,
            level8: this.state.level8Save,
            level9: this.state.level9Save,
            level10: this.state.level10Save,
            level11: this.state.level11Save,
            level12: this.state.level12Save,
            level13: this.state.level13Save,
            level14: this.state.level14Save,
            level15: this.state.level15Save,
            enduser: this.state.enduserSave,
            priceProduceStatus: "A"
        }

        var url_create_product_price = ip + "/Product/create/admin/";
        const createproductprice = await (await axios.post(url_create_product_price, dataSave)).data;
        if (createproductprice) {
            this.setState({ statusButtonEdit: false, productstatus: true });
            swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                this.setState({
                    isModalVisibleSave: false,
                    productIdSave: 0,
                    codeIdSave: '',
                    priceProductIdSave: 0,
                    barCodeSave: '',
                    productCodeSave: '',
                    unitSave: '',
                    brandSave: '',
                    nameSave: '',
                    sizeSave: '',
                    flagProductSave: 0,
                    colorSave: '',
                    catIdSave: 0,
                    directionSave: '',
                    cautionSave: '',
                    keepespreserveSave: '',
                    firstaidprocedureSave: '',
                    detailSave: '',
                    level1Save: '',
                    level2Save: '',
                    level3Save: '',
                    level4Save: '',
                    level5Save: '',
                    level6Save: '',
                    level7Save: '',
                    level8Save: '',
                    level9Save: '',
                    level10Save: '',
                    level11Save: '',
                    level12Save: '',
                    level13Save: '',
                    level14Save: '',
                    level15Save: '',
                    enduserSave: ''
                });
            });
            var url_product = ip + "/Product/find/all/admin";
            const product = await (await axios.get(url_product)).data;
            this.setState({
                product: product,
                productstatus: false
            });
        } else {
            this.setState({ statusButtonEdit: false });
            swal("Warning!", "บันทึกข้อมูลไม่สำเร็จ", "warning").then((value) => {
            });
        }
    };

    handleCancelEditProduct() {
        this.setState({
            isModalVisible: false,
            productId: 0,
            codeId: '',
            priceProductId: 0,
            barCode: '',
            productCode: '',
            unit: '',
            brand: '',
            name: '',
            size: '',
            flagProduct: 0,
            color: '',
            catId: 0,
            direction: '',
            caution: '',
            keepespreserve: '',
            firstaidprocedure: '',
            detail: '',
            level1: '',
            level2: '',
            level3: '',
            level4: '',
            level5: '',
            level6: '',
            level7: '',
            level8: '',
            level9: '',
            level10: '',
            level11: '',
            level12: '',
            level13: '',
            level14: '',
            level15: '',
            enduser: '',
            productEdit: []
        });
    };

    handleCancelSaveProduct() {
        this.setState({
            isModalVisibleSave: false,
            productIdSave: 0,
            codeIdSave: '',
            priceProductIdSave: 0,
            barCodeSave: '',
            productCodeSave: '',
            unitSave: '',
            brandSave: '',
            nameSave: '',
            sizeSave: '',
            flagProductSave: 0,
            colorSave: '',
            catIdSave: 0,
            directionSave: '',
            cautionSave: '',
            keepespreserveSave: '',
            firstaidprocedureSave: '',
            detailSave: '',
            level1Save: '',
            level2Save: '',
            level3Save: '',
            level4Save: '',
            level5Save: '',
            level6Save: '',
            level7Save: '',
            level8Save: '',
            level9Save: '',
            level10Save: '',
            level11Save: '',
            level12Save: '',
            level13Save: '',
            level14Save: '',
            level15Save: '',
            enduserSave: ''
        });
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

        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog
        });

        var url_member = ip + "/Member/find/all";
        const member = await (await axios.get(url_member)).data;
        this.setState({
            member: member
        });

        this.state.member?.map((member) => {
            if (member.memberCode === "member1") {
                this.setState({
                    member1: member.memberName
                });
            } else if (member.memberCode === "member2") {
                this.setState({
                    member2: member.memberName
                });
            } else if (member.memberCode === "member3") {
                this.setState({
                    member3: member.memberName
                });
            } else if (member.memberCode === "EndUser") {
                this.setState({
                    EndUser: member.memberName
                });
            }
            return 0;
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
                <Spin spinning={this.state.statusButtonEdit} size="large">
                    <Row id="product">
                        <Col xs={1} md={1} xl={1} id="icon-product">
                            <FaProductHunt style={{ fontSize: '400%', color: '#DA213D' }} />
                        </Col>
                        <Col xs={5} md={5} xl={5} id="page-product">
                            สินค้า
                        </Col>
                    </Row>
                    {/* <Row id="input-search">
                        <Input.Group compact>
                            <Input.Search style={{ width: '30%' }} placeholder="ค้นหาสินค้า (รหัสสินค้า หรือ ชื่อสินค้า)" />
                        </Input.Group>
                    </Row> */}
                    <Row id="input-search">
                        <Col md={4} xl={3} id="col">
                            <Button id="button-addproduct" onClick={this.showModalSaveProduct}>เพิ่มรายการสินค้า</Button>
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
                    <Modal
                        title="แก้ไขรายการสินค้า"
                        visible={this.state.isModalVisible}
                        onOk={this.handEditProduct}
                        onCancel={this.handleCancelEditProduct}
                        width={800}>
                        <Form id="form">
                            <Col md={24} xl={24} id="product-detail">รายละเอียดสินค้า</Col>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>รหัสบาร์โค้ด :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="barCode" value={this.state.barCode} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>รหัสสินค้า :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="productCode" value={this.state.productCode} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>หน่วย :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="unit" value={this.state.unit} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ยี้ห้อ :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="brand" value={this.state.brand} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={24} xl={24}>
                                    <Row>
                                        <Col md={3} xl={3}>ชื่อสินค้า :</Col>
                                        <Col md={18} xl={18}><Input id="input" name="name" value={this.state.name} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ขนาด :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="size" value={this.state.size} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>สถานะ :</Col>
                                        <Col md={12} xl={12}>
                                            <Select labelInValue value={{ value: ('' + this.state.flagProduct) }} onChange={this.handleChangeFlagProductEdit} id="input" style={{width: "100%"}}>
                                                <Option value="1">มีจำหน่าย</Option>
                                                <Option value="2">รอเพิ่มเติมสินค้า</Option>
                                                <Option value="3">สั่งสินค้าล่วงหน้า</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>สี :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="color" value={this.state.color} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>หมวดหมู่ :</Col>
                                        <Col md={12} xl={12}>
                                            <Select labelInValue value={{ value: this.state.catId }} onChange={this.handleChangeCatIdEdit} id="input" name="catId" style={{width: "100%"}}>
                                                {
                                                    this.state.catalog?.map((catalog) => {
                                                        return <Option value={catalog.catId}>{catalog.catName}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>วิธีการใช้งาน :</Col>
                                        <Col md={12} xl={12}><TextArea id="input" name="direction" value={this.state.direction} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ข้อควรระวัง :</Col>
                                        <Col md={12} xl={12}><TextArea id="input" name="caution" value={this.state.caution} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>วิธีเก็บรักษา :</Col>
                                        <Col md={12} xl={12}><TextArea id="input" name="keepespreserve" value={this.state.keepespreserve} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ขั้นตอนการปฐมพยาบาล :</Col>
                                        <Col md={12} xl={12}><TextArea id="input" name="firstaidprocedure" value={this.state.firstaidprocedure} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={24} xl={24}>
                                    <Row>
                                        <Col md={3} xl={3}>รายละเอียดสินค้า :</Col>
                                        <Col md={18} xl={18}><TextArea id="input" name="detail" value={this.state.detail} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">ระดับ</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 1</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 2</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 3</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 4</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 5</Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.member1}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level1" value={this.state.level1} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level2" value={this.state.level2} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level3" value={this.state.level3} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level4" value={this.state.level4} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level5" value={this.state.level5} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.member2}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level6" value={this.state.level6} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level7" value={this.state.level7} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level8" value={this.state.level8} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level9" value={this.state.level9} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level10" value={this.state.level10} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.member3}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level11" value={this.state.level11} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level12" value={this.state.level12} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level13" value={this.state.level13} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level14" value={this.state.level14} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level15" value={this.state.level15} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.EndUser}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="enduser" value={this.state.enduser} onChange={this.onChangeFildProduct} /></Col>
                            </Row>

                            {/* <Row id="row-price">
                            <Table columns={this.price} dataSource={prices} />
                        </Row> */}
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
                        </Form>
                    </Modal>
                    <Modal
                        title="เพิ่มรายการสินค้า"
                        visible={this.state.isModalVisibleSave}
                        onOk={this.handleSaveProduct}
                        onCancel={this.handleCancelSaveProduct}
                        width={800}>
                        <Form id="form">
                            <Col md={24} xl={24} id="product-detail">รายละเอียดสินค้า</Col>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>รหัสบาร์โค้ด :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="barCodeSave" value={this.state.barCodeSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>รหัสสินค้า :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="productCodeSave" value={this.state.productCodeSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>หน่วย :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="unitSave" value={this.state.unitSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ยี้ห้อ :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="brandSave" value={this.state.brandSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={24} xl={24}>
                                    <Row>
                                        <Col md={3} xl={3}>ชื่อสินค้า :</Col>
                                        <Col md={18} xl={18}><Input id="input" name="nameSave" value={this.state.nameSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ขนาด :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="sizeSave" value={this.state.sizeSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>สถานะ :</Col>
                                        <Col md={12} xl={12}>
                                            <Select labelInValue value={{ value: ('' + this.state.flagProductSave) }} onChange={this.handleChangeFlagProductSave} id="input" style={{width: "100%"}}>
                                                <Option value="1">มีจำหน่าย</Option>
                                                <Option value="2">รอเพิ่มเติมสินค้า</Option>
                                                <Option value="3">สั่งสินค้าล่วงหน้า</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>สี :</Col>
                                        <Col md={12} xl={12}><Input id="input" name="colorSave" value={this.state.colorSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>หมวดหมู่ :</Col>
                                        <Col md={12} xl={12}>
                                            <Select labelInValue value={{ value: this.state.catIdSave }} onChange={this.handleChangeCatIdSave} id="input" name="catIdSave" style={{width: "100%"}}>
                                                {
                                                    this.state.catalog?.map((catalog) => {
                                                        return <Option value={catalog.catId}>{catalog.catName}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>วิธีการใช้งาน :</Col>
                                        <Col md={12} xl={12}><TextArea rows={2} id="input" name="directionSave" value={this.state.directionSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ข้อควรระวัง :</Col>
                                        <Col md={12} xl={12}><TextArea rows={2} id="input" name="cautionSave" value={this.state.cautionSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>วิธีเก็บรักษา :</Col>
                                        <Col md={12} xl={12}><TextArea rows={2} id="input" name="keepespreserveSave" value={this.state.keepespreserveSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                                <Col md={12} xl={12}>
                                    <Row>
                                        <Col md={6} xl={6}>ขั้นตอนการปฐมพยาบาล :</Col>
                                        <Col md={12} xl={12}><TextArea rows={2} id="input" name="firstaidprocedureSave" value={this.state.firstaidprocedureSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={24} xl={24}>
                                    <Row>
                                        <Col md={3} xl={3}>รายละเอียดสินค้า :</Col>
                                        <Col md={18} xl={18}><TextArea id="input" name="detailSave" value={this.state.detailSave} onChange={this.onChangeFildProduct} /></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">ระดับ</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 1</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 2</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 3</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 4</Col>
                                <Col md={4} xl={4} id="col-center-header">Level 5</Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.member1}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level1Save" value={this.state.level1Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level2Save" value={this.state.level2Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level3Save" value={this.state.level3Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level4Save" value={this.state.level4Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level5Save" value={this.state.level5Save} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.member2}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level6Save" value={this.state.level6Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level7Save" value={this.state.level7Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level8Save" value={this.state.level8Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level9Save" value={this.state.level9Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level10Save" value={this.state.level10Save} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.member3}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level11Save" value={this.state.level11Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level12Save" value={this.state.level12Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level13Save" value={this.state.level13Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level14Save" value={this.state.level14Save} onChange={this.onChangeFildProduct} /></Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="level15Save" value={this.state.level15Save} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            <Row id="add-product">
                                <Col md={4} xl={4} id="col-center-header">{this.state.EndUser}</Col>
                                <Col md={4} xl={4} id="col-price"><Input id="input-price" name="enduserSave" value={this.state.enduserSave} onChange={this.onChangeFildProduct} /></Col>
                            </Row>
                            {/* <Row id="row-price">
                                <Table columns={this.price} dataSource={prices} />
                            </Row> */}
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
                </Spin>
            </Container>
        )
    }
}