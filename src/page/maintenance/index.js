import React, {Component} from 'react';
import {Layout} from 'antd';
import LeftNav from "../../component/LeftNav/damleft";
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
import './maintence.css'

const {Sider, Content} = Layout;

class Maintenance extends Component{

    render() {
        return(
            <Layout>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout className="site-layout">
                    <Header/>
                    <br/>
                    <Content className="site-layout-background">
                        <Switch>
                            <div>
                                <Route path="/dormitory/home" component={Home}/>
                                <Route path="/dormitory/dorm" component={Dorm}/>
                                <Route path="/dormitory/damage" component={Damage}/>
                                <Route path="/dormitory/student" component={Student}/>
                                <Route path="/dormitory/admin" component={Admin}/>
                            </div>
                        </Switch>
                    </Content>
                    <br/>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }
}export default Maintenance;