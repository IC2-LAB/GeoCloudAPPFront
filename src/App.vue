<template>
  <div id="app1">
    <router-view class="Router"></router-view>
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin:0; padding: 0}
html, body, #app1{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
