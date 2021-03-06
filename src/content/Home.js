import React, { Component } from "react";
import { BsFillGrid1X2Fill } from 'react-icons/bs';
import { Col, Row, Table, Tag, Popconfirm, Statistic, AutoComplete, Button, Modal, Form, Input, Select, InputNumber, Space, Spin } from 'antd';
import { Container } from 'react-bootstrap';
import '../css/Home.css';
import ReactApexChart from "react-apexcharts";
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import Cookies from 'universal-cookie';
import { DeleteTwoTone, EditTwoTone, CopyTwoTone } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import { config } from '../config/config';

const cookies = new Cookies();
const { Option } = Select;
const { TextArea } = Input;

var ip_web = "https://www.hitsthai.com";
var ip = config.ipServer;

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      user: [],
      contact: [],
      statusButtonEdit: false,
      contactFilterSave: [],
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

      Statisticstatus: false,
      memberUser: 0,
      endUser: 0,
      contactstatus: true,

      isModalVisible: false,
      productContact: [],

      acceptStatus: "",
      numCall: 0,
      remark: "",

      searchText: '',
      searchedColumn: '',

      series: [],
      options: {},

      isModalVisibleITProduct: false,
      itProduct: '',
      hit: [],

      isModalVisiblenewProduct: false,
      newProduct: '',
      newP: [],
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
            <div id="delete" ><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
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
            <div id="delete"><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
          </Popconfirm>,
      },
    ];

    this.columnscontact = [
      {
        title: 'ชื่อผู้ติดต่อ',
        dataIndex: 'name',
        key: 'name',
        width: 160,
        render: text => <div>{text}</div>,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'เบอร์โทรศัพท์',
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
      },
      {
        title: 'Line Id',
        dataIndex: 'line',
        key: 'line',
        ellipsis: true,
        width: 120,
      },
      {
        title: 'E - mail',
        dataIndex: 'email',
        key: 'email',
        ellipsis: true,
        width: 180,
      },
      {
        title: 'เรื่อง',
        key: 'type',
        dataIndex: 'type',
        width: 160,
        filters: [
          {
            text: 'สมัครตัวแทนจำหน่าย',
            value: 'สมัครตัวแทนจำหน่าย',
          },
          {
            text: 'สอบถามข้อมูลเพิ่มเติม',
            value: 'สอบถามข้อมูลเพิ่มเติม',
          },
          {
            text: 'สั่งซื้อสินค้า',
            value: 'สั่งซื้อสินค้า',
          },
          {
            text: 'อื่น ๆ',
            value: 'อื่น ๆ',
          },
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
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
                    : (tags === "อื่น ๆ") ?
                      <Tag color="gold" key="4">
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
        width: 200,
      },
      {
        title: 'จำนวนครั้งที่โทร',
        dataIndex: 'numCall',
        key: 'numCall',
        width: 160,
        // defaultSortOrder: 'descend',
        sorter: {
          compare: (a, b) => a.numCall - b.numCall,
        },
      },
      {
        title: 'วันที่',
        dataIndex: 'createDate',
        key: 'createDate',
        width: 160,
        render: render =>
          <>
            <div>{moment(render).format('L')}</div>
          </>

      },
      {
        title: 'สถานะ',
        dataIndex: 'acceptStatus',
        key: 'acceptStatus',
        width: 120,
        filters: [
          {
            text: 'อนุมัติ',
            value: 'A',
          },
          {
            text: 'รอดำเนินการ',
            value: 'N',
          },
        ],
        onFilter: (value, record) => record.acceptStatus.indexOf(value) === 0,
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
        width: 45,
        render: (record) =>
          <>
            <div type="primary" onClick={() => this.copyCodeToClipboard(record)}><CopyTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#FF0099" /></div>
          </>,
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
          <Popconfirm title="คุณแน่ใจว่าจะลบรายการ？" okText="ลบ" cancelText="ยกเลิก" onConfirm={() => this.handleDeleteContact(record.contactId)}>
            <div id="delete"><DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} twoToneColor="#DA213D" /></div>
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
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onChangeNumCall = this.onChangeNumCall.bind(this);
    this.onChangeFildProduct = this.onChangeFildProduct.bind(this);
    this.onChangeAcceptStatus = this.onChangeAcceptStatus.bind(this);
    this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);

    this.showModalITProduct = this.showModalITProduct.bind(this);
    this.handleOkITProduct = this.handleOkITProduct.bind(this);
    this.handleCancelITProduct = this.handleCancelITProduct.bind(this);

    this.showModalnewProduct = this.showModalnewProduct.bind(this);
    this.handleOknewProduct = this.handleOknewProduct.bind(this);
    this.handleCancelnewProduct = this.handleCancelnewProduct.bind(this);
  }

  componentWillMount() {
    this.setState({
      token: cookies.get('token_key', { path: '/Admin/' }),
      user: cookies.get('user', { path: '/Admin/' })
    });
  }

  copyCodeToClipboard(record) {
    var el = ip_web + "/FormRegister/" + record.keyRegister;
    navigator.clipboard.writeText(el);
    swal("Success!", "Copy URL Success", "success");
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


  showModal(record) {
    this.setState({
      isModalVisible: true,
      productContact: record,
      acceptStatus: record.acceptStatus,
      numCall: record.numCall,
      remark: record.remark
    });
  };

  onChangeFildProduct(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeAcceptStatus(value) {
    this.setState({
      acceptStatus: value.value
    })
  }

  onChangeNumCall(value) {
    this.setState({
      numCall: value
    })
  }

  async handleOk(values) {
    const data = {
      acceptStatus: this.state.acceptStatus,
      numCall: this.state.numCall,
      remark: this.state.remark
    };

    var url_update_contact = ip + "/Contact/update/" + this.state.productContact?.contactId;
    const updatecontact = await (await axios.put(url_update_contact, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((updatecontact?.statusCode === 500) || (updatecontact?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      if (updatecontact[0] > 0) {
        this.setState({ statusButtonEdit: false, contactstatus: true });
        swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
        });
        var url_contact = ip + "/Contact/find/all";
        const contact = await (await axios.get(url_contact)).data;
        this.setState({
          contact: contact,
          contactstatus: false,
          isModalVisible: false
        });
      } else {
        this.setState({ statusButtonEdit: false });
        swal("Warning!", "บันทึกข้อมูลไม่สำเร็จ", "warning").then((value) => {
        });
      }
    };
  }

  handleCancel() {
    this.setState({
      isModalVisible: false,
      productContact: [],
      acceptStatus: "",
      numCall: 0,
      remark: ""
    });
  };

  async componentDidMount() {
    var url_new = ip + "/WordShow/find/Admin/New";
    const newP = await (await axios.get(url_new, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((newP?.statusCode === 500) || (newP?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      this.setState({
        newP: newP,
      });
    }

    var url_hit = ip + "/WordShow/find/Admin/Hit";
    const hit = await (await axios.get(url_hit, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((hit?.statusCode === 500) || (hit?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      this.setState({
        hit: hit,
      });
    }

    var url_contact = ip + "/Contact/find/all";
    const contact = await (await axios.get(url_contact, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((contact?.statusCode === 500) || (contact?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      this.setState({
        contact: contact,
        contactstatus: false
      });
    }

    var url_product_hit = ip + "/ProductShow/find/hit";
    const producthit = await (await axios.get(url_product_hit, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((producthit?.statusCode === 500) || (producthit?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      this.setState({
        producthit: producthit,
        producthitstatus: false,
        searchhitstatus: (producthit.length >= 6) ? true : false
      });
    }

    var url_product_new = ip + "/ProductShow/find/new";
    const productnew = await (await axios.get(url_product_new, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((productnew?.statusCode === 500) || (productnew?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      this.setState({
        productnew: productnew,
        productnewstatus: false,
        searchnewstatus: (productnew.length >= 6) ? true : false
      });
    }

    var url_Statistic_User = ip + "/StatisticsUser/find/all";
    const memberUser = await (await axios.get(url_Statistic_User, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((memberUser?.statusCode === 500) || (memberUser?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      this.setState({
        memberUser: memberUser?.memberUser,
        endUser: memberUser?.endUser,
        StatisticUserstatus: false,
      });
    }

    var url_Graph = ip + "/Product/find/view";
    const graph = await (await axios.get(url_Graph, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((graph?.statusCode === 500) || (graph?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      var data = [];
      var label = [];

      await graph.forEach(async (Graph, index) => {
        data.push(Graph.view);
        label.push(Graph.name);
      });
      this.setState({
        series: [{ data }],
        options: {
          chart: {
            type: 'bar',
            height: 350
          },
          title: {
            text: 'สถิติการเข้าชม' + moment().format('LL')
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
            categories: label,
          },
        },
      });
    }
  }

  async onSearchFildNew(value) {
    if (value !== "") {
      const dataSearch = {
        search: value
      }
      // Not Authorization ฺBecause Send More 
      var url_wordsearch_new = ip + "/Product/find/wordsearchproductshow/";
      const wordsearchnew = await (await axios.post(url_wordsearch_new, dataSearch)).data;
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
      const dataSearch = {
        search: value
      }
      // Not Authorization ฺBecause Send More
      var url_wordsearch_hit = ip + "/Product/find/wordsearchproductshow/";
      const wordsearchhit = await (await axios.post(url_wordsearch_hit, dataSearch)).data;
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
    if (this.state.optionsnewselect !== null) {
      const data = {
        name: "New",
        namaId: 2,
        productId: this.state.optionsnewselect.productId,
        productShowStatus: "A"
      }

      var url_create_prouct_new = ip + "/ProductShow/create/";
      const createproductnew = await (await axios.post(url_create_prouct_new, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
      if ((createproductnew?.statusCode === 500) || (createproductnew?.statusCode === 400)) {
        swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
          this.setState({
            token: cookies.remove('token_key', { path: '/Admin/' }),
            user: cookies.remove('user', { path: '/Admin/' })
          });
          window.location.replace('/Admin/Login', false);
        });
      } else {
        if (createproductnew) {

        }
      }

      var url_product_new = ip + "/ProductShow/find/new";
      const productnew = await (await axios.get(url_product_new, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
      if ((productnew?.statusCode === 500) || (productnew?.statusCode === 400)) {
        swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
          this.setState({
            token: cookies.remove('token_key', { path: '/Admin/' }),
            user: cookies.remove('user', { path: '/Admin/' })
          });
          window.location.replace('/Admin/Login', false);
        });
      } else {
        this.setState({
          productnew: productnew,
          searchnewstatus: (productnew.length >= 6) ? true : false
        });
      }
    } else {
      swal("Warning!", "กรุณาเลือกสินค้า", "warning").then((value) => {
      });

    }
  }

  async onSaveHit() {
    if (this.state.optionshitselect !== null) {
      const data = {
        name: "Hit",
        namaId: 1,
        productId: this.state.optionshitselect.productId,
        productShowStatus: "A"
      }

      var url_create_prouct_hit = ip + "/ProductShow/create/";
      const createproducthit = await (await axios.post(url_create_prouct_hit, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
      if ((createproducthit?.statusCode === 500) || (createproducthit?.statusCode === 400)) {
        swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
          this.setState({
            token: cookies.remove('token_key', { path: '/Admin/' }),
            user: cookies.remove('user', { path: '/Admin/' })
          });
          window.location.replace('/Admin/Login', false);
        });
      } else {
        if (createproducthit) {
        }
      }

      var url_product_hit = ip + "/ProductShow/find/hit";
      const producthit = await (await axios.get(url_product_hit, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
      if ((producthit?.statusCode === 500) || (producthit?.statusCode === 400)) {
        swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
          this.setState({
            token: cookies.remove('token_key', { path: '/Admin/' }),
            user: cookies.remove('user', { path: '/Admin/' })
          });
          window.location.replace('/Admin/Login', false);
        });
      } else {
        this.setState({
          producthit: producthit,
          searchhitstatus: (producthit.length >= 6) ? true : false
        });
      }
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
    const updateproductnew = await (await axios.put(url_update_product_new, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((updateproductnew?.statusCode === 500) || (updateproductnew?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      if (updateproductnew[0] > 0) {
        var url_product_new = ip + "/ProductShow/find/new";
        const productnew = await (await axios.get(url_product_new, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((productnew?.statusCode === 500) || (productnew?.statusCode === 400)) {
          swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
            this.setState({
              token: cookies.remove('token_key', { path: '/Admin/' }),
              user: cookies.remove('user', { path: '/Admin/' })
            });
            window.location.replace('/Admin/Login', false);
          });
        } else {
          this.setState({
            productnew: productnew,
            searchnewstatus: (productnew.length >= 6) ? true : false
          });
        }
      } else {
        swal("Error!", "เกิดข้อผิดพลาดในการลบข้อมูล \n กรุณาลองใหม่อีกครั้ง", "error").then((value) => {
        });
      }
    }
  }

  async handleDeleteHit(productId) {
    const data = {
      productShowStatus: "N"
    };

    var url_update_product_Hit = ip + "/ProductShow/update/" + productId + "/Hit";
    const updateproducthit = await (await axios.put(url_update_product_Hit, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((updateproducthit?.statusCode === 500) || (updateproducthit?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      if (updateproducthit[0] > 0) {
        var url_product_hit = ip + "/ProductShow/find/hit";
        const producthit = await (await axios.get(url_product_hit, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((producthit?.statusCode === 500) || (producthit?.statusCode === 400)) {
          swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
            this.setState({
              token: cookies.remove('token_key', { path: '/Admin/' }),
              user: cookies.remove('user', { path: '/Admin/' })
            });
            window.location.replace('/Admin/Login', false);
          });
        } else {
          this.setState({
            producthit: producthit,
            searchhitstatus: (producthit.length >= 6) ? true : false
          });
        }
      } else {
        swal("Error!", "เกิดข้อผิดพลาดในการลบข้อมูล \n กรุณาลองใหม่อีกครั้ง", "error").then((value) => {
        });
      }
    }
  }

  async handleDeleteContact(contactId) {
    const data = {
      contactStatus: "N"
    };

    var url_update_product_Contact = ip + "/Contact/updateStatus/" + contactId;
    const updateproductcontact = await (await axios.put(url_update_product_Contact, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((updateproductcontact?.statusCode === 500) || (updateproductcontact?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      if (updateproductcontact[0] > 0) {
        var url_contact = ip + "/Contact/find/all";
        const contact = await (await axios.get(url_contact, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((contact?.statusCode === 500) || (contact?.statusCode === 400)) {
          swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
            this.setState({
              token: cookies.remove('token_key', { path: '/Admin/' }),
              user: cookies.remove('user', { path: '/Admin/' })
            });
            window.location.replace('/Admin/Login', false);
          });
        } else {
          this.setState({
            contact: contact,
            contactstatus: false
          });
        }
      } else {
        swal("Error!", "เกิดข้อผิดพลาดในการลบข้อมูล \n กรุณาลองใหม่อีกครั้ง", "error").then((value) => {
        });
      }
    }
  }

  onChangeFildITProduct(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showModalITProduct() {
    this.setState({ isModalVisibleITProduct: true, itProduct: this.state.hit[0].wordShow });
  };

  async handleOkITProduct() {
    const data = {
      wordShow: this.state.itProduct,
    };

    var url_update_hit = ip + "/WordShow/update/Hit";
    const updatehit = await (await axios.put(url_update_hit, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((updatehit?.statusCode === 500) || (updatehit?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      if (updatehit) {
        swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
          this.setState({
            isModalVisibleITProduct: false,
          });
        });

        var url_hit = ip + "/WordShow/find/Admin/Hit";
        const hit = await (await axios.get(url_hit, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((hit?.statusCode === 500) || (hit?.statusCode === 400)) {
          swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
            this.setState({
              token: cookies.remove('token_key', { path: '/Admin/' }),
              user: cookies.remove('user', { path: '/Admin/' })
            });
            window.location.replace('/Admin/Login', false);
          });
        } else {
          this.setState({
            hit: hit,
            memberStatus: false
          });
        }
      } else {
        swal("Error!", "เกิดข้อผิดพลาดในการแก้ไขข้อมูล \n กรุณาลองใหม่อีกครั้ง", "error").then((value) => {
        });
      }
    }
  };

  handleCancelITProduct() {
    this.setState({ isModalVisibleITProduct: false })
  }

  showModalnewProduct() {
    this.setState({ isModalVisiblenewProduct: true, newProduct: this.state.newP[0]?.wordShow });
  };

  async handleOknewProduct() {
    const data = {
      wordShow: this.state.newProduct,
    };

    var url_update_new = ip + "/WordShow/update/New";
    const updatenew = await (await axios.put(url_update_new, data, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
    if ((updatenew?.statusCode === 500) || (updatenew?.statusCode === 400)) {
      swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
        this.setState({
          token: cookies.remove('token_key', { path: '/Admin/' }),
          user: cookies.remove('user', { path: '/Admin/' })
        });
        window.location.replace('/Admin/Login', false);
      });
    } else {
      if (updatenew) {
        swal("Success!", "บันทึกข้อมูลสำเร็จ", "success").then((value) => {
          this.setState({
            isModalVisiblenewProduct: false,
          });
        });
        var url_new = ip + "/WordShow/find/Admin/New";
        const newP = await (await axios.get(url_new, { headers: { "token": this.state.token, "key": this.state.user?.username } })).data;
        if ((newP?.statusCode === 500) || (newP?.statusCode === 400)) {
          swal("Error!", "เกิดข้อผิดพลาดในการเข้าสู่ระบบ \n กรุณาเข้าสู่ระบบใหม่", "error").then((value) => {
            this.setState({
              token: cookies.remove('token_key', { path: '/Admin/' }),
              user: cookies.remove('user', { path: '/Admin/' })
            });
            window.location.replace('/Admin/Login', false);
          });
        } else {
          this.setState({
            newP: newP,
            memberStatus: false
          });
        }
      } else {
        swal("Error!", "เกิดข้อผิดพลาดในการแก้ไขข้อมูล \n กรุณาลองใหม่อีกครั้ง", "error").then((value) => {
        });
      }
    }
  };
  
  handleCancelnewProduct() {
    this.setState({ isModalVisiblenewProduct: false })
  }

  render() {
    return (
      <Container fluid>
        <Spin spinning={this.state.statusButtonEdit} size="large">
          <Row id="home">
            <Col xs={1} md={1} xl={1} id="icon">
              <BsFillGrid1X2Fill style={{ fontSize: '280%', color: '#DA213D' }} />
            </Col>
            <Col xs={5} md={5} xl={5} id="page-home">หน้าหลัก</Col>
          </Row>

          <Row id="row2">
            <Col xs={24} md={24} xl={24} id="visit-head">สินค้าที่ผู้คนสนใจ</Col>
            <Col xs={24} md={24} xl={24} id="chart">
              <Col>
                <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300} />
              </Col>
            </Col>
          </Row>
          <Row id="statistic">
            <Col md={24} xl={24} id="visit-head">จำนวนการเข้าชม</Col>
            <Col md={11} xl={11} id="visit">
              <Col md={24} xl={24} id="visit-member">
                <Statistic id="visit-nummember1" title="สมาชิก" value={this.state.memberUser} loading={this.state.contactstatus} />
              </Col>
            </Col>
            <Col md={11} xl={11} id="visit1">
              <Col md={24} xl={24} id="visit-user">
                <Statistic id="visit-user1" title="ผู้ใช้ทั่วไป" value={this.state.endUser} loading={this.state.contactstatus} />
              </Col>
            </Col>
          </Row>

          <Row id="interest-product">
            <Col md={24} xl={24}>
              <Row>
                <Col xs={5} md={5} xl={5} id="interestedproduct" >{this.state.newP[0]?.wordShow}</Col>
                <Col xs={12} md={12} xl={12} id="interestedproduct">
                  <Button id="btnadd-popularproduct" onClick={() => this.showModalnewProduct()}>แก้ไข</Button>
                </Col>
              </Row>
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
                <Table columns={this.interestproduct} dataSource={this.state.productnew} loading={this.state.productnewstatus} pagination={false} />
              </Col>
            </Col>
          </Row>

          <Row id="interest-product">
            <Col md={24} xl={24}>
              <Row>
                <Col xs={5} md={5} xl={5} id="interestedproduct">{this.state.hit[0]?.wordShow}</Col>
                <Col xs={12} md={12} xl={12} id="interestedproduct">
                  <Button id="btnadd-popularproduct" onClick={() => this.showModalITProduct()}>แก้ไข</Button>
                </Col>
              </Row>
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
                <Table columns={this.bestseller} dataSource={this.state.producthit} loading={this.state.producthitstatus} pagination={false} />
              </Col>
            </Col>
          </Row>

          <Row id="row3">
            <Col id="row3">ข้อความจากผู้ติดต่อ</Col>
            <Col xs={24} md={24} xl={24}>
              <Table columns={this.columnscontact} dataSource={this.state.contact} scroll={{ x: 1500 }} loading={this.state.contactstatus} onChange={onChange} />
            </Col>
          </Row>

          <Modal
            title="แก้ไขข้อความจากผู้ติดต่อ"
            visible={this.state.isModalVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={800}>
            <Form id="form">
              <Col md={24} xl={24} id="product-detail">รายละเอียดข้อมูลผู้ติดต่อ</Col>
              <Row id="add-product">
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={7} xl={7}>ชื่อผู้ติดต่อ :</Col>
                    <Col md={12} xl={12}>{this.state.productContact?.name}</Col>
                  </Row>
                </Col>
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={6} xl={6}>เบอร์โทรศัพท์ :</Col>
                    <Col md={12} xl={12}>{this.state.productContact?.phone}</Col>
                  </Row>
                </Col>
              </Row>
              <Row id="add-product">
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={7} xl={7}>Line Id :</Col>
                    <Col md={12} xl={12}>{this.state.productContact?.line}</Col>
                  </Row>
                </Col>
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={6} xl={6}>email :</Col>
                    <Col md={12} xl={12}>{this.state.productContact?.email}</Col>
                  </Row>
                </Col>
              </Row>
              <Row id="add-product">
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={7} xl={7}>เรื่อง :</Col>
                    <Col md={12} xl={12}>{this.state.productContact?.type}</Col>
                  </Row>
                </Col>
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={6} xl={6}>ข้อความ :</Col>
                    <Col md={12} xl={12}>{this.state.productContact?.msg}</Col>
                  </Row>
                </Col>
              </Row>
              <Row id="add-product">
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={7} xl={7}>จำนวนครั้งที่โทร :</Col>
                    <Col md={12} xl={12}><InputNumber name="numCall" min={0} value={this.state.numCall} onChange={this.onChangeNumCall} /></Col>
                  </Row>
                </Col>
                <Col md={12} xl={12}>
                  <Row>
                    <Col md={6} xl={6}>สถานะ :</Col>
                    <Col md={12} xl={12}>
                      <Select labelInValue value={{ value: ('' + this.state.acceptStatus) }} id="input" name="acceptStatus" onChange={this.onChangeAcceptStatus}>
                        <Option value="A">เสร็จสิ้น</Option>
                        <Option value="N">รอดำเนินการ</Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row id="add-product">
                <Col md={24} xl={24}>
                  <Row>
                    <Col md={3} xl={3}>โน๊ต :</Col>
                    <Col md={18} xl={18}><TextArea id="input" name="remark" value={this.state.remark} onChange={this.onChangeFildProduct} /></Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Modal>

          <Modal
            title="แก้ไขหัวข้อ"
            visible={this.state.isModalVisibleITProduct}
            onOk={this.handleOkITProduct}
            onCancel={this.handleCancelITProduct}
            width={600}>
            <Form>
              <Col md={24} xl={24} id="col-marginlevel">
                <Row>
                  <Col md={6} xl={6}></Col>
                  <Col md={4} xl={4}>หัวข้อ</Col>
                  <Col md={6} xl={6}><Input id="input-level" name="itProduct" value={this.state.itProduct} onChange={this.onChangeFildProduct} /></Col>
                </Row>
              </Col>
            </Form>
          </Modal>
          <Modal
            title="แก้ไขหัวข้อ"
            visible={this.state.isModalVisiblenewProduct}
            onOk={this.handleOknewProduct}
            onCancel={this.handleCancelnewProduct}
            width={600}>
            <Form>
              <Col md={24} xl={24} id="col-marginlevel">
                <Row>
                  <Col md={6} xl={6}></Col>
                  <Col md={4} xl={4}>หัวข้อ</Col>
                  <Col md={6} xl={6}><Input id="input-level" name="newProduct" value={this.state.newProduct} onChange={this.onChangeFildProduct} /></Col>
                </Row>
              </Col>
            </Form>
          </Modal>
        </Spin>
      </Container>
    )
  }
}