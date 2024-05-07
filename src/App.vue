<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import gogh from "./views/gogh";
export default {
  name: "App",
  components: {
    gogh
  }
};
</script>
<style>
*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
</style>
