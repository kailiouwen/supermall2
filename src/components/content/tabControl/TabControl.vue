<template>
	<div class="tab-control">
		<div class="tab-control-item" 
					v-for="(item,index) in titles"
					:class="{active: index === currentIndex}"
					@click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		// 父组件传入数据,优先使用自己的
		props: {
			titles:{
				type: Array,
				default() {
					return []
				}
			}
		},
			
		data() {
			return {
				currentIndex: 0
			}
			
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index;
				// 子组件点击后传出
				this.$emit('tabClick',index)
			}
		}
	}
</script>

<style scoped>
	
	.tab-control {
		display: flex;
		line-height: 40px;
		font-size: 15px;
		background-color: #fff;
		text-align: center;
	}
	.tab-control-item {
		flex:1;
		
	}
	.active {
		color: var(--color-high-text);
	}

	.tab-control-item.active span {
		border-bottom: 2px solid var(--color-high-text);
	}
	
	.tab-control-item span {
		padding: 5px;
	}
</style>