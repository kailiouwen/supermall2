<template>
	<div></div>
</template>

<script>
	import GoodsListItem from 'components/content/goods/GoodsListItem'
	export default {
		name: "DetailRecommendInfo",
		components: {
			GoodsListItem
		},
		props: {
			recommendList: {
				type: Array
			}
		}
	}
</script>

<style scoped></style>