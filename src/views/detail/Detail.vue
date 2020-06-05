<template>
	<div id="detail">
		<div v-for="item in $store.state.cartList"><!--{{$store.state.cartList}}-->
			<!--{{$store.state.length}}-->
			<!--{{item}}-->
		</div>
		<detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
		<scroll class="content">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			<detail-param-info ref="param" :param-info="paramInfo"/>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list ref="recommend" :goods="recommend"/>
		</scroll>
		<detail-bottom-bar @addCart="addCart"/>
		
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'
	import GoodsList from 'components/content/goods/GoodsList'
	import DetailBottomBar from './childComps/DetailBottomBar'

	import Scroll from 'components/common/scroll/Scroll'

	import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'

	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			Scroll
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommend: [],
				themeTops: []
			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.params.iid

			// 2. 根据iid请求详情页详情数据数据，并打印
			getDetail(this.iid).then(res => {
				console.log(res);
				// 2.1 DetailSwiper.vue获取轮播图数据topImages
				const data = res.result;
				this.topImages = data.itemInfo.topImages

				// 2.2 DetailBaseInfo.vue获取商品信息,由于数据乱，需要整合->datail.js
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

				// 2.3 获取店铺信息对象
				this.shop = new Shop(data.shopInfo)

				// 2.4 获取参数信息
				this.detailInfo = data.detailInfo;

				// 2.5 获取产品尺寸信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

				// 2.6 获取评论信息，判断是否有数据
				if (data.rate.list) {
					this.commentInfo = data.rate.list[0];
				}	
			})

			// 3. 请求详情页推荐数据
			getRecommend().then(res => {
				this.recommend = res.data.list
			})

			},
		
		methods: {
      imageLoad() {
        //this.$refs.scroll.refresh()
        this.themeTops = []

					this.themeTops.push(0);
					this.themeTops.push(this.$refs.param.$el.offsetTop);
        	this.themeTops.push(this.$refs.comment.$el.offsetTop);
        	this.themeTops.push(this.$refs.recommend.$el.offsetTop);
        	// 获取所有子组件offsetTop
        	console.log(this.themeTops);
      },
      titleClick(index) {
      	console.log(index);
      	// 这里有个bug，无法读取scroll,已经导入，Home页面可以获取scroll
      	this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
      addCart() {
      	// 1.获取购物车需要的展示信息
      	const product = {}
      	product.image = this.topImages[0];
      	product.title = this.goods.title;
      	product.desc = this.goods.desc;
      	product.price = this.goods.newPrice;
      	product.iid = this.iid;

      	// 2.将商品添加进购物车->vuex
      	//this.$store.cartList.push(product)不建议，vuex原则在mutation修改数据
      	//this.$store.commit('addCart', product)

      	// 使用action处理数据逻辑
      	this.$store.dispatch('addCart', product)

      }
      
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

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
	

</style>