import React, { Component } from "react";
// import { BsFillGrid1X2Fill} from 'react-icons/bs';
import { FaProductHunt } from "react-icons/fa";
import { Row, Col, Input, Select, Button } from 'antd';
import { Container } from 'react-bootstrap';
import { PrinterOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import '../css/Product.css';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: []
        };
    }

    render() {
        return (
            <Container fluid>
               <Row id="product">
                    <Col xs={1} md={1} xl={1} id="icon">
                        <FaProductHunt style={{fontSize: '400%', color: '#DA213D' }}/>
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
                    <Col xs={2} md={2} xl={2}><div>เรียงลำดับตาม</div></Col>
                    <Col xs={2} md={2} xl={2} id="col">
                        <Select defaultValue="วันที่" style={{ width: 80 }} onChange={handleChange}>
                            <Option value="jack">วันที่</Option>
                            <Option value="lucy">ชื่อ</Option>
                        </Select>
                    </Col>
                    <Col xs={4} md={4} xl={4} id="col">
                        <Button id="button-print" icon={<PrinterOutlined />}>ปริ้นรายการสินค้า</Button>
                    </Col>
                    <Col xs={4} md={4} xl={4} id="col">
                        <Button id="button-addproduct" icon={<AppstoreAddOutlined />}>เพิ่มรายการสินค้า</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}