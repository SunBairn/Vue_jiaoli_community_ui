import axios from 'axios'
// 根据key获取cookie值
function getCookie(name){
  var strcookie = document.cookie;//获取cookie字符串
  var arrcookie = strcookie.split("; ");//分割
  //遍历匹配
  for ( var i = 0; i < arrcookie.length; i++) {
      var arr = arrcookie[i].split("=");
      if (arr[0] == name){
          return arr[1];
      }
  }
  return null;
}
let http = axios.create({
    // 设置了默认头部地址为：http://localhost:8080/，这样调用的时候只需写访问方法即可
    baseURL: 'http://localhost:1314/',
    // 当这个为false时，不会携带cookie
    withCredentials: true,
    timeout:1000*20,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorzation': 'Bearer '+getCookie("jwttoken"),
      'id': sessionStorage.getItem("userId")
    },
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }]
  });
  
  function apiAxios(method, url, params, response) {
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
      response(res);
    }).catch(function(res){
      response(res)
      console.log(res)
    });
  }
  
  export default {
    get: function (url, params, response) {
      return apiAxios('GET', url, params, response)
    },
    post: function (url, params, response) {
      return apiAxios('POST', url, params, response)
    },
    put: function (url, params, response) {
      return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
      return apiAxios('DELETE', url, params, response)
    }
  }

  /**
 * 下载文件
 * @param {*} url: 请求地址
 * @param {*} params: 请求参数
 */
export function downFileAction(url,params){
  return axios({
    url: "http://localhost:9000",
    params: params,
    method:'get' ,
    responseType: 'blob'
  })
}
/**
 * 用于上传文件
 * @param {*} url:请求地址
 * @param {*} data:请求体数据
 */
export function fileUploadAction(data){
  return axios({
    url: "http://localhost:9000/file/upload",
    data: data,
    method:'post' ,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    timeout:1000*60*2  //上传时间2分钟
  })
}
