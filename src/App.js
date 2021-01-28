import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
// import { RightSquareFilled } from '@ant-design/icons';
import Menu from "./template/Menu";
import Routing from "./routes";
// import { Layout } from 'antd';
import { Layout } from 'antd';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const { Content, Sider } = Layout;
var heightContent = "";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: "",
      user: [],
      statusSend: false,
      collapsed: false,
      statusUser: false
    };
  }

  componentWillMount() {
    this.setState({
      token: cookies.get('token_key', { path: '/Admin/' }),
      user: cookies.get('user', { path: '/Admin/' }),
      statusUser: true
    });
  }

  componentDidMount() {
    this.setState({
      token: cookies.get('token_key', { path: '/Admin/' }),
      user: cookies.get('user', { path: '/Admin/' }),
      statusUser: true
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    heightContent = (window.innerHeight) + "px";
    return (
      <Router>
        <Layout>
          {
            (this.state.statusUser) ?
              (this.state.token !== undefined) ?
                <>
                  <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => { console.log(broken); }}
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                  >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                      <Menu />
                    </Menu>
                  </Sider>
                </>
                :
                <></>
              :
              <></>
          }
          <Layout>
            <Content style={{ minHeight: heightContent }}>
              <div className="site-layout-background">
                <Routing />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

