<template>
  <div id="search">
    <div class="header">
      <span class="title">搜索</span>
      <span class="keywords">“{{ keywords ? keywords : "" }}”</span>
    </div>
    <div class="nav">
      <div class="tab-bar">
        <span
          class="bar"
          v-for="mode in searchType"
          :class="searched === mode.id ? 'active' : ''"
          :key="mode.id"
          @click="searched = mode.id"
        >
          {{ mode.label }}
        </span>
      </div>
      <PlayList v-if="searched === 0" :playList="playList" />
      <AlbumList v-if="searched === 1" />
    </div>
  </div>
</template>

<script>
import { searchByKeywords } from "@/api/playlist";
import PlayList from "@/components/displayList/PlayList.vue";
import AlbumList from "@/components/displayList/AlbumList.vue";
import { searchNavBarList } from "@/js/navBarLists";
import nprogress from "nprogress";

export default {
  components: { PlayList, AlbumList },
  data() {
    return {
      keywords: "",
      searched: 0,
      searchType: searchNavBarList,
      playList: [],
    };
  },
  mounted() {
    this.$bus.$on("research", async (keywords) => {
      this.keywords = keywords;
      this.searchByKeys();
    });
    this.keywords = this.$route.query.keywords;
    this.searchByKeys();
  },
  methods: {
    async searchByKeys() {
      nprogress.start();
      const res = await searchByKeywords({
        keywords: this.keywords,
        limit: 40,
        offset: 1,
      });
      nprogress.done();
      if (res.code === 200) {
        this.playList = res.result.songs;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#search {
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
  .header {
    font-size: 30px;
    height: 55px;
    line-height: 55px;
    .keywords {
      font-weight: bold;
    }
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
        border-bottom: 2px solid black;
      }
    }
  }
}
</style>