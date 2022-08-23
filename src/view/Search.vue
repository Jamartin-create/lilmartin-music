<template>
  <div id="search" class="content-page">
    <div class="title">
      搜索
      <span class="high-light">“{{ keywords ? keywords : "" }}”</span>
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
      <AlbumList v-if="searched === 1" :albumLists="albumList" />
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
      albumList: [],
      limit: 40,
    };
  },
  computed: {},
  mounted() {
    this.$bus.$on("research", async (keywords) => {
      this.keywords = keywords;
      this.searchAll();
    });
    this.keywords = this.$route.query.keywords;
    this.searchAll();
  },
  methods: {
    searchAll() {
      this.searchSingleByKeys();
      this.searchAlbumByKeys();
    },
    async searchSingleByKeys() {
      try {
        nprogress.start();
        const res = await searchByKeywords({
          keywords: this.keywords,
          limit: this.limit,
          offset: this.playList.length / this.limit + 1,
          type: 1,
        });
        if (res.code === 200) {
          this.playList = this.playList.concat(res.result.songs);
        }
      } catch (e) {
        console.log(e);
      } finally {
        nprogress.done();
      }
    },
    async searchAlbumByKeys() {
      try {
        nprogress.start();
        const res = await searchByKeywords({
          keywords: this.keywords,
          limit: this.limit,
          offset: Math.floor(this.albumList.length / this.limit) + 1,
          type: 10,
        });
        if (res.code === 200) {
          this.albumList = this.albumList.concat(res.result.albums);
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
</style>