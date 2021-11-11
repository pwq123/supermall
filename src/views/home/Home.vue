<template>
<div id ="home" class="wrapper">
  <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
  <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabfixed"></tab-control >
  <scroll class="content" ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="showMore">
  <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
  <recommend-view :recommends ="recommends" />
  <feature-view></feature-view>
  <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control >
  <goods-list :goods="goods[currentType].list"></goods-list>

  </scroll>
  <back-top @click.native="backClick" v-show="isShowbackTop" ></back-top>
</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
// import NavBar from "components/common/navbar/NavBar";
import NavBar from "../../components/common/navbar/NavBar";
import GoodsList from "../../components/content/goods/GoodsList";

import {getHomeMultidata} from "../../network/home";
import {getHomeGoods} from "../../network/home";
import {debounce} from "../../common/utils";
// import Swiper from "../../components/common/swiper/Swiper";
// import Swiperltem from "../../components/common/swiper/Swiperltem";

import FeatureView from "./childComps/FeatureView";
import TabControl from "../../components/content/tabControl/TabControl";
import RecommendView from "./childComps/RecommendView";

import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

export default {
  name: "home",

  components:{
    GoodsList,
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
    data(){
      return {
        banners: [],
       recommends:[],
        goods: {
          'pop':  {page:0,list: []},
          'new': {page:0,list: []},
          'sell': {page:0,list: []},
        },
        currentType: 'pop',
        isShowbackTop: false,
        tabOffsetTop: 0,
        isTabfixed: false,
         saveY : 0
      }
    },
   destroyed() {
    console.log('home destroyed')
   },
  activated() {
    console.log('home activated')
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,1000)
  },
  deactivated() {
     // console.log('home deactivated')
       this.saveY = -1000

    // this.saveY =  this.$refs.scroll.scroll.y

    //2.取消全局事件的监听
    this.$bus.$off('itemImgLoad',)

  },

  created(){
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('sell')
    this.getHomeGoods('new')




    },
  //3.监听item中图片加载完成
    mounted() {


       //1.图片加载完成的事件监听

       const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$bus.$on('itemImageLoad',() =>{
        refresh()
        console.log('-----');

        // this.$refs.scroll.scroll.refresh()
      })


      //2.获取tabControl的offsetTop
     // this.tabOffsetTop = this.$refs.tabControl
      console.log(this.$refs.tabControl2.$el.offsetTop)
    },
  methods:{
      /*
      *   事件监听相关的方法
      * */

     tabClick(index){
      // console.log(index)
         switch (index){
        case 0:
          this.currentType = 'pop'
             break

        case 1:
          this.currentType = 'new'
             break
        case 2:
          this.currentType = 'sell'
             break
         }
         this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

     },
     backClick(){
       console.log('backClick');
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo()
     },
     contentScroll(position){
       //1.判断backTop是否显示
       this.isShowbackTop = -position.y > 1000
     // 2。判断tabcontrol是否吸顶；(position:fixed)
       this.isTabfixed = (-position.y) > this.tabOffsetTop
     },
     //3.监听滚动到底部
     showMore(){
      console.log('上拉加载更多')
       this.getHomeGoods(this.currentType)
     },
    swiperImageLoad(){
         // console.log(this.$refs.tabControl.$el.offsetTop);
         this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
      // /**
      //  * 网络请求相关的方法
      //  */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
        console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
     // getHomeGoods(type) {
     //    // 获取请求分类对应的当前page页数
     //   const page = this.goods[type].page +1
     //   // 调用商品查询请求，传入查询的商品类型和page页数
     //   getHomeGoods(type, page).then(res => {
     //     // 将每次请求获取到的商品数据叠加式添加到list数组中
     //     //...res.data.list：是push函数提供的可变参数。
     //     this.goods[type].list.push(...res.data.list) //更新当前商品类型对应的page页数。
     //      this.goods[type].page +=1
     //   })
     //   }
     getHomeGoods(type){
       const page = this.goods[type].page + 1
       getHomeGoods(type,page).then(res =>{
          console.log(res)
          this.goods[type].list.push(...res.data.data.list)
         this.goods[type].page +=1
        this.$refs.scroll.finishPullUp()
       })
     }
   }
}
</script>
//scoped作用域的意思
<style scoped>
#home {
  /*padding-top: 44px;*/
   height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top:0;*/
  /*z-index:9;*/

}
/*.tab-control {*/
/* !*sticky，在原生的滚动中有作用，但是现在封装了一个better-srcoll,就不起作用了；在屏幕范围（viewport）时该元素的位置并不受到定位影响*!*/
/*  position: sticky;*/
/*  top: 24px;*/
/*  z-index: 9;*/
/*}*/
.tab-control{
  position: relative;
  z-index: 9;

}

.content {
  height: calc(100% - 93px);
  /*background-color: red;*/
   overflow: hidden;
  /*margin-top: 44px;*/


}
</style>
