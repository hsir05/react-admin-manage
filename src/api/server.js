import axios from 'axios';
import { baseURL} from '../envconfig/envconfig';
import { message } from 'antd';
import { removeSession } from '../util/util.js'
// getSessionToken, 
/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://localhost:8888
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
*/

export default class Server {
  axios(method, url, params){
    return new Promise((resolve, reject) => {
      if(typeof params !== 'object') params = {};
      let _option = {params:{}}
      _option = {
        method,
        url,
        baseURL: baseURL,
        timeout: 30000,
        params: null,
        data: null,
        //   headers: { accessToken: getSessionToken(),},
          headers: { Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCIsIndyaXRlIiwicmVhZCJdLCJjb21wYW55Ijoic3Rvcm10b3kiLCJleHAiOjE1NjI2OTA5MzAsImF1dGhvcml0aWVzIjpbInVtczphZG1pbjpkZWxldGUiLCJ1bXM6YWRtaW46Y3JlYXRlIiwic3lzIiwidW1zOmFkbWluOnVwZGF0ZSIsInVtczphZG1pbjpyZWFkIl0sImp0aSI6IjYyMjA3YWFmLTgwYzEtNGJmNS1hMDI0LTMxYTJiMmUwZGUzMiIsImNsaWVudF9pZCI6InN0b3JtdG95MCJ9.yg9GX6rd7jtQNJf5a0VKp5qkvwsKBzqql1lYErQsQqI', },
        withCredentials: true, //是否携带cookies发起请求
        validateStatus:(status)=>{
            return status >= 200 && status < 300;
        }
      }
      if (method === 'get' || method === 'delete') {
        _option.params = params
        _option['responseType'] = 'arraybuffer'
      } else {
          let searchParams = new URLSearchParams()
          for (let key in params) {
              searchParams.set(key, params[key])
          }
          _option.data = searchParams
      }
      axios.request(_option).then(res => {
          if (res.data.code === 600 || res.data.code === 601 || res.data.code === 602) {
              message.error(res.data.msg)
              removeSession()
              setTimeout(() => {
                  window.location.href = `http://${window.location.host}/login`
              }, 1500);
              reject()
          } else if (res.config.url === '/code/image'){
              resolve(res.data)
          }else{
              resolve(typeof res === 'object' ? res.data : JSON.parse(res.data))
          }
      },
      error => {
        if(error.response){
            reject(error.response.data)
        }else{
            reject(error)
        }
      })
    })
  }
}
