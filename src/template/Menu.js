import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { BsFillGrid1X2Fill, BsFillPersonLinesFill, BsFillGearFill } from 'react-icons/bs';
import { FaProductHunt } from "react-icons/fa";
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

export default class MenuAdmin extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<BsFillGrid1X2Fill />}><NavLink to="/Home">หน้าหลัก</NavLink></Menu.Item>
                <Menu.Item key="2" icon={<FaProductHunt />}><NavLink to="/Product">สินค้า</NavLink></Menu.Item>
                <Menu.Item key="3" icon={<BsFillPersonLinesFill />}><NavLink to="/User">สมาชิก</NavLink></Menu.Item>
                <Menu.Item key="4" icon={<BsFillGearFill />}><NavLink to="/Setting">ตั้งค่า</NavLink></Menu.Item>
            </Menu>
        );
    }
}

