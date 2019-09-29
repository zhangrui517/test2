<template>
  <div class="wrap">
    <div class="banner">
      <div class="tu">
        <img src="../../images/avatar.jpg" alt />
      </div>
    </div>
    <div class="text">
      <h2>爱尚精品屋</h2>
      <p>公告:欢迎观临,流行爆款库存有限请尽早下单,谢谢.</p>
    </div>
    <div class="line">
      <span
        class="nav-item"
        v-for="(item,index) in navList"
        :key="index"
        @click="sort(index)"
      >{{item}}</span>
    </div>
    <div class="content">
      <div class="dl" v-for="(item,index) in allList" :key="index">
        <div class="dt">
          <img :src="item.pic" alt />
        </div>
        <div class="dd">
          <p>{{item.name}}</p>
          <p>已售:{{item.buyCount}}</p>
          <p>单价:￥{{item.price}}</p>
        </div>
        <div class="btn" @click="addToCart(item)">加入购物车</div>
      </div>
    </div>
    <a href="/shop">
      <div class="cart">
        <img src="../..//images/cart.png" alt="">
        <span class="num">{{total}}</span>
      </div>
    </a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dlIndex: 0,
      navList: ["价格升序↑", "价格降序↓", "销量升序↑", "销量降序↓"],
      allList: [],
      goodInCart:[]
    };
  },
  computed:{
    total:function(){
     return this.goodInCart.reduce(function(t,i){ return t+i.count },0);
    }
  },
  methods: {
    //检测index按id检测类型
    sort: function(index) {
      this.dlIndex = index;
      if (index == 0) {
        this.allList.sort(function(a, b) {
          return a.price - b.price;
        });
      } else if (index == 1) {
        this.allList.sort(function(a, b) {
          return b.price - a.price;
        });
      } else if (index == 2) {
        this.allList.sort(function(a, b) {
          return a.buyCount - b.buyCount;
        });
      } else {
        this.allList.sort(function(a, b) {
          return b.buyCount - a.buyCount;
        });
      }
    },
     addToCart:function(good)
    {
      //将当前点击的商品加入购物车(保存到localStorage)
      var goodInCart = localStorage.getItem("goodInCart")? JSON.parse(localStorage.getItem("goodInCart")) : [];

      var findGood = goodInCart.find(function(item,index){
        return good.id == item.id
      });

      console.log(findGood);
      
      //如果商品是第一次加入购物车,商品数量为1
      if(!findGood)
      {
        good.count = 1; //????
        goodInCart.push(good);
      }
      //如果商品是再次加入购物车,商品数量加1
      else
      {
        findGood.count++; 
      }


      //将goodInCart保存到 data
      this.goodInCart = goodInCart;
      console.log(goodInCart);
      
      //将goodInCart保存到 localStorage
      localStorage.setItem('goodInCart',JSON.stringify(goodInCart));
    }
  },
  mounted: function() {
    axios.get("https://yantianfeng.com/api/goodList").then(res => {
      console.log(res.data);
      this.allList = res.data.goodList;
    });
    this.goodInCart = localStorage.getItem("goodInCart")? JSON.parse(localStorage.getItem("goodInCart")) : [];
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.banner {
  height: 200px;
  background-image: url("../../images/banner-2.png");
  background-size: cover;
  background-position-x: center;
  position: relative;
}
.tu {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 78%;
  left: 38%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.text {
  margin-top: 50px;
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 40px;
  h2 {
    font-weight: 400;
  }
  p {
    font-size: 14px;
    color: rgb(85, 83, 83);
  }
}
.line {
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: 40px;
  border-bottom: solid 1px #ccc;
  span {
    flex: 1;
    text-align: center;
  }
}
.content {
  margin-top: 20px;
  width: 100%;
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
  }
}
.btn {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: red;
  color: white;
  text-align: center;
  padding: 5px 15px;
  font-size: 14px;
  .btn:active {
    opacity: 0.3;
  }
}
.nav-item:active {
  color: red;
}
.cart{
  position: fixed;
  bottom: 30px;
  right: 15px;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.cart img{
  width: 60%;
}
.cart .num{
  position: absolute;
  right: 0;
  top: 0;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
</style>