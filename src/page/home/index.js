import React, {Component} from 'react';
import {Statistic, Card, Row, Col, message} from 'antd';
import './home.css'
import ReactEcharts from 'echarts-for-react';
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        let option = {}
        this.state = {
            option,
            number: 0,
            man:0,
            woman:0,
            damagenumber:0,
            fixed:0,
            nofixed:0,
            series:[]
        }
    }

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        axios.get('http://localhost:8089/dormitory/getviscount')
            .then(response => {
                console.log("response: ", response.data.datalist);
                if (response.data.state) {
                    this.setState({series: [response.data.datalist]});
                    console.log("mon: ", this.state.series);
                    let option = this.state.option = {
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: this.state.series[0],
                            type: 'line'
                        }]
                    };
                    this.setState({
                        option
                    })
                } else {
                    //弹窗告知用户权限

                }
                console.log("sessionStorage: ", sessionStorage.getItem("token"));
            })
            .catch(err => console.log(err))

        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        axios.get('http://localhost:8089/dormitory/getusercount')
            .then(response => {
                console.log("response: ", response);
                if (response.data.state) {
                    this.setState({number: response.data.datalist[0].total});
                    this.setState({man: response.data.datalist[0].man});
                    this.setState({woman: response.data.datalist[0].woman});
                } else {
                    //弹窗告知用户权限
                    message.error("系统出错")
                }
                console.log("sessionStorage: ", sessionStorage.getItem("token"));
            })
            .catch(err => console.log(err))

        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        axios.get('http://localhost:8089/dormitory/getdamcount')
            .then(response => {
                console.log("response: ", response);
                if (response.data.state) {
                    this.setState({damagenumber: response.data.datalist[0].damagenumber});
                    this.setState({fixed: response.data.datalist[0].fixed});
                    this.setState({nofixed: response.data.datalist[0].nofixed});
                } else {
                    //弹窗告知用户权限

                }
                console.log("sessionStorage: ", sessionStorage.getItem("token"));
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="site-statistic-demo-card">
                <Row gutter={12}>
                    <Col span={6}>
                        <Card style={{width: 450}} title={"用户数量统计"}>
                            <Row gutter={12}>
                                <Col span={6}>
                                    <Statistic title="Active Users" value={this.state.number}/>
                                </Col>
                                <Col span={6} offset={2}>
                                    <Statistic title="Man" value={this.state.man} valueStyle={{color:'#87ceeb'}}/>
                                </Col>
                                <Col span={6} offset={2}>
                                    <Statistic title="Woman" value={this.state.woman} valueStyle={{color: '#ee82ee'}}/>
                                </Col>
                            </Row>
                        </Card>
                        <br/>
                        <br/>
                        <Card style={{width: 450}} title={"损耗物品统计"}>
                            <Row gutter={12}>
                                <Col span={8}>
                                    <Statistic title="Total Damage items" value={this.state.damagenumber}/>
                                </Col>
                                <Col span={6} offset={2}>
                                    <Statistic title="Isfixed" value={this.state.fixed} valueStyle={{color:'#32cd32'}}/>
                                </Col>
                                <Col span={6} offset={2}>
                                    <Statistic title="Not fixed" value={this.state.nofixed} valueStyle={{color: '#ff0000'}}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={15} offset={3}>
                        <Card style={{width: '100%', display: 'table', height: 200}} title="访客数量统计">
                            <ReactEcharts option={this.state.option}/>
                        </Card>
                    </Col>
                </Row>
                <br/>
            </div>
        )
    }
}

export default Home;