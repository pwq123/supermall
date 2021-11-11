export default {
  addCart(context,payload){
    return new Promise((resolve, reject) => {
      let oldProduct = null

      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item
        }
      }
      //   2.判断oldProduct是否有值
      if(oldProduct){
        // oldProduct.count += 1;
        context.commit('addCounter',oldProduct)
        resolve('当前的商品数量+1')
        // console.log(oldProduct.count)
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })

  }
}
