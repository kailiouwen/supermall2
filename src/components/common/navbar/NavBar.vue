<template>
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'NavBar'
	}
</script>

<style scoped>
	.nav-bar {
		display: flex;
		height: 44px;/*撑开高度*/
		line-height: 44px;
		text-align: center;

	}
	.left {
		width: 60px;
	}
	.right {
		width: 60px;
	}
	.center {
		flex: 1;/*去除left 和 right 剩下的Xpx*/
	}
</style>