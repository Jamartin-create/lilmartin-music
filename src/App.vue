<template>
  <div id="app">
    <side-bar></side-bar>
    <main>
      <router-view></router-view>
    </main>
    <player></player>
    <pannel></pannel>
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
  font-size: 18px;
}
</style>

<style lang="less" scoped>
main {
  position: absolute;
  top: 0;
  left: var(--sidebar-width);
  height: calc(100% - var(--player-height));
  width: calc(100% - var(--sidebar-width) - var(--pannel-width));
  transition: var(--tran-03);
  padding: 10px 14px;
}

#sidebar.close ~ main {
  left: var(--sidebar-close-width);
  width: calc(100% - var(--sidebar-close-width) - var(--pannel-width));
  transition: var(--tran-03);
}

#sidebar.close ~ #player {
  left: var(--sidebar-close-width);
  width: calc(100% - var(--sidebar-close-width));
  transition: var(--tran-03);
}

@media (max-width: 1200px) {
  #pannel {
    display: none;
  }
  main {
    width: calc(100% - var(--sidebar-width));
    transition: var(--tran-03);
  }
  #sidebar.close ~ main {
    width: calc(100% - var(--sidebar-close-width));
    transition: var(--tran-03);
  }
}
</style>