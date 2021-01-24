import React, {Component} from 'react';
import axios from "axios";
import {message, Button, Divider, Form, Input, InputNumber, Modal, Radio, Table, DatePicker} from "antd";

const columns = [

    {
        title: '工号',
        dataIndex: 'id',
    },
    {
        title: '姓名',
        dataIndex: 'userName',
    },
    {
        title: '性别',
        dataIndex: 'sex',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
];


class Damage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectionType: 'checkbox',
            list: [],
            selectedRowsKeys: [],
            selectedRows: [],
        }
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };


    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
        axios.get('http://localhost:8089/dormitory/adminlist')
            .then(response => {
                console.log("response: ", response);
                if (response.data.state) {
                    this.setState({list: response.data.datalist});
                } else {
                    //弹窗告知用户权限
                    message.error("显示错误")
                }
                console.log("sessionStorage: ", sessionStorage.getItem("token"));
            })
            .catch(err => console.log(err))

    }

    render() {
        const rowSelection = {
            onChange: (selectedRowsKeys, selectedRows) => {
                console.log('selectedRowKeys', selectedRowsKeys);
                console.log('selectedRows: ', selectedRows);
                this.setState({selectedRowsKeys: selectedRowsKeys});
                this.setState({selectedRows: selectedRows});
            },

            getCheckboxProps: (record) => ({
                // Column configuration not to be checked
                da_id: record.da_id,

            }),
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
                    <Radio value="checkbox">Checkbox</Radio>
                </Radio.Group>

                <Divider/>

                <Table
                    rowSelection={{
                        type: this.state.selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={this.state.list}
                    rowKey={record => record.da_id}
                    pagination={{pageSize: 5}}
                />
                <br/>
            </div>
        )
    }
}

export default Damage;