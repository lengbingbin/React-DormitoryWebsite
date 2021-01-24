import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import {Modal} from 'antd'
import './header.css'
import LinkButton from '../LinkButton'

/*
左侧导航的组件
 */
class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        dayPictureUrl: '', // 天气图片url
        weather: '', // 天气的文本
    }

    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    /*
 第一次render()之后执行一次
 一般在此执行异步操作: 发ajax请求/启动定时器
  */
    componentDidMount () {
        // 获取当前的时间
        this.getTime()
        // 获取当前天气
        this.getWeather()
    }

    /*
    当前组件卸载之前调用
     */
    componentWillUnmount () {
        // 清除定时器
        clearInterval(this.intervalId)
    }


    getWeather = async () => {
        // 调用接口请求异步获取数据
        //const {dayPictureUrl, weather} = await reqWeather('北京')
        const {weather} = await reqWeather()
        // 更新状态
        //this.setState({dayPictureUrl, weather})
        this.setState({weather})
    }

    /*
        退出登陆
   */
    logout = () => {
        // 显示确认框
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                console.log('OK', this)
                // 删除保存的user数据
                sessionStorage.setItem("user","");
                console.log("user: ",sessionStorage.getItem("user"));
                // 跳转到login
                this.props.history.replace('/#')
            }
        })
    }

    render() {
        return (
            <div className="header" style={{background:"#fff"}}>
                <div className="header-top">
                    <span> 欢迎您,</span>
                    {sessionStorage.getItem("user")}
                    <span style={{margin: "0 0 0 0px"}}></span>
                    {/*后续设置为button，点击后触发清空用户操作*/}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={this.state.dayPictureUrl} className="header-img" alt="weather"/>
                        天气 :
                        <span className="header-weather"> {this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
