<template>
  <div class="container">
    <input name="keyword" v-model="searchKeyWords" />
    <button @click="searchByKeys">查询歌曲</button>
    <play-list :playList="playList"></play-list>
  </div>
</template>

<script>
import { searchByKeywords, getSonsUrl } from "@/api/playlist";
import PlayList from "@/components/PlayList.vue";
export default {
  name: "mine-music",
  components: {
    PlayList,
  },
  data() {
    return {
      searchKeyWords: "薛之谦",
      playList: [],
    };
  },
  created() {
    this.loadBasicData();
  },
  mounted() {
    this.loadBasicData();
    this.searchByKeys();
  },
  methods: {
    loadBasicData() {
      this.$store.dispatch("user/fetchUserAccount");
      this.$store.dispatch("user/fetchUserPlayList");
    },
    async searchByKeys() {
      const res = await searchByKeywords({
        keywords: this.searchKeyWords,
        limit: 40,
        offset: 1,
      });
      this.playList = res.result.songs;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
</style>