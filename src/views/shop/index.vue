<template>
  <div class="wrap">
    <h4>购物车</h4>
    <div v-if="goodInCart.length>0">
      <div class="dl"  v-for="(item,index) in goodInCart" :key="index">
      <div class="dt">
        <img :src="item.pic" alt />
      </div>
      <div class="dd">
        <p>{{item.name}}</p>
        <span>单价:￥{{item.price}}</span>
        <div class="div">
          <span class="jian" @click="jian(item.id)">-</span>
          <span class="con">{{item.count}}</span>
          <span class="jia" @click="jia(item.id)">+</span>
        </div>
      </div>
    </div>
    </div>
    
     <main v-else>
      <img src="../../images/没有更多.png" alt="">
      <p>您的购物车还是空的哦!</p>
    </main>
    <div class="sum">
      <span>总数:{{total}}</span>
      <span>总价:{{totalPrice}}</span>
      <span class="btn">
        <a href="/address">去结算</a>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      goodInCart: [],
      dan: 0
    };
  },
  computed: {
    total: function() {
      return this.goodInCart.reduce(function(t, good) {
        return t + good.count;
      }, 0);
    },
    totalPrice: function() {
      return this.goodInCart.reduce(function(t, good) {
        return t + good.count * good.price;
      }, 0);
    }
  },
  methods: {
    jian: function(id) {
      //查找对应id的商品
      var findGood = this.goodInCart.find(function(good, index) {
        return good.id == id;
      });
      if (findGood) {
        if (findGood.count > 1) findGood.count--;
      }
      //存储更改后的数据到localStorage
      localStorage.setItem("goodInCart", JSON.stringify(this.goodInCart));
    },
    jia: function(id) {
      //查找对应id的商品
      var findGood = this.goodInCart.find(function(good, index) {
        return good.id == id;
      });
      if (findGood) {
        if (findGood.count < 5) findGood.count++;
      }

      //存储更改后的数据到localStorage
      localStorage.setItem("goodInCart", JSON.stringify(this.goodInCart));
    }
  },
  mounted: function() {
    this.goodInCart = localStorage.getItem("goodInCart")
      ? JSON.parse(localStorage.getItem("goodInCart"))
      : [];
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.dl {
  width: 100%;
  height: 100px;
  margin: 15px 0px;
  position: relative;
}
.dl .dt {
  width: 100px;
  height: 100px;
  background: palevioletred;
  float: left;
}
.dt img {
  width: 100%;
  height: 100%;
}
.dl .dd {
  float: left;
  height: 100px;
  width: 275px;
  white-space: nowrap; //一行显示
  overflow: hidden;
  text-overflow: ellipsis; //点点点
  line-height: 30px;
}
.div {
  display: inline-block;
  float: right;
}
.jia,
.jian {
  display: inline-block;
  height: 20px;
  width: 20px;
  border: solid 1px skyblue;
  color: skyblue;
  border-radius: 50%;
  text-align: center;
  line-height: 15px;
}
.jia {
  background: skyblue;
  color: white;
}
.con {
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}
.sum {
  width: 100%;
  height: 50px;
  background: #ccc;
  position: fixed;
  bottom: 0;
  display: flex;
  span {
    flex: 1;
    text-align: center;
    line-height: 50px;
  }
  .btn {
    width: 200px;
    background: green;
    a{
      color: white;
    }
  }
}
main{
  
  text-align: center;
  margin-top:40px; 
}
</style>