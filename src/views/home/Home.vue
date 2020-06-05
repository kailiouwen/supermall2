<template>
  <div id="home">
  	<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"><!--这个组件是betterscroll根组件，需要设置滚动高度，这里面就是滚动内容<scroll>这个区域滚动</scroll>-->
      <home-swiper :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper><!--v-bind:banners 动态数据-->
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
    <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


    



  </div><!--组件需要一个根<div>-->
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
  // 方法组件
  import {getHomeMultiData,getHomeGoods} from "network/home"
  import {debounce} from "common/utils";
  export default {
    name: "Home",
    components: {
    	NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list// ->tabClick
      }
    },
    // 保存状态 keep-alive
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
      // 1.请求轮播数据
      this.getHomeMultiData()
      // 2.请求商品数据
      this.getHomeGoods ('pop')
      this.getHomeGoods ('new')
      this.getHomeGoods ('sell')

    },
    mounted() {
      // 3.监听GoodsListItem图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.$bus.$on('itemImageLoad', () => {
          refresh()
        })

      //this.$bus.$on('itemImageLoad', () => {
        //this.$refs.scroll.refresh()
      
    },
    methods: {
      /**
       * 事件监听相关方法
      */

      // 根据点击传入index，动态决定访问 pop new sell  ->showGoods()
      tabClick(index) {
        switch(index) {
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
      backClick() {
        this.$refs.scroll.scrollTo(0,0)// 坐标 x,y time
      },
      contentScroll(position) {
          this.isShowBackTop = (-position.y) > 1000

          this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 上拉加载更多
      loadMore() {
        //console.log('上拉')
        this.getHomeGoods(this.currentType)//currentType包括3种类型数据->data(),页码也会加一
        // 加载时，由于图片是异步加载，加载数据item已经给定高度，这是需要重新定义高度（图片高度）
        //this.$refs.scroll.scroll.refresh()
      },
      swiperLoaded() {
        // 获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;//动态拿页码
        getHomeGoods(type,page).then(res => {
          //console.log(res);
          // 把res push()到data()list[]
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1//拿到数据page+1

          // 上拉加载更多之后，刷新，接着加载
          this.$refs.scroll.finishPullUp()

        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    
    position: relative;
  }
	.home-nav {
		background-color: var(--color-tint);/* --color-tint: #ff8198;*/
	  color: #fff;
  /** position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

/*
* scroll高度如何决定：已知 顶部Navbar高度44，底部导航49 
* 结论：滚动区域=整个页面-顶部+底部导航
*/
   .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

   /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>
