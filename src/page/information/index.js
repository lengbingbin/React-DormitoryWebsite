import React, {Component} from 'react';

class Information extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <div style={{marginLeft: 50, width: 1200}}>
                <br/>
                <h3>注意事项：</h3>
                <h1>1.损耗物品信息中dormid是外键，要注意只有存在的宿舍才能插入</h1>
                <h1>2.访客信息中studentid是外键，要注意只有存在的学生号才能插入。并且人数涉及首页的统计图统计</h1>
                <h1>3.触发器的设计是在宿舍信息删除时，宿舍评分信息也会级联删除</h1>
                <h1>4.宿舍信息中dormadmind,D_id是唯一性约束，不可以出现相同的dormadmind,D_id</h1>
                <br/><br/>
                <h3>最后：</h3>
                <h1>该项目为学习了react之后用于练手前后端分离的项目，还有很多地方需要改进，后续会持续更新</h1>
                <h1>本项目仅供学习使用，有什么建议还请多多指点</h1>
                <h1>如果需要引用，还请贴上本项目地址，标明引用</h1>
            </div>
        )
    }
}

export default Information;