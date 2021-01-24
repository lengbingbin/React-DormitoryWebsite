import React, {Component} from "react";
import background from "../../images/register.jpg";
import {Button, Checkbox, Form, Input, message} from "antd";
import {
    LockOutlined,
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    InfoCircleOutlined,
    TeamOutlined,
    AlertOutlined,
    SafetyOutlined
} from "@ant-design/icons";
import './register.css';
import axios from "axios";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.onFinish=this.onFinish.bind(this);
    };

    onFinish(values){
        console.log("values: ", values);
        let history = this.props.history;
        axios.post('http://localhost:8089/dormitory/register',values)
            .then(response => {
                console.log("data: ", response.data);
                if (response.data.state) {
                    message.success("注册成功")
                    history.push('/login');
                    //console.log("user",sessionStorage.getItem("user"));
                } else {
                    message.error("注册失败");
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <img src={background} className="register-img"/>
                <Form
                    name="normal_login"
                    className="register-form"
                    initialValues={{remember: true}}
                    onFinish={this.onFinish}
                >
                    <h3 className="h3">Register</h3>
                    <Form.Item
                        name="id"
                        rules={[{required: true, message: 'Please input your Id!'}]}
                    >
                        <Input prefix={<AlertOutlined className="site-form-item-icon"/>} placeholder="Id"/>
                    </Form.Item>
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
                    <Form.Item
                        name="permission"
                        rules={[{required: true, message: 'Please input your Permission!'}]}
                    >
                        <Input
                            prefix={<SafetyOutlined className="site-form-item-icon"/>}
                            type="permission"
                            placeholder="Permission"
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        rules={[{required: true, message: 'Please input your Phone!'}]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon"/>}
                            placeholder="Phone"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Please input your Email!'}]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        rules={[{required: true, message: 'Please input your Age!'}]}
                    >
                        <Input
                            prefix={<InfoCircleOutlined className="site-form-item-icon"/>}
                            placeholder="Age"
                        />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        rules={[{required: true, message: 'Please input your Sex!'}]}
                    >
                        <Input
                            prefix={<TeamOutlined className="site-form-item-icon"/>}
                            placeholder="Sex"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                        <br/>
                        Or <a href="#">return login</a>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Register;