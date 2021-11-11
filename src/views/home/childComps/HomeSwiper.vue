<template>
  <Swiper>
    <!--  <swiper-item v-for="(item,index) in banners" :key="index">-->
    <swiper-item v-for="(item,index) in banners">
      <a :href="item.link"></a>
      <img :src="item.image" alt="" @load="imageLoad">

    </swiper-item>

  </Swiper>
</template>

<script>
import {Swiper,SwiperItem} from "../../../components/common/swiper";
export default {
  name: "HomeSwiper",

  props:{
    banners: {
      type: Array,
      default(){
        return []
      }
    }
  },

  components :{
    Swiper,
    SwiperItem
  },

  data(){
    return{
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        console.log('轮播图加载完成');
        this.$emit("swiperImageLoad")
        this.isLoad = true  //修改状态，让事件只发出一次；
      }
    }
  },
}
</script>

<style scoped>

</style>
