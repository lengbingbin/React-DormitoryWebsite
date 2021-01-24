import React, {Component} from 'react';
import {Layout} from 'antd';
import LeftNav from "../../component/LeftNav/index";
import Footer from "../../component/Footer";
import Header from "../../component/Header";
import {Route, Switch} from 'react-router-dom';
import Damage from '../../page/damage';
import Score from '../../page/score';
import Visitor from '../../page/visitor';
import Dorm from '../../page/dorm';
import Home from '../../page/home';
import Student from '../../page/student';
import Admin from '../../page/admin';
import './welcome.css'
import DLeftNav from "../../component/LeftNav/damleft";
import Information from "../information";
import Download from "../../component/download/download";

const {Sider, Content} = Layout;

class Welcome extends Component {

    render() {
        return (
            <Layout>
                <Sider>
                    {
                        sessionStorage.getItem("per") === "1" ? <LeftNav/> : <DLeftNav/>
                    }
                </Sider>
                <Layout className="site-layout">
                    <Header/>
                    <br/>
                    <Content className="site-layout-background">
                        <Switch>
                            <div>
                                <Route path="/dormitory/home" component={Home}/>
                                <Route path="/dormitory/dorm" component={Dorm}/>
                                <Route path="/dormitory/visitor" component={Visitor}/>
                                <Route path="/dormitory/damage" component={Damage}/>
                                <Route path="/dormitory/score" component={Score}/>
                                <Route path="/dormitory/student" component={Student}/>
                                <Route path="/dormitory/admin" component={Admin}/>
                                <Route path="/dormitory/information" component={Information}/>
                                <Route path="/dormitory/download" component={Download}/>
                            </div>
                        </Switch>
                    </Content>
                    <br/>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }
}

export default Welcome;