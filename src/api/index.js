import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'

const BASE = ''
// 登陆
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

/*
json请求的接口请求函数
 */
export const reqWeather = () => {

    return new Promise((resolve, reject) => {
        //city=440100根据所在城市更改码
        const url = 'https://restapi.amap.com/v3/weather/weatherInfo?city=440100&key=e9220ae31c0e1dbf1f2f6d4b869cf684'
        // 发送jsonp请求
        jsonp(url, {}, (err, data) => {
            console.log('jsonp()', err, data)
            // 如果成功了
            if (!err && data.status === '1') {
                // 取出需要的数据
                //const {dayPictureUrl, weather} = data.lives[0].weather
                const {weather} = data.lives[0].weather
                //resolve({dayPictureUrl, weather})
                resolve({weather: data.lives[0].weather})
            } else {
                // 如果失败了
                message.error('获取天气信息失败!')
            }
        })
    })
}
// reqWeather('北京')