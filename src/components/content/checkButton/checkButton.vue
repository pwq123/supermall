<template>
<div class="check-Button" :class="{check: isChecked}">
  <img src="../../../../src/assets/img/cart/tick.svg" alt="">
</div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    isChecked:{
      type:Boolean,
      default: false

    }
  }
}
</script>

<style scoped>
.check-Button{

  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: red;
  background-color: red;
}
</style>
