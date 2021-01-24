import React, {Component} from 'react';
import {Form, Input, Button, Checkbox, message,Avatar, Image} from 'antd';
import axios from "axios";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import './login.css';
import 'antd/dist/antd.css';
import logo from '../../images/login.jpg';
import avatar from '../../images/avatar.jpg';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.onFinish=this.onFinish.bind(this);
    };


    onFinish(values){
        console.log("values: ", values);
        let history = this.props.history;
        axios.post('http://localhost:8089/dormitory/login',values)
            .then(function (response) {
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("per", response.data.per);
                console.log("localStorage: ", sessionStorage.getItem("token"));
                console.log("data.per: ", response.data.per);
                if (response.data.result) {
                    message.success("登录成功");
                    history.push('/dormitory/home');
                    sessionStorage.setItem("user", values.username);
                    //console.log("user",sessionStorage.getItem("user"));
                } else {
                    message.error("用户名或者密码错误");
                }
            })
                .catch(err => console.log(err))
    }

    render() {

        return (
            <div>
                <img src={logo} className="login-img"/>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                >
                    <Avatar size={80} className="avatar"
                        src={<Image src={avatar} />}
                    />
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <br/>
                        Or <a href="#/register">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login;