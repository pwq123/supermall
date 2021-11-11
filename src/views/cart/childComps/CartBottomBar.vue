<template>
<div class="bottom-bar">
  <div class="check-content">
  <check-button  :isChecked="isSelectALll" class="check-button" @click.native="checkClick"></check-button>
    <span>全选</span>
  </div>
  <div class="price">
    合计：{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去计算({{checkLength}})

  </div>


</div>
</template>

<script>
import checkButton from "../../../components/content/checkButton/checkButton";
export default {
  name: "CartBottomBar",
  components:{
    checkButton
  },
  props:{
    isChecked:{
      type: Boolean,
      default: false
    }
  },
  methods:{
   checkClick() {
     if(this.isSelectALll){  //全部选中
       this.$store.state.cartList.forEach(item => item.checked = false)
     } else { //部分或者全部选中
       this.$store.state.cartList.forEach(item => item.checked = true)
     }
     console.log('---');

   },
    calcClick(){
   if(!this.isSelectALll){
     this.$toast.show('请选择购买的商品',2000)
   }
    }
  },
  computed:{
    totalPrice(){
      return '¥' + this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.price * item.count
      },0).toFixed(2)

    },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length

    },
    isSelectALll(){
      // if (this.$store.state.cartList.length == 0)  return false
      // return  !(this.$store.state.cartList.filter(item => !item.checked).length)
      if (this.$store.state.cartList.length == 0)  return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;

}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 70px;

}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
 margin-left: 20px;
  flex: 1;
}
.calculate {
 width: 100px;
  background-color: red;
  color: white;
  text-align: center;
}

</style>
