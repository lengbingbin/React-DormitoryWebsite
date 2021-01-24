import React, {Component} from 'react';

class Download extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div style={{marginLeft: 50, width: 1200}}>
                <br/>
                <h3>github地址：</h3>

                <a href={"https://github.com/lengbingbin/DormitorySystem"}>https://github.com/lengbingbin/DormitorySystem</a>

                <h3></h3>

                <h3>个人博客地址：</h3>

                <a href={"https://blog.csdn.net/weixin_43896829"}>https://blog.csdn.net/weixin_43896829</a>

            </div>
        )
    }
}

export default Download;