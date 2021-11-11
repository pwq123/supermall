<template>
  <div class="wrapper" ref="wrapp">
     <div class="content">
     <slot></slot>
  </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import ObserveDOM from '@better-scroll/observe-dom'

export default {
  name: "Scroll",
  props:{
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return{
      scroll: null
    }
  },
  mounted(){
    //1.创建sroll对象
    this.scroll = new BScroll(this.$refs.wrapp,{
     probeType: this.probeType,
     click: true,
      pullUpLoad: this.pullUpLoad
    })

    //2.监听滚动的位置
    this.scroll.on('scroll',(position) =>{
      // console.log(position)
      this.$emit('scroll',position)
    })
    console.log(this.scroll);
    this.scroll.refresh();
    //3.监听上拉事件
    // this.scroll.on('pullingUp',() =>{
    //   this.$emit('pullingUp')
    //   //console.log('上拉加载更多')
    // })


    //监听scroll滚动到底部
     if(this.pullUpLoad){
       this.scroll.on('pullingUp',()=>{
         console.log('监听滚动到底部');
         this.$emit('pullingUp')
       })

     }

  },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll.scrollTo(0, 0, time)
      },
      finishPullUp() {
       this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        console.log('----')
        this.scroll && this.scroll.refresh()

      }
    }

}
</script>

<style scoped>

</style>
