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
        >
          {{ mode.label }}
        </span>
      </div>
      <PlayList v-if="searched === 0" :playList="playList" />
    </div>
  </div>
</template>

<script>
import { searchByKeywords, getSonsUrl } from "@/api/playlist";
import PlayList from "@/components/PlayList.vue";

export default {
  components: { PlayList },
  data() {
    return {
      keywords: "",
      searched: 0,
      searchType: [
        {
          id: 0,
          name: "single",
          label: "单曲",
        },
        {
          id: 1,
          name: "album",
          label: "专辑",
        },
      ],
      playList: [],
    };
  },
  mounted() {
    this.keywords = this.$route.query.keywords;
    this.searchByKeys();
  },
  methods: {
    async searchByKeys() {
      const res = await searchByKeywords({
        keywords: this.keywords,
        limit: 40,
        offset: 1,
      });
      this.playList = res.result.songs;
      console.log(this.playList);
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
  padding-top: 3%;
  padding-left: 5%;
  padding-right: 5%;
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
      }
      .bar.active {
        border-bottom: 2px solid black;
      }
    }
  }
}
</style>