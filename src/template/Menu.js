import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { BsFillGrid1X2Fill, BsFillPersonLinesFill, BsFillGearFill } from 'react-icons/bs';
import { FaProductHunt, FaSignOutAlt } from "react-icons/fa";
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class MenuAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token: "",
          user: [],
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

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<BsFillGrid1X2Fill />}><NavLink to="/Admin/Home">หน้าหลัก</NavLink></Menu.Item>
                <Menu.Item key="2" icon={<FaProductHunt />}><NavLink to="/Admin/Product">สินค้า</NavLink></Menu.Item>
                <Menu.Item key="3" icon={<BsFillPersonLinesFill />}><NavLink to="/Admin/User">สมาชิก</NavLink></Menu.Item>
                <Menu.Item key="4" icon={<BsFillGearFill />}><NavLink to="/Admin/Setting">ตั้งค่า</NavLink></Menu.Item>
                <Menu.Item key="5" icon={<FaSignOutAlt />}><NavLink to="/Admin/Logout">ออกจากระบบ</NavLink></Menu.Item>
            </Menu>
        );
    }
}

