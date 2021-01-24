import React, { Component } from "react";
import { FaProductHunt } from "react-icons/fa";
import { Row, Col, Input, Select, Button, Table, Switch, Modal, Popconfirm, Upload, Form, Spin, Space } from 'antd';
import { Container, Image } from 'react-bootstrap';
import { CloseOutlined, CheckOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone, SearchOutlined } from '@ant-design/icons'; //PrinterTwoTone
import '../css/Product.css';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';
import Highlighter from 'react-highlight-words';
import imgm from '../img/photocomingsoon.svg';
import readXlsxFile from 'read-excel-file';
import { JsonToCsv, useJsonToCsv } from 'react-json-csv';

var ip = "http://128.199.198.10/API";
var uuid = "";
var uuidMain = "";
var uuidSave = "";
var uuidMainSave = "";

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

function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
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

            fileListMainEdit: [],
            ImgMainEdit: [],
            fileListDetailEdit: [],
            ImgDetailEdit: [],

            ststusButtomFile: false,
            dataImportFile: [],

            fileListMainSave: [],
            ImgMainSave: [],
            fileListDetailSave: [],
            ImgDetailSave: [],

            fileList: [],

            filteredInfo: null,
            sortedInfo: null,
            searchText: '',
            searchedColumn: '',
            producttable: [
                {
                    title: 'รูปภาพ',
                    dataIndex: 'img',
                    key: 'img',
                    render: (record) =>
                        <>
                            {
                                (record === null) ?
                                    <Image src={imgm} alt="imgProfile" width={"100%"} />
                                    :
                                    <Image src={record} alt="imgProfile" width={"100%"} />
                            }
                        </>,
                    width: 180
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
                    ...this.getColumnSearchProps('productCode'),

                },
                {
                    title: 'ชื่อสินค้า',
                    dataIndex: 'name',
                    key: 'name',
                    ...this.getColumnSearchProps('name'),
                },
                {
                    title: 'หน่วย',
                    dataIndex: 'unit',
                    key: 'unit',
                    filters: [
                        {
                            text: 'ใบ',
                            value: 'ใบ',
                        },
                        {
                            text: 'กล่อง',
                            value: 'กล่อง',
                        },
                        {
                            text: 'ลัง',
                            value: 'ลัง',
                        },
                        {
                            text: 'แผ่น',
                            value: 'แผ่น',
                        },
                    ],
                    onFilter: (value, record) => record.unit.indexOf(value) === 0,
                },
                {
                    title: 'หมวดหมู่',
                    dataIndex: 'catName',
                    key: 'catName',
                    filters: [
                        {
                            text: 'อุปกรณ์เครื่องมือช่าง',
                            value: 'อุปกรณ์เครื่องมือช่าง',
                        },
                        {
                            text: 'แผ่นสแตนเลส',
                            value: 'แผ่นสแตนเลส',
                        },
                    ],
                    onFilter: (value, record) => record.catName.indexOf(value) === 0,
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
                    ...this.getColumnSearchProps('color'),
                },
                {
                    title: 'วันที่',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    ...this.getColumnSearchProps('createDate'),
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
                    render: (record) =>
                        <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteProduct(record)}>
                            <div><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
                        </Popconfirm>,
                },
            ]
        };

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

        this.handleChangeListMainEdit = this.handleChangeListMainEdit.bind(this);
        this.handleChangeListDetailEdit = this.handleChangeListDetailEdit.bind(this);

        this.handleChangeListMainSave = this.handleChangeListMainSave.bind(this);
        this.handleChangeListDetailSave = this.handleChangeListDetailSave.bind(this);

        this.handleCancelimage = this.handleCancelimage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeFildProduct = this.onChangeFildProduct.bind(this);

        this.handleChangeFlagProductEdit = this.handleChangeFlagProductEdit.bind(this);
        this.handleChangeCatIdEdit = this.handleChangeCatIdEdit.bind(this);

        this.handleSaveProduct = this.handleSaveProduct.bind(this);
        this.handleCancelSaveProduct = this.handleCancelSaveProduct.bind(this);

        this.handleChangeFlagProductSave = this.handleChangeFlagProductSave.bind(this);
        this.handleChangeCatIdSave = this.handleChangeCatIdSave.bind(this);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);

        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.onImportFile = this.onImportFile.bind(this);
    }

    onChangeFildProduct(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async showModal(record) {
        var url_img_main = ip + "/ProductImg/ImgProduct/main/" + record.codeId;
        const img_main = await (await axios.get(url_img_main)).data;
        this.setState({
            fileListMainEdit: img_main,
            ImgMainEdit: img_main,
        });

        var url_img_detail = ip + "/ProductImg/ImgProduct/detail/" + record.codeId;
        const img_detail = await (await axios.get(url_img_detail)).data;
        this.setState({
            fileListDetailEdit: img_detail,
            ImgDetailEdit: img_detail,
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

        console.log(this.state.fileListMainEdit, " fileListMainEdit");
        console.log(this.state.ImgMainEdit, " ImgMainEdit");



        // this.setState({
        //     isModalVisible: true,
        //     productEdit: record,
        //     productId: record.productId,
        //     codeId: record.codeId,
        //     priceProductId: record.priceProductId,
        //     barCode: record.barCode,
        //     productCode: record.productCode,
        //     unit: record.unit,
        //     brand: record.brand,
        //     name: record.name,
        //     size: record.size,
        //     flagProduct: record.flagProduct,
        //     color: record.color,
        //     catId: record.catId,
        //     direction: record.direction,
        //     caution: record.caution,
        //     keepespreserve: record.keepespreserve,
        //     firstaidprocedure: record.firstaidprocedure,
        //     detail: record.detail,
        //     level1: record.level1,
        //     level2: record.level2,
        //     level3: record.level3,
        //     level4: record.level4,
        //     level5: record.level5,
        //     level6: record.level6,
        //     level7: record.level7,
        //     level8: record.level8,
        //     level9: record.level9,
        //     level10: record.level10,
        //     level11: record.level11,
        //     level12: record.level12,
        //     level13: record.level13,
        //     level14: record.level14,
        //     level15: record.level15,
        //     enduser: record.enduser,
        // });
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
        console.log(this.state.ImgMainEdit, " this.state.ImgMainEdit");
        console.log(this.state.ImgDetailEdit, " this.state.ImgDetailEdit");

        if ((this.state.ImgMainEdit.length !== 0) && (this.state.ImgMainEdit[0]?.flag !== "Removed")) {
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
                imgMainEdit: this.state.ImgMainEdit,
                imgDetailEdit: this.state.ImgDetailEdit
            }

            var url_update_product_price = ip + "/Product/update/product/admin/" + this.state.codeId;
            const updateproductprice = await (await axios.put(url_update_product_price, dataSave)).data;

            if (updateproductprice) {
                this.setState({ statusButtonEdit: false, productstatus: true });
                swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
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
                        productEdit: [],
                        ImgMainEdit: [],
                        ImgDetailEdit: [],
                        fileListMainEdit: [],
                        fileListDetailEdit: []
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
        } else {
            swal("Warning!", "กรุณาเลือกรูปภาพหลัก", "warning").then((value) => {
            });
        }
    };

    async handleSaveProduct() {
        console.log(this.state.ImgMainSave, " this.state.ImgMainEdit");
        console.log(this.state.ImgDetailSave, " this.state.ImgDetailEdit");

        if ((this.state.ImgMainSave.length !== 0) && (this.state.ImgMainSave[0]?.flag !== "Removed")) {
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
                priceProduceStatus: "A",
                imgMainSave: this.state.ImgMainSave,
                imgDetailSave: this.state.ImgDetailSave
            }

            var url_create_product_price = ip + "/Product/create/admin/";
            const createproductprice = await (await axios.post(url_create_product_price, dataSave)).data;
            console.log(createproductprice, " createproductprice");
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
                        enduserSave: '',
                        ImgMainSave: [],
                        ImgDetailSave: [],
                        fileListMainSave: [],
                        fileListDetailSave: []
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
        } else {
            swal("Warning!", "กรุณาเลือกรูปภาพหลัก", "warning").then((value) => {
            });
        }
    };

    async handleDeleteProduct(record) {
        // this.setState({ statusButtonEdit: true });
        const productId = record.productId;
        const priceProductId = record.priceProductId;
        const codeId = record.codeId;
        // console.log(productId, " productId");
        // console.log(priceProductId, " priceProductId");
        var url_delete_product = ip + "/Product/delete/" + productId + "/" + priceProductId + "/" + codeId;
        const deleteproduct = await (await axios.delete(url_delete_product)).data;
        if (deleteproduct !== null) {
            this.setState({ statusButtonEdit: false, productstatus: true });
            var url_product = ip + "/Product/find/all/admin";
            const product = await (await axios.get(url_product)).data;
            this.setState({
                product: product,
                productstatus: false
            });
        } else {

        }
    }

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
            productEdit: [],
            fileListMainEdit: [],
            ImgMainEdit: [],
            fileListDetailEdit: [],
            ImgDetailEdit: []
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
            enduserSave: '',
            fileListMainSave: [],
            ImgMainSave: [],
            fileListDetailSave: [],
            ImgDetailSave: []
        });
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

    handlePreviewFile = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleCancelimage() {
        this.setState({ previewVisible: false });
    };

    async handleChangeListMainEdit(fileList) {
        const imgMainEdit = this.state.ImgMainEdit;
        var state = 0;
        if (fileList.file.status === "uploading") {
            if (imgMainEdit.length === 0 && uuidMain !== fileList.file.uid && state === 0) {
                uuidMain = fileList.file.uid;
                state += 1;
                const addData = {
                    uid: fileList.file.uid,
                    imgId: 0,
                    seq: 0,
                    name: this.state.codeId,
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    flag: "Insert",
                    img: await getBase64(fileList.file.originFileObj),
                    type: fileList.file.type
                }

                imgMainEdit.push(addData);
            } else if (uuidMain !== fileList.file.uid) {
                uuidMain = fileList.file.uid;
                imgMainEdit[0].img = await getBase64(fileList.file.originFileObj);
                imgMainEdit[0].type = fileList.file.type;
                imgMainEdit[0].flag = "Edit";
            }
        } else if (fileList.file.status === "removed") {
            if (imgMainEdit[0].flag === "Insert") {
                imgMainEdit.splice(0, 1);
            } else {
                imgMainEdit[0].img = "";
                imgMainEdit[0].flag = "Removed";
            }
        }

        this.setState({ fileListMainEdit: fileList.fileList });
    };

    async handleChangeListDetailEdit(fileList) {
        const imgDetailEdit = this.state.ImgDetailEdit;
        var state = 0;
        if (fileList.file.status === "uploading") {
            const remove = await imgDetailEdit.filter((item) => item.flag === "Removed");
            if (remove.length > 0) {
                imgDetailEdit.forEach(async (imgDetail, index) => {
                    if (imgDetail.flag === "Removed" && uuid !== fileList.file.uid && state === 0) {
                        uuid = fileList.file.uid;
                        state += 1;
                        imgDetail.uid = fileList.file.uid;
                        imgDetail.img = await getBase64(fileList.file.originFileObj);
                        imgDetail.type = fileList.file.type;
                        imgDetail.flag = "Edit";
                        return;
                    } else {
                        return;
                    }
                });
            } else if (remove.length === 0 && uuid !== fileList.file.uid) {
                uuid = fileList.file.uid;
                const addData = {
                    uid: fileList.file.uid,
                    imgId: 0,
                    seq: 0,
                    name: this.state.codeId,
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    flag: "Insert",
                    img: await getBase64(fileList.file.originFileObj),
                    type: fileList.file.type
                }

                imgDetailEdit.push(addData);
            }
        } else if (fileList.file.status === "removed") {
            imgDetailEdit.forEach((imgDetail, index) => {
                if (imgDetail.uid === fileList.file.uid) {
                    if (imgDetail.flag === "Insert") {
                        imgDetailEdit.splice(index, 1);
                    } else {
                        imgDetail.img = "";
                        imgDetail.flag = "Removed";
                    }
                }
            });
        }

        this.setState({ fileListDetailEdit: fileList.fileList });
    };

    async handleChangeListMainSave(fileList) {
        const imgMainSave = this.state.ImgMainSave;
        var state = 0;
        if (fileList.file.status === "uploading") {
            if (imgMainSave.length === 0 && uuidMainSave !== fileList.file.uid && state === 0) {
                uuidMainSave = fileList.file.uid;
                state += 1;
                const addData = {
                    uid: fileList.file.uid,
                    imgId: 0,
                    seq: 0,
                    name: "",
                    status: 'done',
                    url: "",
                    flag: "Insert",
                    img: await getBase64(fileList.file.originFileObj),
                    type: fileList.file.type
                }

                imgMainSave.push(addData);
            }
        } else if (fileList.file.status === "removed") {
            imgMainSave.splice(0, 1);
        }
        //console.log(this.state.ImgMainSave, " imgDetailSave");
        this.setState({ fileListMainSave: fileList.fileList });
    };

    handleChangeFile(fileList) {
        if (fileList.file.status === "uploading") {
            this.setState({ ststusButtomFile: true, statusButtonEdit: true });
            if (fileList.fileList.length > 0) {
                readXlsxFile(fileList.fileList[0]?.originFileObj).then((rows) => {
                    var count_data = rows.length - 1;
                    var dataImport = [];
                    if (count_data >= 1) {
                        for (let i = 1; i <= count_data; i++) {
                            var data = {
                                [rows[0][0]]: rows[i][0],
                                [rows[0][1]]: rows[i][1],
                                [rows[0][2]]: rows[i][2],
                                [rows[0][3]]: rows[i][3],
                                [rows[0][4]]: rows[i][4],
                                [rows[0][5]]: rows[i][5],
                                [rows[0][6]]: rows[i][6],
                                [rows[0][7]]: rows[i][7],
                                [rows[0][8]]: rows[i][8],
                                [rows[0][9]]: rows[i][9],
                                [rows[0][10]]: rows[i][10],
                                [rows[0][11]]: rows[i][11],
                                [rows[0][12]]: rows[i][12],
                                [rows[0][13]]: rows[i][13],
                                [rows[0][14]]: rows[i][14],
                                [rows[0][15]]: rows[i][15],
                                [rows[0][16]]: rows[i][16],
                                [rows[0][17]]: rows[i][17],
                                [rows[0][18]]: rows[i][18],
                                [rows[0][19]]: rows[i][19],
                                [rows[0][20]]: rows[i][20],
                                [rows[0][21]]: rows[i][21],
                                [rows[0][22]]: rows[i][22],
                                [rows[0][23]]: rows[i][23],
                                [rows[0][24]]: rows[i][24],
                                [rows[0][25]]: rows[i][25],
                                [rows[0][26]]: rows[i][26],
                                [rows[0][27]]: rows[i][27],
                                [rows[0][28]]: rows[i][28],
                                [rows[0][29]]: rows[i][29],
                                priceProduceStatus: "A",
                                view: 0,
                                productStatus: "A",
                                // priceProductId: ((i === 1) || (i === 3) ? 100 : null)
                            }

                            dataImport.push(data);
                        }

                        this.setState({ statusButtonEdit: false, dataImportFile: dataImport });
                        this.setState({ fileList: fileList.fileList });
                    } else {
                        this.setState({ statusButtonEdit: false });
                        swal("Warning!", "ไม่พบข้อมูลสินค้าที่จะ Import", "warning").then((value) => {
                        });
                    }
                })
            }
        } else if (fileList.file.status === "removed") {
            this.setState({ ststusButtomFile: false });
        }
    }

    async onImportFile() {
        if (this.state.dataImportFile.length > 0) {
            this.setState({ statusButtonEdit: true });
            var url_product = ip + "/Product/find/all/admin";
            var url_import_product = ip + "/Product/create/import/admin/";
            const importproduct = await (await axios.post(url_import_product, this.state.dataImportFile)).data;
            console.log(importproduct, " importproduct")
            if (importproduct.length <= 0) {
                this.setState({ statusButtonEdit: false, productstatus: true });
                swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
                    this.setState({
                        dataImportFile: [],
                        ststusButtomFile: false,
                        previewImage: '',
                        previewVisible: false,
                        previewTitle: '',
                        fileList: []
                    });
                });

                const product = await (await axios.get(url_product)).data;
                this.setState({
                    product: product,
                    productstatus: false
                });

            } else {
                this.setState({
                    dataImportFile: [],
                    ststusButtomFile: false,
                    statusButtonEdit: false,
                    previewImage: '',
                    previewVisible: false,
                    productstatus: true,
                    previewTitle: '',
                    fileList: []
                });

                const product = await (await axios.get(url_product)).data;
                this.setState({
                    product: product,
                    productstatus: false
                });
                swal("Warning!", "ข้อมูลบางสินค้าไม่สามารถ Import ข้อมูลได้ กรุณาลองใหม่", "warning").then((value) => {
                    // console.log(importproduct, " importproduct");
                    const className = 'class-name-for-style',
                        filename = 'ProductImportError',
                        fields = {
                            "barCode": "barCode",
                            "productCode": "productCode",
                            "name": "name",
                            "size": "size",
                            "color": "color",
                            "unit": "unit",
                            "brand": "brand",
                            "detail": "detail",
                            "direction": "direction",
                            "caution": "caution",
                            "keepespreserve": "keepespreserve",
                            "firstaidprocedure": "firstaidprocedure",
                            "flagProduct": "flagProduct",
                            "catId": "catId",
                            "enduser": "enduser",
                            "level1": "level1",
                            "level2": "level2",
                            "level3": "level3",
                            "level4": "level4",
                            "level5": "level5",
                            "level6": "level6",
                            "level7": "level7",
                            "level8": "level8",
                            "level9": "level9",
                            "level10": "level10",
                            "level11": "level11",
                            "level12": "level12",
                            "level13": "level13",
                            "level14": "level14",
                            "level15": "level15",
                        },
                        style = { padding: "5px" },
                        data = importproduct,
                        text = "Convert Json to Excel";
                    
                    <JsonToCsv
                        data={data}
                        className={className}
                        filename={filename}
                        fields={fields}
                        style={style}
                        text={text}
                    />

                    const { saveAsCsv } = useJsonToCsv();
                    saveAsCsv({ data, fields, filename })

                });
            }
        } else {
            swal("Warning!", "ไม่พบข้อมูลข้อมูลที่จะ Import", "warning").then((value) => {
                //console.log(importproduct, " importproduct");
            });
        }
    }

    async handleChangeListDetailSave(fileList) {
        const imgDetailSave = this.state.ImgDetailSave;
        // var state = 0;
        if (fileList.file.status === "uploading") {
            if (uuidSave !== fileList.file.uid) {
                uuidSave = fileList.file.uid;
                // state += 1;
                const addData = {
                    uid: fileList.file.uid,
                    imgId: 0,
                    seq: 0,
                    name: "",
                    status: 'done',
                    url: "",
                    flag: "Insert",
                    img: await getBase64(fileList.file.originFileObj),
                    type: fileList.file.type
                }
                imgDetailSave.push(addData);
            }
        } else if (fileList.file.status === "removed") {
            this.setState({
                ImgDetailSave: imgDetailSave.filter((item) => item.uid !== fileList.file.uid),
            });
        }

        //console.log(this.state.ImgDetailSave, " imgDetailSave");
        this.setState({ fileListDetailSave: fileList.fileList });
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

    async componentDidMount() {
        var url_product = ip + "/Product/find/all/admin";
        const product = await (await axios.get(url_product)).data;
        this.setState({
            product: product,
            productstatus: false
        });

        console.log(product, " product")

        var url_catalog = ip + "/Catalog/find/all";
        const catalog = await (await axios.get(url_catalog)).data;
        this.setState({
            catalog: catalog
        });

        var catalogFilter = [];
        await catalog.forEach(async (catalog, index) => {
            var filter = { text: catalog.catName, value: catalog.catName }
            catalogFilter.push(filter);
        });

        this.setState({
            producttable: [
                {
                    title: 'รูปภาพ',
                    dataIndex: 'img',
                    key: 'img',
                    render: (record) =>
                        <>
                            {
                                (record === null) ?
                                    <Image src={imgm} alt="imgProfile" width={"100%"} />
                                    :
                                    <Image src={record} alt="imgProfile" width={"100%"} />
                            }
                        </>,
                    width: 180
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
                    ...this.getColumnSearchProps('productCode'),

                },
                {
                    title: 'ชื่อสินค้า',
                    dataIndex: 'name',
                    key: 'name',
                    ...this.getColumnSearchProps('name'),
                },
                {
                    title: 'หน่วย',
                    dataIndex: 'unit',
                    key: 'unit',
                    filters: [
                        {
                            text: 'ใบ',
                            value: 'ใบ',
                        },
                        {
                            text: 'กล่อง',
                            value: 'กล่อง',
                        },
                        {
                            text: 'ลัง',
                            value: 'ลัง',
                        },
                        {
                            text: 'แผ่น',
                            value: 'แผ่น',
                        },
                    ],
                    onFilter: (value, record) => record.unit.indexOf(value) === 0,
                },
                {
                    title: 'หมวดหมู่',
                    dataIndex: 'catName',
                    key: 'catName',
                    filters: catalogFilter,
                    onFilter: (value, record) => record.catName.indexOf(value) === 0,
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
                    ...this.getColumnSearchProps('color'),
                },
                {
                    title: 'วันที่',
                    dataIndex: 'createDate',
                    key: 'createDate',
                    ...this.getColumnSearchProps('createDate'),
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
                    render: (record) =>
                        <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteProduct(record)}>
                            <div><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
                        </Popconfirm>,
                },
            ]
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
        const uploadButton = (
            <div>
                <PlusOutlined style={{ fontSize: "20px", color: '#DA213D' }} />
                <div style={{ marginTop: 8, color: '#DA213D' }}>เพิ่มรูปภาพ</div>
            </div>
        );
        console.log(this.state.ststusButtomFile, " ststusButtomFile");
        // const uploadButton1 = (
        //     <div>
        //         <PlusOutlined style={{ fontSize: "20px", color: '#DA213D' }} />
        //         <div style={{ marginTop: 8, color: '#DA213D' }}>เพิ่มรูปภาพ</div>
        //     </div>
        // );
        return (
            <Container fluid>
                <Spin spinning={this.state.statusButtonEdit} size="large">
                    <Row id="product">
                        <Col xs={1} md={1} xl={1} id="icon-product">
                            <FaProductHunt style={{ fontSize: '400%', color: '#DA213D' }} />
                        </Col>
                        <Col xs={5} md={5} xl={5} id="page-product">สินค้า</Col>
                    </Row>
                    <Row id="input-search">
                        <Col md={4} xl={3} id="col">
                            <Button id="button-addproduct" onClick={this.showModalSaveProduct}>เพิ่มรายการสินค้า</Button>
                        </Col>
                        <Col md={4} xl={3} id="col">
                            <Button id="button-addproduct-import" hidden={!this.state.ststusButtomFile} onClick={this.onImportFile}>นำเข้ารายการสินค้า</Button>
                            <Upload
                                action={ip + "/UserProfile/UploadImg"}
                                // listType= "picture"
                                onPreview={this.handlePreviewFile}
                                onChange={this.handleChangeFile}
                                fileList={this.state.fileList}
                            >
                                <Button id="button-addproduct" hidden={this.state.ststusButtomFile}>เพิ่มไฟล์รายการสินค้า</Button>
                            </Upload>
                        </Col>
                        <Col md={4} xl={3} id="col">
                            <a href="http://128.199.198.10/API/excel/TemplateProductImport.xlsx" rel="noopener noreferrer" download="TemplateProductImport.xlsx">
                                <Button id="button-addproduct-eximport">ตัวอย่างไฟล์รายการสินค้า</Button>
                            </a>
                        </Col>
                    </Row>
                    <Row id="input-search">
                        <Table
                            columns={this.state.producttable}
                            dataSource={this.state.product}
                            loading={this.state.productstatus}
                            scroll={{ x: 1500 }}
                            // align={{center}}
                            pagination={{ pageSizeOptions: ['30', '40'], showSizeChanger: true }}
                            onChange={onChange}
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
                                        <Col md={6} xl={6}>ยี่ห้อ :</Col>
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
                                            <Select labelInValue value={{ value: ('' + this.state.flagProduct) }} onChange={this.handleChangeFlagProductEdit} id="input" style={{ width: "100%" }}>
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
                                            <Select labelInValue value={{ value: this.state.catId }} onChange={this.handleChangeCatIdEdit} id="input" name="catId" style={{ width: "100%" }}>
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

                            <Row id="header-img">รูปภาพหลัก</Row>
                            <Row id="add-img">
                                <Upload
                                    action={ip + "/UserProfile/UploadImg"}
                                    listType="picture-card"
                                    fileList={this.state.fileListMainEdit}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeListMainEdit}
                                >
                                    {this.state.fileListMainEdit.length >= 1 ? null : uploadButton}
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
                            <Row id="header-img">รูปภาพรอง</Row>
                            <Row id="add-img">
                                <Upload
                                    action={ip + "/UserProfile/UploadImg"}
                                    listType="picture-card"
                                    fileList={this.state.fileListDetailEdit}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeListDetailEdit}
                                >
                                    {this.state.fileListDetailEdit.length >= 4 ? null : uploadButton}
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
                                        <Col md={6} xl={6}>ยี่ห้อ :</Col>
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
                                            <Select labelInValue value={{ value: ('' + this.state.flagProductSave) }} onChange={this.handleChangeFlagProductSave} id="input" style={{ width: "100%" }}>
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
                                            <Select labelInValue value={{ value: this.state.catIdSave }} onChange={this.handleChangeCatIdSave} id="input" name="catIdSave" style={{ width: "100%" }}>
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

                            <Row id="header-img">รูปภาพหลัก</Row>
                            <Row id="add-img">
                                <Upload
                                    action={ip + "/UserProfile/UploadImg"}
                                    listType="picture-card"
                                    fileList={this.state.fileListMainSave}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeListMainSave}
                                >
                                    {this.state.fileListMainSave.length >= 1 ? null : uploadButton}
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
                            <Row id="header-img">รูปภาพรอง</Row>
                            <Row id="add-img">
                                <Upload
                                    action={ip + "/UserProfile/UploadImg"}
                                    listType="picture-card"
                                    fileList={this.state.fileListDetailSave}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeListDetailSave}
                                >
                                    {this.state.fileListDetailSave.length >= 4 ? null : uploadButton}
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
                </Spin>
            </Container>
        )
    }
}