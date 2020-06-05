<template>
    <div class="slide">
      <slot></slot>
    </div>
</template>

<script>
	export default {
		name: "Slide"
	}
</script>

<style scoped>
  .slide {
    width: 100%;
    flex-shrink: 0;/*讲解https://www.runoob.com/cssref/css3-pr-flex-shrink.html*/
  }

  .slide img {
    width: 100%;
  }
</style>
