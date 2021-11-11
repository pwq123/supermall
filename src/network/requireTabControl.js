import axios from "axios";

export function requestTabBar(config){
//  1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout: 3000
  })
  instance.interceptors.request.use(config =>{
    return config
  },err =>{
    console.log(err)
  });
  instance.interceptors.response;
  return instance(config)
}
