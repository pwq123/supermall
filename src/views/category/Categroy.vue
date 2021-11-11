<template>
  <div class="categ">
<ul>
  <li>分类列表1</li>
  <li>分类列表2</li>
  <li>分类列表3</li>
  <li>分类列表4</li>
  <li>分类列表5</li>
  <li>分类列表6</li>
  <li>分类列表7</li>
  <li>分类列表8</li>
  <li>分类列表9</li>
  <li>分类列表10</li>
  <li>分类列表11</li>
  <li>分类列表12</li>
  <li>分类列表13</li>
  <li>分类列表14</li>
  <li>分类列表15</li>
  <li>分类列表16</li>
  <li>分类列表17</li>
  <li>分类列表18</li>
  <li>分类列表19</li>
  <li>分类列表20</li>

</ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Categroy",
  data(){
    return{
      scroll: null
    }
  },
  created() {

  },
  mounted(){
    //输出代码看是否在当前生命周期有执行
    // console.log(document.querySelector('.categ'))
    this.scroll = new  BScroll(document.querySelector('.categ'),{
      probeType:3,
      pullUpLoad: true

    })
    //滑动显示当前坐标
   this.scroll.on('scroll',(position) =>{
     console.log(position);
   })
    this.scroll.on('pullingUp',() =>{
      console.log('上拉加载更多');
    })


  }
}
</script>

<style scoped>
.categ{
  height: 150px;
  background-color: red;
  /*overflow-y: scroll;*/
}

</style>
