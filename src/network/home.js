import {request} from "./request";
import {requestTabBar} from "./requireTabControl";

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export  function getHomeGoods(type,page){
  return requestTabBar({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}
