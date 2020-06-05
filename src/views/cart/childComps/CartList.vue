<template>
	<div class="cart-list">
		<scroll class="content" ref="scroll">
			<cart-list-item v-for="(item,index) in cartList" 
			:product="item"
			:key="index"/>

		</scroll>
	</div>
	
</template>

<script type="text/javascript">

import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

	export default {
		name: 'CartList',
		components: {
			CartListItem,
			Scroll
		},
		computed: {
			...mapGetters(['cartList'])
		},
		activated() {
			// 获取数据之后刷新，待debug
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
/*scroll滚动区域需要指定要滚到高度，scroll有一个父元素*/
.cart-list {
	height: calc(100%-44px-49px);
}
.content {
	height: 100%;
	overflow: hidden;
}
	
</style>