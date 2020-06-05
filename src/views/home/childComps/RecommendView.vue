<template>
	<div class="recommend">
		<div class="recommend-item" v-for="item in recommends">
			<a :href="item.link">
				<img :src="item.image" alt="">
				<span>{{item.title}}</span>
			</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'RecommendView',
		props: {
			recommends: {
				type: Array,
				required:true
			}
		}
	}
</script>
<style scoped>
	.recommend {
		display: flex;/*均等分*/
		margin-top: 10px;
		font-size:14px;
		padding-bottom: 30px;
		border-bottom:10px solid #eee;

	}
	.recommend-item {
		flex: 1;
		text-align: center;
	}
	.recommend img {
		width:80px;
		height: 80px;
		margin-bottom: 10px;

	}
</style>