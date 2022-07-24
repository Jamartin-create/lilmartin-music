<template>
  <div id="app">
    <side-bar id="sider"></side-bar>
    <!-- <router-link :to="{ name: 'mine' }">我的</router-link>
    <router-link to="/login">登录</router-link> -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>