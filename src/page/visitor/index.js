import React, {Component} from 'react';
import axios from "axios";
import {message, Button, Divider, Form, Input, Modal, Radio, Table, DatePicker} from "antd";
import moment from 'moment';
import './visitor.css'
import {SearchOutlined} from "@ant-design/icons";

const columns = [

    {
        title: 'id',
        dataIndex: 'id',
        className: "notshow"
    },
    {
        title: '访客信息',
        dataIndex: 'visitorname',
    },
    {
        title: '访问学生',
        dataIndex: 'studentid',
    },
    {
        title: '访问时间',
        dataIndex: 'starttime',
    },
    {
        title: '离开时间',
        dataIndex: 'endtime',
    },
    {
        title: '访问日期',
        dataIndex: 'day',
    },
];

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


class Visitor extends Component {
    // 创建一个ref
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            selectionType: 'checkbox',
            list: [],
            selectedRowsKeys: [],
            confirmvisible: false,
            cancelvisible: false,
            selectedRows: [],
            search:[],
            uplist: {
                id: "",
                visitorname: "",
                studentid: "",
                starttime: "",
                endtime: "",
                day: ""
            },
        }
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    ComfirmCancel = () => {
        this.setState({confirmvisible: false});
    };

    InsertData = (value) => {
        console.log("value: ", value);
        axios.post('http://localhost:8089/dormitory/vissave', value)
            .then(response => {
                console.log("responses: ", response);
                if (response.data.state) {
                    message.success("插入成功");
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("插入失败");
                }
            })
            .catch(err => console.log(err))
        this.setState({confirmvisible: false});
    }

    SearchData = () => {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        console.log("value: ", this.state.search);
        axios.post('http://localhost:8089/dormitory/vissearchlist',this.state.search)
            .then(response => {
                console.log("response: ", response);
                if (response.data.state) {
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("不存在该数据")
                }
                console.log("sessionStorage: ", sessionStorage.getItem("token"));
            })
            .catch(err => console.log(err))
    }

    DeleteData = () => {
        console.log("selectedRows : ", this.state.selectedRows);
        axios.post('http://localhost:8089/dormitory/visdelete', this.state.selectedRows)
            .then(response => {
                if (response.data.state) {
                    message.success("删除成功");
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("删除失败");
                }
            })
            .catch(err => console.log(err))

        this.setState({cancelvisible: false});
    }

    ComfirmshowModal = () => {
        this.setState({confirmvisible: true});
    };

    UpComfirmshowModal = () => {
        if (this.state.selectedRows.length == 0) {
            message.error("请勾选数据")
        } else if (this.state.selectedRows.length > 1) {
            message.error("一次只能勾选一条数据")
        } else {
            this.setState({confirmvisible: true});
        }
    };

    Cancel = () => {
        this.setState({cancelvisible: false});
    };

    CancelshowModal = () => {
        this.setState({cancelvisible: true});
    };

    inputChange(e) {
        this.setState({
            search:{studentid:e.target.value}
        })
    }

    GetData = () => {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        axios.get('http://localhost:8089/dormitory/vislist')
            .then(response => {
                console.log("response: ", response);
                if (response.data.state) {
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("显示错误");
                }
                console.log("sessionStorage: ", sessionStorage.getItem("token"));
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.GetData();
    }

    onSelectChange = (selectedRowsKeys, selectedRows) => {
        console.log('selectedRow', selectedRows);
        if (selectedRows[0] != null) {
            this.setState({uplist: selectedRows[0]})
        } else {
            this.setState({uplist: []})
        }
        this.setState({selectedRowsKeys: selectedRowsKeys});
        this.setState({selectedRows: selectedRows});
        console.log('selectedRows: ', this.state.selectedRows);
    };

    render() {
        const rowSelection = {
            onChange: this.onSelectChange,
        };
        return (
            <div style={{marginLeft: 50, width: 1200}}>
                <br/>
                <Radio.Group
                    onChange={({target: {value}}) => {
                        this.state.selectionType = value
                    }}
                    value={this.state.selectionType}
                >
                </Radio.Group>
                <Input placeholder ='请输入学号' style={{width: '30%'}} prefix={<SearchOutlined/>} onChange={(e) => this.inputChange(e)}/>
                <b>&nbsp;&nbsp;&nbsp;&nbsp;</b>
                <Button type="primary" onClick={this.SearchData} >
                    搜索
                </Button>
                <b>&nbsp;&nbsp;&nbsp;&nbsp;</b>
                <Button type="primary" onClick={this.GetData}>
                    返回
                </Button>
                <Divider/>

                <Table
                    rowSelection={{
                        type: this.state.selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={this.state.list}
                    rowKey={record => record.id}
                    pagination={{pageSize: 5}}
                />

                <Button type="primary" onClick={this.ComfirmshowModal}>
                    增加
                </Button>
                <Modal
                    title="添加数据"
                    visible={this.state.confirmvisible}
                    onCancel={this.ComfirmCancel}
                    onOk={this.ComfirmCancel}
                    okText="确认"
                    cancelText="取消"
                    destroyOnClose={true}
                >
                    <Form {...layout} ref={this.formRef} name="nest-messages" validateMessages={validateMessages}
                          onFinish={this.InsertData}>
                        <Form.Item name="id" label="id" initialValue={this.state.uplist.id} hidden={true}>
                        </Form.Item>
                        <Form.Item name="visitorname" label="访客信息" initialValue={this.state.uplist.visitorname} rules={[{ required: true }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="studentid" label="访问学生" initialValue={this.state.uplist.studentid} rules={[{ required: true }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="访问时间" name="starttime"
                                   initialValue={this.state.selectedRows.length == 0 ? "" : moment(this.state.uplist.starttime, 'YYYY-MM-DD HH:mm:ss')}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        </Form.Item>
                        <Form.Item label="离开时间" name="endtime"
                                   initialValue={this.state.selectedRows.length == 0 ? "" : moment(this.state.uplist.endtime, 'YYYY-MM-DD HH:mm:ss')}>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                        </Form.Item>
                        <Form.Item name="day" label="访问日期" initialValue={this.state.uplist.day}>
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 11}}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <b>&nbsp;&nbsp;&nbsp;&nbsp;</b>
                <Button onClick={this.CancelshowModal}>
                    删除
                </Button>
                <Modal
                    title="提示框"
                    onOk={this.DeleteData}
                    okText="确认"
                    visible={this.state.cancelvisible}
                    onCancel={this.Cancel}
                    cancelText="取消"
                >

                    <p>确认删除吗？</p>
                </Modal>
                <b>&nbsp;&nbsp;&nbsp;&nbsp;</b>
                <Button onClick={this.UpComfirmshowModal}>
                    编辑
                </Button>
                <br/>
            </div>
        )
    }
}

export default Visitor;