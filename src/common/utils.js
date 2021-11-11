export function debounce(func,delay){
  let timer = null   //通过timer记录是否有延时器
  return function(...args){
    if(timer)  clearTimeout(timer)

    timer = setTimeout(() =>{
      func.apply(this,args)
      //  备注： func是this.$refs.scroll.scroll.refresh()
    },delay)
  }
}
