import React, { Component } from "react";
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { Col, Row, Table, Tag, Popconfirm, Statistic, AutoComplete, Button } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Home.css';
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import swal from 'sweetalert';

var ip = "http://localhost:5000";
// var ip_img_profile = "http://128.199.198.10/API/profile/";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: [],
      contact: [],
      producthit: [],
      productnew: [],
      productnewstatus: true,
      
      optionsnew: [],
      optionsnewselect: null,
      searchnewstatus: false,

      producthitstatus: true,
      optionshit: [],
      optionshitselect: null,
      searchhitstatus: false,

      contactstatus: true,

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

    this.interestproduct = [
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
        dataIndex: 'namecat',
        key: 'namecat',
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
        render: (record) =>
          <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteNew(record.productId)}>
            <div id="delete" href="#">ลบรายการ</div>
          </Popconfirm>,
      },
    ];

    this.bestseller = [
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
        dataIndex: 'namecat',
        key: 'namecats',
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
        render: (record) =>
          <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteHit(record.productId)}>
            <div id="delete" href="#">ลบรายการ</div>
          </Popconfirm>,
      },
    ];

    this.columnscontact = [
      {
        title: 'ชื่อ - นามสกุล',
        dataIndex: 'name',
        key: 'name',
        render: text => <div>{text}</div>,
      },
      {
        title: 'เบอร์โทรศัพท์',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'E - mail',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
      },
      {
        title: 'เรื่อง',
        key: 'type',
        dataIndex: 'type',
        render: tags => (
          <>
            {
              (tags === "สมัครตัวแทนจำหน่าย") ?
                <Tag color="green" key="1">
                  {tags.toUpperCase()}
                </Tag>
                : (tags === "สอบถามข้อมูลเพิ่มเติม") ?
                  <Tag color="geekblue" key="2">
                    {tags.toUpperCase()}
                  </Tag>
                  : (tags === "สั่งซื้อสินค้า") ?
                    <Tag color="red" key="3">
                      {tags.toUpperCase()}
                    </Tag>
                    :
                    <></>
            }
          </>
        ),
      },
      {
        title: 'ข้อความ',
        dataIndex: 'msg',
        key: 'msg',
        ellipsis: true,
      },
      {
        title: '',
        dataIndex: 'acceptStatus',
        key: 'acceptStatus',
        render: accept => (
          <>
            {
              (accept === "A") ?
                <Tag color="green" key="1">{"อนุมัติ"}</Tag>
                : (accept === "N") ?
                  <Tag color="geekblue" key="2">{"รอดำเนินการ"}</Tag>
                  :
                  <></>
            }
          </>
        ),
      },
      {
        title: '',
        dataIndex: '',
        key: 'x',
        render: (record) =>
          <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteContact(record.contactId)}>
            <div id="delete" href="#">ลบรายการ</div>
          </Popconfirm>,
      },
    ];


    this.onSearchFildNew = this.onSearchFildNew.bind(this);
    this.onSelectNew = this.onSelectNew.bind(this);
    this.onChangeNew = this.onChangeNew.bind(this);
    this.onSaveNew = this.onSaveNew.bind(this);
    this.handleDeleteNew = this.handleDeleteNew.bind(this);

    this.onSearchFildHit = this.onSearchFildHit.bind(this);
    this.onSelectHit = this.onSelectHit.bind(this);
    this.onChangeHit = this.onChangeHit.bind(this);
    this.onSaveHit = this.onSaveHit.bind(this);
    this.handleDeleteHit = this.handleDeleteHit.bind(this);

    this.handleDeleteContact = this.handleDeleteContact.bind(this);
  }

  async componentDidMount() {
    var url_contact = ip + "/Contact/find/all";
    const contact = await (await axios.get(url_contact)).data;
    this.setState({
      contact: contact,
      contactstatus: false
    });

    var url_product_hit = ip + "/ProductShow/find/hit";
    const producthit = await (await axios.get(url_product_hit)).data;
    this.setState({
      producthit: producthit,
      producthitstatus: false,
      searchhitstatus: (producthit.length >=6) ? true : false
    });

    var url_product_new = ip + "/ProductShow/find/new";
    const productnew = await (await axios.get(url_product_new)).data;
    this.setState({
      productnew: productnew,
      productnewstatus: false,
      searchnewstatus: (productnew.length >=6) ? true : false
    });
  }

  async onSearchFildNew(value) {
    if (value !== "") {
      var url_wordsearch_new = ip + "/Product/find/wordsearchproductshow/" + value;
      const wordsearchnew = await (await axios.get(url_wordsearch_new)).data;
      this.setState({
        optionsnew: wordsearchnew
      });
    } else {
      this.setState({
        optionsnew: []
      });
    }
  }

  async onSearchFildHit(value) {
    if (value !== "") {
      var url_wordsearch_hit = ip + "/Product/find/wordsearchproductshow/" + value;
      const wordsearchhit = await (await axios.get(url_wordsearch_hit)).data;
      this.setState({
        optionshit: wordsearchhit
      });
    } else {
      this.setState({
        optionshit: []
      });
    }
  }

  onSelectNew(value, option) {
    this.setState({
      optionsnewselect: option
    });
  }

  onSelectHit(value, option) {
    this.setState({
      optionshitselect: option
    });
  }

  onChangeNew(value, label) {
    if (this.state.optionsnewselect !== null) {
      this.setState({
        optionsnewselect: null
      });
    }
  }

  onChangeHit(value, label) {
    if (this.state.optionshitselect !== null) {
      this.setState({
        optionshitselect: null
      });
    }
  }

  async onSaveNew() {
    // console.log(this.state.optionsnewselect, " optionsnewselect");
    if (this.state.optionsnewselect !== null) {
      const data = {
        name: "New",
        namaId: 2,
        productId: this.state.optionsnewselect.productId,
        productShowStatus: "A"
      }

      var url_create_prouct_new = ip + "/ProductShow/create/";
      const createproductnew = await (await axios.post(url_create_prouct_new, data)).data;
      console.log(createproductnew)

      var url_product_new = ip + "/ProductShow/find/new";
      const productnew = await (await axios.get(url_product_new)).data;
      this.setState({
        productnew: productnew,
        searchnewstatus: (productnew.length >=6) ? true : false
      });
    } else {
      swal("Warning!", "กรุณาเลือกสินค้า", "warning").then((value) => {
      });

    }
  }

  async onSaveHit() {
    // console.log(this.state.optionsnewselect, " optionsnewselect");
    if (this.state.optionshitselect !== null) {
      const data = {
        name: "Hit",
        namaId: 1,
        productId: this.state.optionshitselect.productId,
        productShowStatus: "A"
      }

      var url_create_prouct_hit = ip + "/ProductShow/create/";
      const createproducthit = await (await axios.post(url_create_prouct_hit, data)).data;
      console.log(createproducthit)

      var url_product_hit = ip + "/ProductShow/find/hit";
      const producthit = await (await axios.get(url_product_hit)).data;
      this.setState({
        producthit: producthit,
        searchhitstatus: (producthit.length >=6) ? true : false
      });
    } else {
      swal("Warning!", "กรุณาเลือกสินค้า", "warning").then((value) => {
      });

    }
  }

  async handleDeleteNew(productId) {
    const data = {
      productShowStatus: "N"
    };

    var url_update_product_new = ip + "/ProductShow/update/" + productId + "/New";
    const updateproductnew = await (await axios.put(url_update_product_new, data)).data;
    if (updateproductnew[0] > 0) {
      const productnew = [...this.state.productnew];
      this.setState({
        productnew: productnew.filter((item) => item.productId !== productId),
        searchnewstatus: false
      });
    } else {

    }
  }

  async handleDeleteHit(productId) {
    const data = {
      productShowStatus: "N"
    };

    var url_update_product_Hit = ip + "/ProductShow/update/" + productId + "/Hit";
    const updateproducthit = await (await axios.put(url_update_product_Hit, data)).data;
    if (updateproducthit[0] > 0) {
      const producthit = [...this.state.producthit];
      this.setState({
        producthit: producthit.filter((item) => item.productId !== productId),
        searchhitstatus: false
      });
    } else {

    }
  }

  async handleDeleteContact(contactId) {
    const data = {
      contactStatus: "N"
    };

    var url_update_product_Contact = ip + "/Contact/updateStatus/" + contactId;
    const updateproductcontact = await (await axios.put(url_update_product_Contact, data)).data;
    if (updateproductcontact[0] > 0) {
      const contact = [...this.state.contact];
      this.setState({
        contact: contact.filter((item) => item.contactId !== contactId),
        contactstatus: false
      });

    } else {

    }
  }

  render() {
    return (
      <Container fluid>
        <Row id="home">
          <Col xs={1} md={1} xl={1} id="icon">
            <BsFillGrid1X2Fill style={{ fontSize: '300%', color: '#DA213D' }} />
          </Col>
          <Col xs={5} md={5} xl={5} id="page-home">หน้าหลัก</Col>
        </Row>

        <Row id="row2">
          <Col xs={24} md={24} xl={15} id="chart">
            <Col xs={24} md={24} xl={24}>สินค้าที่ผู้คนสนใจ<Col>
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
            <Col xs={24} md={24} xl={24} id="interestedproduct">สินค้าใหม่</Col>
            <Col xs={24} md={24} xl={24} id="input-search-product">
              <AutoComplete
                style={{ width: "20%" }}
                options={this.state.optionsnew}
                onChange={this.onChangeNew}
                onSelect={this.onSelectNew}
                onSearch={this.onSearchFildNew}
                placeholder="เพิ่มสินค้าใหม่"
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                disabled={this.state.searchnewstatus}
              />
              <Button id="btnadd-popularproduct" onClick={this.onSaveNew} disabled={this.state.searchnewstatus}>เพิ่มรายการ</Button>
            </Col>
            <Col xs={24} md={24} xl={24}>
              <Table columns={this.interestproduct} dataSource={this.state.productnew} loading={this.state.productnewstatus} />
            </Col>
          </Col>
        </Row>

        <Row id="interest-product">
          <Col md={24} xl={24}>
            <Col xs={24} md={24} xl={24} id="interestedproduct">สินค้าขายดี</Col>
            <Col xs={24} md={24} xl={24} id="input-search-product">
              <AutoComplete
                style={{ width: "20%" }}
                options={this.state.optionshit}
                onChange={this.onChangeHit}
                onSelect={this.onSelectHit}
                onSearch={this.onSearchFildHit}
                placeholder="เพิ่มสินค้าขายดี"
                filterOption={(inputValue, option) =>
                  option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                disabled={this.state.searchhitstatus}
              />
              <Button id="btnadd-popularproduct" onClick={this.onSaveHit} disabled={this.state.searchhitstatus}>เพิ่มรายการ</Button>
            </Col>
            <Col xs={24} md={24} xl={24}>
              <Table columns={this.bestseller} dataSource={this.state.producthit} loading={this.state.producthitstatus} />
            </Col>
          </Col>
        </Row>

        <Row>
          <Col id="row3">ข้อความจากผู้ติดต่อ</Col>
          <Row id="interest-product1">
            <Table columns={this.columnscontact} dataSource={this.state.contact} loading={this.state.contactstatus}/>
          </Row>
        </Row>
      </Container>
    )
  }
}