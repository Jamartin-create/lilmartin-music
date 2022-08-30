<template>
  <div id="app">
    <side-bar></side-bar>
    <main>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </main>
    <Toast></Toast>
    <player></player>
    <pannel></pannel>
  </div>
</template>

<script>
export default {
  name: "App",
  create() {},
  mounted() {
    //加载初始数据
    this.loadBasicData();
    //判断皮肤状态
    if (!this.$store.state.sys.setting.isLight) {
      document.querySelector("body").classList.add("dark");
    }
  },
  methods: {
    loadBasicData() {
      this.$store.dispatch("user/fetchUserAccount");
      this.$store.dispatch("user/fetchUserPlayList");
    },
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
  // width: calc(100% - var(--sidebar-width) - var(--pannel-width));
  width: calc(100% - var(--sidebar-width));
  transition: var(--tran-03);
  padding: 10px 14px;
}

#sidebar.close ~ main {
  left: var(--sidebar-close-width);
  // width: calc(100% - var(--sidebar-close-width) - var(--pannel-width));
  width: calc(100% - var(--sidebar-close-width));
  transition: var(--tran-03);
}

#sidebar.close ~ #player {
  left: var(--sidebar-close-width);
  width: calc(100% - var(--sidebar-close-width));
  transition: var(--tran-03);
}

@media (max-width: 1400px) {
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

<style lang="less">
.content-page {
  width: 100%;
  height: 100%;
  min-width: var(--content-min-width);
  overflow: scroll;
  padding-top: var(--content-padding-t);
  padding-left: var(--content-padding-lr);
  padding-right: var(--content-padding-lr);
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    font-size: 30px;
    height: 55px;
    line-height: 55px;
    .high-light {
      font-weight: bold;
    }
  }
  .nav {
    margin-top: 5%;
    display: flex;
    justify-content: space-evenly;
    font-size: 22px;
    div {
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    .active {
      font-weight: bold;
      border-bottom: 2px solid var(--text-color);
    }
  }
  .subpage-wrapper {
    margin-top: 3%;
  }
}
</style>
