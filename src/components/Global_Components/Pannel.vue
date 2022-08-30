<template>
  <div id="pannel">
    <div class="pannel-wrapper">pannel</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "pannel",
  computed: {
    ...mapState({
      playList: (state) => state.playList.playList,
      curSongs: (state) => state.playList.curSongs,
    }),
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
#pannel {
  display: none;
  width: var(--pannel-width);
  position: absolute;
  right: 0;
  height: calc(100% - var(--player-height));
  padding: 10px 14px;
  .pannel-wrapper {
    width: 100%;
    height: 50%;
    background-color: var(--sidebar-color);
    border-radius: 12px;
  }
}
</style>