import React, {Component} from 'react';
import axios from "axios";
import {message, Button, Divider, Form, Input, InputNumber, Modal, Radio, Table} from "antd";
import './score.css'
import {SearchOutlined} from "@ant-design/icons";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        className: "notshow"
    },
    {
        title: '宿舍评分',
        dataIndex: 'score',
    },
    {
        title: '宿舍号',
        dataIndex: 'dormid',
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

class Score extends Component{

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            selectionType: 'checkbox',
            list: [],
            selectedRowsKeys: [],
            confirmvisible: false,
            cancelvisible: false,
            selectedRows:[],
            search:[],
            uplist: {
                id: "",
                score: "",
                dormid: ""
            },
        }
    }

    ComfirmCancel = () => {
        this.setState({confirmvisible: false});
    };

    InsertData = (value) => {
        console.log("value: ",value);
        axios.post('http://localhost:8089/dormitory/scosave',value)
            .then(response => {
                if (response.data.state) {
                    message.success("插入成功");
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("插入失败");
                }
            })
            .catch(err => console.log(err))
        this.setState({confirmvisible:false});
    }

    SearchData = () => {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        console.log("value: ", this.state.search);
        axios.post('http://localhost:8089/dormitory/scosearchlist',this.state.search)
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
        axios.post('http://localhost:8089/dormitory/scodelete', this.state.selectedRows)
            .then(response => {
                //console.log("axios.values: ", JSON.stringify(this.state.selectedRows));
                //console.log("response: ", response);
                if (response.data.state) {
                    message.success("删除成功");
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("删除失败");
                }
            })
            .catch(err => console.log(err))

        this.setState({cancelvisible:false});
    }

    ComfirmshowModal = () => {
        this.setState({confirmvisible: true});
    };

    Cancel = () => {
        this.setState({cancelvisible: false});
    };

    CancelshowModal = () => {
        this.setState({cancelvisible: true});
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

    GetData = () => {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        axios.get('http://localhost:8089/dormitory/scolist')
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

    inputChange(e) {
        this.setState({
            search: {dormid: e.target.value}
        })
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
            /*getCheckboxProps: (record) => ({
                // Column configuration not to be checked
                d_id: record.d_id,

            }),*/
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
                <Input placeholder ='请输入宿舍号' style={{width: '30%'}} prefix={<SearchOutlined/>} onChange={(e) => this.inputChange(e)}/>
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
                <div>
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
                        <Form {...layout} name="nest-messages" ref={this.formRef} validateMessages={validateMessages} onFinish={this.InsertData}>
                            <Form.Item name="id" label="id" initialValue={this.state.uplist.id} hidden={true}>
                            </Form.Item>
                            <Form.Item name={['score']} label="宿舍评分" initialValue={this.state.uplist.score} rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={['dormid']} label="宿舍号" initialValue={this.state.uplist.dormid}>
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
                </div>
                <br/>
            </div>
        )
    }
}export default Score;