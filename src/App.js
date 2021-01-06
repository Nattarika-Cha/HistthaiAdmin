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

const { Content, Sider } = Layout;

export default class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu />
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <div className="site-layout-background">
                <Routing />
              </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </Layout>
        </Layout>
      </Router>
    );
  }
}

