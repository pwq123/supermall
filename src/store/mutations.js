export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中每个方法
  addCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload){
    payload.checked = true
    this.state.cartList.push(payload)
  }
}
