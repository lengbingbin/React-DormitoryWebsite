import React, {Component} from 'react';
import {Menu} from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    MessageOutlined,
    CloudOutlined,
    UserOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import image from "../../images/fish.jpg";
import './leftnav.css'

const {SubMenu} = Menu;

class LeftNav extends Component{

    render() {
        return(
            <div style={{height: 730}}>
                <Link to='/welcome'>
                    <img src={image} alt="logo" className="leftnav-img"/>
                    <h1 style={{color: '#FFF6F6', marginLeft: "35px"}}>宿舍管理系统</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    //inlineCollapsed={collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        <Link to='/dormitory/home'>
                            首页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        <Link to='/dormitory/dorm'>
                            宿舍信息
                        </Link>
                    </Menu.Item>

                    <Menu.Item key="4" icon={<ContainerOutlined/>}>
                        <Link to='/dormitory/damage'>
                            损耗物品
                        </Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<UserOutlined />} title="人员信息">
                        <Menu.Item key="6">
                            <Link to='/dormitory/student'>
                                学生信息
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to='/dormitory/admin'>
                                管理员信息
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            </div>
        )
    }
}export default LeftNav;