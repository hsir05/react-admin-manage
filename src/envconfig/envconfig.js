/**
 * 全局配置文件
 */
let baseURL;
let imgUrl = '//cangdu.org:8001/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = '/api';
}else{
  baseURL = '/api';
}


export default {imgUrl, baseURL}
