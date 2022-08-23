<template>
  <div id="store-list">
    <span
      class="playlist-item"
      v-for="playList in playLists"
      :key="playList.id"
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
      try {
        const res = await getUserPlayList({
          uid: this.userId,
        });
        if (res.code === 200) {
          this.playLists = res.playlist;
        }
      } catch (e) {
        console.log(e);
      } finally {
        nprogress.done();
      }
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