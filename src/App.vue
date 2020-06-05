<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/><!--销毁函数-->
    </keep-alive>
  	<main-tab-bar/>
  	<!--<router-view/>这个只是占位符，你犯了个错！！！-->
  </div>
</template>

<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar'

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
