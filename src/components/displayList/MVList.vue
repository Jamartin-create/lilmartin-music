<template>
  <div id="mv-list">
    <span class="mvlist-item" v-for="mvList in mvLists" :key="mvList.vid">
      <div class="mv-cover-image">
        <img :src="`${mvList.coverUrl}?param=464y240`" alt="" />
      </div>
      <span class="mv-title">{{ mvList.title }}</span>
      <span class="mv-creator"> by {{ mvList.creator[0].userName }}</span>
    </span>
  </div>
</template>

<script>
import { getUserMVListMock } from "@/api/mock";
import { getUserMvList } from "@/api/user";
import nprogress from "nprogress";

export default {
  data() {
    return {
      mvLists: [],
    };
  },
  mounted() {
    this.getUserMvList();
  },
  methods: {
    async getUserMvList() {
      nprogress.start();
      const res = await getUserMvList();
      nprogress.done();
      if (res.code === 200) {
        this.mvLists = res.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#mv-list {
  display: flex;
  flex-wrap: wrap;
  .mvlist-item {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    width: 30%;
    .mv-cover-image {
      img {
        border-radius: 8px;
        width: 100%;
      }
    }
    .mv-title,
    .mv-creator {
      width: calc(100% - 20px);
      overflow: hidden;
      text-overflow: ellipsis;
      align-self: flex-start;
      margin-left: 10px;
      font-size: 14px;
    }
    .mv-title {
      margin-top: 5px;
    }
    .mv-creator {
      margin-top: 3px;
      opacity: 0.6;
    }
  }
}
</style>