<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{length}})
      </div>
    </nav-bar>
     <!-- 商品的列表-->
    <cart-list></cart-list>
     <!-- 底部汇总   -->
    <cart-bottom-bar></cart-bottom-bar>


  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import {mapGetters} from 'vuex';
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      length: 'cartLength'
    })
    }

}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-size: 15px;
  color: lavender;
}

</style>
