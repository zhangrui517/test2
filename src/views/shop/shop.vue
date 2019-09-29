<template>
  <div class="wrap">
    <h4>购物车</h4>
    <main>
      <img src="../../images/没有更多.png" alt="">
      <p>您的购物车还是空的哦!</p>
    </main>
     <div class="sum">
            <span>总数:14</span>
            <span>总价</span>
            <span class="btn">去结算</span>
          </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrap{
  width: 100%;
  height: 100%;
}
main{
  
  text-align: center;
  margin-top:40px; 
}
.sum{
      width: 100%;
      height: 50px;
      background: #ccc;
      position: fixed;
      bottom: 0;
      display: flex;
      span{
        flex: 1;
        text-align: center;
        line-height: 50px;
      }
      .btn{
        background: green;
      }
      
    }
</style>