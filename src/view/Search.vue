<template>
  <div id="search" class="content-page">
    <div class="title">
      搜索
      <span class="hight-light">“{{ keywords ? keywords : "" }}”</span>
    </div>
    <div class="nav">
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
    <div class="subpage-wrapper">
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
}
</style>