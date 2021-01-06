import React, { Component } from "react";
import { FaProductHunt } from "react-icons/fa";
import { Row, Col, Input, Select, Button, Table, Switch, Modal, Popconfirm, Upload } from 'antd';
import { Container } from 'react-bootstrap';
import { PrinterTwoTone, AppstoreAddOutlined, CloseOutlined, CheckOutlined, PlusOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import '../css/Product.css';
import Form from "antd/lib/form/Form";

const { Option } = Select;
const { TextArea } = Input;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleChange1(value) {
    console.log(`selected ${value}`);
}

const data = [
    {
        key: '1',
        barcode: '8859653400017',
        codeId: 'MRWG30440810',
        name: 'แผ่นสเตนเลสสี / ผิวเงามิลเลอร์',
        unit: 'กล่อง',
        catalog: 'ใบตัดเหล็ก',
        size: '1220 x 2440 x 1.0 มม.',
        color: 'น้ำตาล',
        date: '40-40-4400',
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
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],
            isModalVisible: false,
            previewImage: '',
            previewTitle: '', 
            fileList : [
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
                ellipsis: true,
            },
            {
                title: 'แสดง',
                dataIndex: 'switcher',
                key: 'switcher',
                render: () =>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        size="small"
                        defaultChecked
                    />,
            },
            {
                title: 'บาร์โค้ด',
                dataIndex: 'barcode',
                key: 'barcode',
                ellipsis: true,
                
            },
            {
                title: 'รหัสสินค้า',
                dataIndex: 'codeId',
                key: 'codeId',
                ellipsis: true,
                
            },
            {
                title: 'ชื่อสินค้า',
                dataIndex: 'name',
                key: 'name',
                ellipsis: true,
            },
            {
                title: 'หน่วย',
                dataIndex: 'unit',
                key: 'unit',
                ellipsis: true,
                
            },
            {
                title: 'หมวดหมู่',
                dataIndex: 'catalog',
                key: 'catalog',
                ellipsis: true,
                
            },
            {
                title: 'ขนาด',
                dataIndex: 'size',
                key: 'size',
                ellipsis: true,
            },
            {
                title: 'สี',
                dataIndex: 'color',
                key: 'color',
                ellipsis: true,
                
            },
            {
                title: 'วันที่',
                dataIndex: 'date',
                key: 'date',
                ellipsis: true,
                
            },
            {
                title: '',
                dataIndex: 'edit',
                key: 'edit',
                width: 45,
                render: () =>
                    <>
                        <div type="primary" onClick={this.showModal}><EditTwoTone twoToneColor="#63549B"/></div>
                    </>,
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                width: 45,
                render: () =>
                    <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
                        <div><DeleteTwoTone  twoToneColor="#DA213D"/></div>
                    </Popconfirm>,
            },
        ]

        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.handleCancelimage = this.handleCancelimage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleChangeimage = this.handleChangeimage.bind(this);

    }
    
    showModal() {
        this.setState({ isModalVisible: true});
    };

    handleOk() {
        this.setState({ isModalVisible: false });
    };

    handleCancel() {
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
    handleChangeimage(fileList){
        this.setState({ ...fileList });
    };
    
    render() {
        const uploadButton = (
        <div>
            <PlusOutlined style={{fontSize: "20px", color: '#DA213D'}}/>
            <div style={{ marginTop: 8, color: '#DA213D' }}>เพิ่มรูปภาพ</div>
        </div>
    );
        return (
            <Container fluid>
                <Row id="product">
                    <Col xs={1} md={1} xl={1} id="icon">
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
                    <Col md={3} xl={3}><div>เรียงลำดับตาม</div></Col>
                    <Col md={3} xl={3} id="col">
                        <Select defaultValue="วันที่" style={{ width: 80 }} onChange={handleChange}>
                            <Option value="jack">วันที่</Option>
                            <Option value="lucy">ชื่อ</Option>
                        </Select>
                    </Col>
                    <Col md={5} xl={4} id="col">
                        <Button id="button-print" icon={<PrinterTwoTone twoToneColor="#DA213D"/>}>ปริ้นรายการสินค้า</Button>
                    </Col>
                    <Col md={5} xl={4} id="col">
                        <Button id="button-addproduct" icon={<AppstoreAddOutlined />}>เพิ่มรายการสินค้า</Button>
                    </Col>
                </Row>
                <Row id="input-search">
                    <Table columns={this.product} dataSource={data} />
                </Row>

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
                                    <Col md={12} xl={12}><Input id="input"/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>รหัสสินค้า :</Col>
                                    <Col md={12} xl={12}><Input id="input"/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>หน่วย :</Col>
                                    <Col md={12} xl={12}><Input id="input"/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ชื่อสินค้า :</Col>
                                    <Col md={12} xl={12}><Input id="input"/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ขนาด :</Col>
                                    <Col md={12} xl={12}><Input id="input"/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>สี :</Col>
                                    <Col md={12} xl={12}><Input id="input"/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>หมวดหมู่ :</Col>
                                    <Col md={12} xl={12}>
                                        <Select defaultValue="หมวดหมู่"  onChange={handleChange1} id="input">
                                            <Option value="jack">อุปกรณ์เครืองมือช่าง</Option>
                                            <Option value="lucy">แผ่นแสตนเลส</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>วิธีการใช้งาน :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input"/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ข้อควรระวัง :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input"/></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row id="add-product">
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>วิธีเก็บรักษา :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input"/></Col>
                                </Row>
                            </Col>
                            <Col md={12} xl={12}>
                                <Row>
                                    <Col md={6} xl={6}>ขั้นตอนการปฐมพยาบาล :</Col>
                                    <Col md={12} xl={12}><TextArea rows={2} id="input"/></Col>
                                </Row>
                            </Col>
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
                    </Form>
                </Modal>
            </Container>
        )
    }
}