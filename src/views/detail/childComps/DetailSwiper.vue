<template>
<div class="detail-swiper">
  <swiper class="Swiper1">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import Swiper from "../../../components/common/swiper/Swiper";
import SwiperItem from "../../../components/common/swiper/SwiperItem";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
     topImages: {
      type: Array,
      default() {
        return []
      }
     }
  }
}
</script>

<style scoped>
.Swiper1 {
  height: 300px;
  overflow: hidden;
}
</style>
