import React, {Component} from 'react';
import {Menu} from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MessageOutlined,
    CloudOutlined,
    UserOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import image from "../../images/fish.jpg";
import './leftnav.css'

const {SubMenu} = Menu;

class DLeftNav extends Component{

    render() {
        return(
            <div style={{height: 730}}>
                <Link to='/dormitory/home'>
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
                    <Menu.Item key="3" icon={<MessageOutlined/>}>
                        <Link to='/dormitory/visitor'>
                            访客信息
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<ContainerOutlined/>}>
                        <Link to='/dormitory/damage'>
                            损耗物品
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<CloudOutlined/>}>
                        <Link to='/dormitory/score'>
                            宿舍评分
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
                    <SubMenu key="sub2" icon={<GlobalOutlined />} title="更多">
                        <Menu.Item key="9">
                            <Link to='/dormitory/Information'>
                                更多信息
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub3" title="下载">
                            <Menu.Item key="10">
                                <Link to='/dormitory/Download'>
                                    方式一
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}export default DLeftNav;