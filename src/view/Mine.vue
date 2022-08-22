<template>
  <div id="home-wrapper">
    <div class="title">发现音乐</div>
    <div class="nav">
      <div class="tab-bar">
        <span
          class="bar"
          v-for="mode in homePageNavBarList"
          :class="searched === mode.id ? 'active' : ''"
          :key="mode.id"
          @click="searched = mode.id"
        >
          {{ mode.label }}
        </span>
      </div>
      <Recomendation v-show="searched === 0" />
    </div>
  </div>
</template>

<script>
import Recomendation from "@/components/home/Recomendation.vue";
import { homePageNavBarList } from "@/js/navBarLists";
export default {
  name: "mine-music",
  components: { Recomendation },
  data() {
    return {
      searched: 0,
      homePageNavBarList,
    };
  },
  created() {},
};
</script>

<style lang="less" scoped>
#home-wrapper {
  width: 100%;
  height: 100%;
  min-width: 660px;
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
  }
  .nav {
    position: relative;
    margin-top: 5%;
    .tab-bar {
      display: flex;
      justify-content: space-evenly;
      .bar {
        font-size: 22px;
        font-weight: bold;
        cursor: pointer;
      }
      .bar.active {
        border-bottom: 2px solid var(--text-color);
      }
    }
  }
}
</style>