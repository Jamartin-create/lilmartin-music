<template>
  <div id="store-list">
    <span
      class="playlist-item"
      v-for="playList in playLists"
      :key="playList.id"
    >
      <div class="cover-image">
        <img :src="playList.coverImgUrl" alt="" />
      </div>
      <span class="title">{{ playList.name }}</span>
      <span class="creator"> by {{ playList.creator.nickname }}</span>
    </span>
  </div>
</template>

<script>
import { getUserPlayList } from "@/api/user";
import { getUserPlayListMock } from "@/api/mock";
import nprogress from "nprogress";
export default {
  props: ["userId"],
  data() {
    return {
      playLists: [],
    };
  },
  mounted() {
    this.getPlayList();
  },
  methods: {
    async getPlayList() {
      nprogress.start();
      const res = await getUserPlayListMock({
        uid: this.userId,
      });
      nprogress.done();
      if (res.code === 200) {
        this.playLists = res.playlist;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#store-list {
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  .playlist-item {
    width: calc(var(--content-min-width) / 4);
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .cover-image {
      width: calc(var(--content-min-width) / 4 - 20px);
      height: calc(var(--content-min-width) / 4 - 20px);
      border-radius: 6px;
      img {
        border-radius: 6px;
        width: calc(var(--content-min-width) / 4 - 20px);
      }
    }
    .title,
    .creator {
      width: calc(var(--content-min-width) / 4 - 20px);
      align-self: flex-start;
      margin-left: 10px;
      font-size: 14px;
    }
    .title {
      margin-top: 5px;
    }
    .creator {
      margin-top: 3px;
      opacity: 0.6;
    }
  }
}
</style>