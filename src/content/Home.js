import React, { Component } from "react";
import { BsFillGrid1X2Fill} from 'react-icons/bs';
import { Col, Row, Table, Tag, Popconfirm, Statistic,} from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Home.css';
import ReactApexChart from "react-apexcharts";

const columns = [
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'name',
      key: 'name',
      render: text => <div>{text}</div>,
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'E - mail',
      dataIndex: 'mail',
      key: 'mail',
      ellipsis: true,
    },
    {
      title: 'เรื่อง',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 3 ? 'geekblue' : 'green';
            if (tag === 'สั่งซื้อสินค้า') {
              color = 'red';
            }
            if (tag === 'สมัครตัวแทน') {
                color = 'green';
              }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
        title: 'ข้อความ',
        dataIndex: 'message',
        key: 'message',
        ellipsis: true,
      },
      {
        title: '',
        dataIndex: 'confirm',
        key: 'confirm',
        render: () => <div id="confirm">อนุมัติ</div>,
      },
    {
        title: '',
        dataIndex: '',
        key: 'x',
        render: () => 
        <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
          <div id="delete" href="#">ลบรายการ</div>
        </Popconfirm>,
      },
  ];

  const interestproduct = [
    {
      title: 'รหัสสินค้า',
      dataIndex: 'codeId',
      key: 'codeId',
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'รูปภาพ',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => 
      <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
        <div id="delete" href="#">ลบรายการ</div>
      </Popconfirm>,
    },
  ]

  const bestseller = [
    {
      title: 'รหัสสินค้า',
      dataIndex: 'codeId',
      key: 'codeId',
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'รูปภาพ',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => 
      <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก">
        <div id="delete" href="#">ลบรายการ</div>
      </Popconfirm>,
    },
  ]

  const data = [
    {
      key: '1',
      name: 'John Brown',
      telephone: 32,
      mail: 's5902041620113@email.kmutnb.ac.th',
      tags: [ 'สั่งซื้อสินค้า'],
      message: 'London No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      telephone: 32,
      mail: 's5902041620113@email.kmutnb.ac.th',
      tags: [ 'สมัครตัวแทน'],
      message: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      telephone: 32,
      mail: 's5902041620113@email.kmutnb.ac.th',
      tags: [ 'สอบถามข้อมูลเพิ่มเติม'],
      message: 'London No. 1 Lake Park',
    },
  ];
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            user: [],

            series: [{
              data: [400, 430, 448, 470, 540]
            }],
            options: {
              chart: {
                type: 'bar',
                height: 350
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                }
              },
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy'],
              }
            },
          
        };
    }
  
    render(){
        return (
            <Container fluid>
                <Row id="home">
                    <Col xs={1} md={1} xl={1} id="icon">
                        <BsFillGrid1X2Fill style={{fontSize: '200%', color: '#DA213D' }}/>
                    </Col>
                    <Col xs={5} md={5} xl={5} id="page-home">
                        หน้าหลัก
                    </Col>
                </Row> 

                <Row id="row2">
                    <Col xs={24} md={24} xl={15} id="chart">
                        <Col xs={24} md={24} xl={24}>สินค้าที่ผู้คนสนใจ
                            <Col>
                                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                            </Col>
                        </Col>
                    </Col>
                    
                    <Col xs={24} md={24} xl={8} id="visit">
                        <Col xs={24} md={24} xl={24} id="visit-head">จำนวนการเข้าชม</Col>
                        <Row id="row-visit1"> 
                            <Col xs={1} md={1} xl={1} id="visit-border"></Col>
                            <Col xs={22} md={22} xl={22} id="visit-member">
                                <Col>
                                  <Statistic id="visit-nummember" title="สมาชิก" value={112893} />
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1} md={1} xl={1} id="visit-border1"></Col>
                            <Col xs={22} md={22} xl={22} id="visit-member1">
                                <Col>
                                  <Statistic title="บุคคลทั่วไป" value={112893} />
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row id="interest-product">
                  <Col md={24} xl={24}>
                    <Col xs={24} md={24} xl={24} id="interestedproduct">สินค้าที่ผู้คนสนใจ</Col>
                      {/* <Col xs={24} md={24} xl={24} id="input-search">
                        <Input style={{ width: '40%' }} placeholder="CodeId" />
                        <Button id="btnadd-popularproduct">เพิ่มรายการ</Button>
                      </Col> */}
                      <Col xs={24} md={24} xl={24}>
                        <Table columns={interestproduct} dataSource={data} />
                      </Col>
                  </Col>
                </Row>

                <Row id="interest-product">
                  <Col md={24} xl={24}>
                    <Col xs={24} md={24} xl={24} id="interestedproduct">สินค้าขายดี</Col>
                      {/* <Col xs={24} md={24} xl={24} id="input-search">
                        <Input style={{ width: '40%' }} placeholder="CodeId" />
                        <Button id="btnadd-popularproduct">เพิ่มรายการ</Button>
                      </Col> */}
                      <Col xs={24} md={24} xl={24}>
                        <Table columns={bestseller} dataSource={data} />
                      </Col>
                  </Col>
                </Row>

                <Row>
                  <Col  id="row3">ข้อความจากผู้ติดต่อ</Col>
                  <Row id="interest-product1">
                  <Table columns={columns} dataSource={data} />
                  </Row>
                </Row>
            </Container>
        )
    }
}