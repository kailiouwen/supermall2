<template>
  
  <div class="cart">
  	<!--1.顶部-->
  	<nav-bar class="nav-bar">
  		<div slot="center">购物车{{length}}</div><!--{{$store.state.cartList.length}}获取购物车商品数量-->
  	</nav-bar>

  	<!--2.商品页面，滚动区域-->
  	<cart-list></cart-list>


  </div>
  

</template>



<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'

import { mapGetters } from 'vuex'//getters辅助函数
  export default {
    name: "Cart",
    components: {
    	NavBar,
    	CartList
    },
    computed: {
    	// mapGetters有两中语法 ,数组和对象
    	//...mapGetters(['cartLength','cartList'])
    	...mapGetters({
    		length:'cartLength',
    		list: 'cartList'
    	})
    }
  }
</script>

<style scoped>
.cart {
	height: 100vh;/*scroll父元素，固定高度*/
}
.nav-bar {
	background-color: var(--color-tint);
	font-weight: 700;
	color:#fff;

}

</style>
