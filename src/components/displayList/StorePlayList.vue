<template>
  <div id="store-list">
    <span
      class="playlist-item"
      v-for="playList in playLists"
      :key="playList.id"
      @click="toPlayListPage(playList.id)"
    >
      <div class="store-cover-image">
        <img :src="playList.coverImgUrl" alt="" />
      </div>
      <span class="store-title">{{ playList.name }}</span>
      <span class="store-creator"> by {{ playList.creator.nickname }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: ["playLists"],
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    toPlayListPage(playListId) {
      this.$bus.$emit("replaylist", playListId);
      this.$router.push({ name: "playList", query: { id: playListId } });
    },
  },
};
</script>

<style lang="less" scoped>
#store-list {
  display: flex;
  flex-wrap: wrap;
  transition: var(--tran-03);
  .playlist-item {
    width: calc(var(--content-min-width) / 4);
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .store-cover-image {
      width: calc(var(--content-min-width) / 4 - 20px);
      height: calc(var(--content-min-width) / 4 - 20px);
      border-radius: 6px;
      img {
        border-radius: 6px;
        width: calc(var(--content-min-width) / 4 - 20px);
      }
    }
    .store-title,
    .store-creator {
      width: calc(var(--content-min-width) / 4 - 20px);
      align-self: flex-start;
      margin-left: 10px;
      font-size: 14px;
    }
    .store-title {
      margin-top: 5px;
    }
    .store-creator {
      margin-top: 3px;
      opacity: 0.6;
    }
  }
}
</style>