<template>
<div id="detail" >
 <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <div>{{$store.state.cartList.length}}</div>
  <detail-swiper :top-images="topImages"></detail-swiper>
  <detail-base-info :goods="goods"></detail-base-info>
  <detail-shop-info :shop="shop"></detail-shop-info>
   <detail-goods-info  :detail-info="detailInfo"></detail-goods-info>
    <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>

  </scroll>
  <back-top @click.native="backClick" v-show="isShowbackTop" ></back-top>
  <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  <Toast :message="message" :show="show"></Toast>
</div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import BackTop from "../../components/content/backTop/BackTop";

import {getDetail,getRecommend, Goods, GoodsParam, Shop} from "../../network/detail";
import Scroll from "../../components/common/scroll/Scroll";
import Toast from "../../components/common/toast/Toast";
import GoodsList from "../../components/content/goods/GoodsList";
import {debounce} from "../../common/utils";
import {mapActions} from 'vuex'
export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailParamInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data(){
    return {
     iid: null,
     topImages: [],
     detailInfo: {},
     goods: {},
     shop: {},
     paramInfo: {},
     commentInfo:{},
     recommends: [],
     themeTopYs: [],
     getThemeTopY: null,
      isShowbackTop: false,
      message: '',
      show:''
    }

  },
  created() {

    //1.保存传人的iid
    this.iid = this.$route.params.id
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res =>{
       console.log(res)
      //1.获取顶部的图片轮播数据
      this.topImages = res.data.result.itemInfo.topImages
      console.log(this.topImages)
      //2.获取商品信息
      this.goods = new Goods(res.data.result.itemInfo,res.data.result.columns,res.data.result.shopInfo.services)
      //3.获取店铺信息
      this.shop = new Shop(res.data.result.shopInfo)
    //  4.保存商品的详情数据
      this.detailInfo = res.data.result.detailInfo
    //  5.保存商品参数
      this.paramInfo = new GoodsParam(res.data.result.itemParams.info,res.data.result.itemParams.rule);
    //   6，保存商品的评论信息
      if (res.data.result.rate.cRate !== 0){
        this.commentInfo = res.data.result.rate.list[0]
      }

       // this.$nextTick(() =>{
       //   //值不对，图片没有计算在内
       //   this.themeTopYs = []
       //   this.themeTopYs.push(0);
       //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
       //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
       //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
       //   console.log(this.themeTopYs);
       //
       // })


    })
    //3.请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.data.list
    })

   this.getThemeTopY = debounce(()=>{

       },100)

  },
  updated() {
    // 获取需要的四个offsetTop
    this.getOffsetTops()
  },
  // mounted() {
  // },

  methods:{
    // ...mapActions(['addCart']),
    ...mapActions({
      add:'addCart'
    }),

    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY()

    },
    addToCart() {
      console.log("-----");
      const  product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc =  this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      console.log(product)
    //  2.将商品添加到购物车里
    //   this.$store.commit('addCart',product)

      this.add(product).then(res =>{
        // this.show = true;
        // this.message = res;
        //
        // setTimeout(() =>{
        //  this.show = false;
        //  this.message = ''
        // },1500)

        this.$toast.show(res)
        console.log(this.$toast)
      })
      // this.$store.dispatch('addCart',product).then(res =>{
      //   console.log(res)
      // })
    },
    titleClick(index){
      console.log(index)

    this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index],100)
    },
    getOffsetTops(){
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
    },
    contentScroll(position){
    // console.log(position)
    //获取Y值
      const positionY = - position.y
    //  2。positonY和主题中值进行对比
      for (let i = 0;i< this.themeTopYs.length-1; i++){
          if(this.currentIndex != i && (positionY >this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i;
              console.log(this.currentIndex);
              this.$refs.nav.currentIndex = this.currentIndex
          }
        //  是否显示回到顶部；
        this.isShowbackTop = -position.y > 1000
        // console.log(i)
        // if(((i < this.themeTopYs.length - 1
        //   && positionY > this.themeTopYs[i])
        //   && positionY < this.themeTopYs[i+1]) || (i === length - 1  && positionY > this.themeTopYs[i])){
        // this.currentIndex = i;
        //   console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
// }

      }
    },
    backClick(){
      console.log('backClick');
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo()
    },
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
 height: calc(100% - 44px);
 /*overflow: hidden;*/
}
.detail-nav{
  position: relative;
  z-index: 9;
 background-color: #fff;

}
</style>
