import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

export default class MenuAdmin extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<UploadOutlined />}><NavLink to="/Home">หน้าหลัก</NavLink></Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}><NavLink to="/Product">สินค้า</NavLink></Menu.Item>
                <Menu.Item key="3" icon={<VideoCameraOutlined />}><NavLink to="/User">สมาชิก</NavLink></Menu.Item>
                <Menu.Item key="4" icon={<VideoCameraOutlined />}><NavLink to="/Setting">ตั้งค่า</NavLink></Menu.Item>
            </Menu>
        );
    }
}

