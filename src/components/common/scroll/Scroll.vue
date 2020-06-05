<!--
<template>
	<div class="wrapper">
		<div class="content"><这个是scroll滚动区域->Home.vue->  <scroll></scroll>
			<slot></slot>
		</div>
	</div>
</template>
-->
<template>
  <div class="wrapper" ref="wrapper"><!--ref类似id，通过绑定div可以获取到该元素对象，组件同理-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
  

  export default {
    name: "Scroll",
    // 接受Home.vue 传入的参数值
    props: {
    	probeType: {// 监听是否滚动，home.vue传值  有 0不监听 1 2 3监听，这是betterscroll中一个属性
    		type: Number,
    		default: 0
    	},
    	pullUpLoad: {
    		type: Boolean,
    		default: false
    	}
    },
    data() {
    	return {
    		scroll: null,
    		message: '哈哈'
    	}
    },
    // 生命周期函数，组件挂载
    mounted() {
    	// 1.创建BScroll(el,option)对象,动态传入option参数
    	this.scroll = new BScroll(this.$refs.wrapper,{
    		click: true,
    		probeType: this.probeType,// 0 1 2 3
    		pullUpLoad: this.pullUpLoad// 布尔



    		//probeType: this.
    	})
    	// 2.监听滚动位置

        if (this.probeType === 2 || this.probeType === 3){
            this.scroll.on('scroll', (position) => {
            //console.log(position);
            // 自定义事件，回调把position传出去
            this.$emit('scroll',position)
            })
        }
    	
    	// 3.监听上拉事件
        if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
            })
        }
    	
    },
    methods: {
    	// Backtop点击返回顶部事件
    	scrollTo(x, y, time=300) {
    		 this.scroll && this.scroll.scrollTo(x,y,time)
    	},
        finishPullUp() {
            this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll && this.scroll.refresh()//逻辑与，有时数据获取过快，来不及获取scroll,也就无法获取refresh(),此时调用报错
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    }

}

</script>

<style scoped>

</style>
