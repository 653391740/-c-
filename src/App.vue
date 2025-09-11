<script>
export default {
  name: 'App',
}
</script>

<template>
<div id="app">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<style scoped
  lang="scss">
  #app {
    height: 100vh;
  }
</style>
