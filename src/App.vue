<template>
  <div id="app">
    <side-bar></side-bar>
    <main>
      <router-view></router-view>
    </main>
    <!-- <player></player> -->
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //判断皮肤状态
    if (!this.$store.state.sys.data.isLight) {
      document.querySelector("body").classList.add("dark");
    }
  },
};
</script>

<style>
@import url(@/assets/css/global.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style lang="less" scoped>
main {
  position: absolute;
  top: 0;
  left: 250px;
  height: 100vh;
  width: calc(100% - 250px);
  transition: var(--tran-03);

  padding: 10px 14px;
}
#sidebar.close ~ main {
  left: 88px;
  height: 100vh;
  width: calc(100% - 88px);
  transition: var(--tran-03);
}
</style>