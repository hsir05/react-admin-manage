import axios from "axios";
import { baseURL } from '../envconfig/envconfig';
import { removeSession } from '../util/util.js'
import { message } from "antd";


function interceptors (url) {
    let val = null
    switch (url) {
        case "/authentication/form":
            val = 'Basic c3Rvcm10b3kwOnN0b3JtdG95c2VjcmV0MA=='
            break;
        case "/code/image":
            val = null
            break;  
        default :
            val = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null
            break;
    }
    return val
}
// 请求前拦截
axios.interceptors.request.use(
    config => {
        config.headers['deviceId'] = 123456
        config.headers['Authorization'] = interceptors(config.url)
        return config;
    },
    err => {
        console.log("请求超时");
        return Promise.reject(err);
    }
);

// 返回后拦截
axios.interceptors.response.use(
    data => {
        return data;
    },
    err => {
        message.error(err.response.data.message)
        if (err.response.status === 504 || err.response.status === 404) {
            console.log("服务器被吃了⊙﹏⊙∥");
        } else if (err.response.status === 401) {
            console.log("登录信息失效⊙﹏⊙∥");
        } else if (err.response.status === 500) {
            console.log("服务器开小差了⊙﹏⊙∥");
        }
        removeSession()
        return Promise.reject(err);
    }
);

// @RequestBody请求
export const postRequestBody = (url, params) => {
    // var searchParams = new URLSearchParams()
    // for (let key in params) {
    //     searchParams.set(key, params[key])
    // }
    return axios({
        method: "post",
        url: `${baseURL}${url}`,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8"
        }
    });
};


// @RequsetParam请求
export const postRequestParam = (url, params) => {
    return axios({
        method: "post",
        url: `${baseURL}${url}`,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

export const get = (url, params, config={}) => {
    return axios({
        method: "get",
        url: `${baseURL}${url}`,
        params,
        ...config
    });
};

export const multiple = function (requsetArray, callback) {
    axios.all(requsetArray).then(axios.spread(callback));
};

