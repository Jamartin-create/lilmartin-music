<template>
  <div id="store-list">
    <span
      class="playlist-item"
      v-for="playList in playLists"
      :key="playList.id"
      @click="toPlayListPage(playList.id)"
    >
      <!-- <div class="store-cover-image">
        <img :src="playList.coverImgUrl" alt="" loading="lazy" />
        <div
          class="shadow"
          :style="{ backgroundImage: `url(${playList.coverImgUrl})` }"
        ></div>
      </div> -->
      <CoverImage
        :id="playList.id"
        :type="'playList'"
        :image-url="playList.coverImgUrl"
        :fixed-size="150"
      ></CoverImage>
      <span class="store-title">{{ playList.name }}</span>
      <span class="store-creator"> by {{ playList.creator.nickname }}</span>
    </span>
  </div>
</template>

<script>
import CoverImage from "../CoverImage.vue";
export default {
  props: ["playLists"],
  components: {
    CoverImage,
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
    // console.log(this.playLists);
  },
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
      position: relative;
      width: calc(var(--content-min-width) / 4 - 20px);
      height: calc(var(--content-min-width) / 4 - 20px);
      border-radius: 6px;
      img {
        border-radius: 6px;
        width: 100%;
      }
      &:hover .shadow {
        height: 100%;
        width: 100%;
      }
      .shadow {
        height: 0;
        width: 0;
        position: absolute;
        top: 12px;
        filter: blur(16px) opacity(0.6);
        transform: scale(0.92, 0.96);
        z-index: -1;
        background-size: cover;
        border-radius: 0.75em;
        aspect-ratio: 1 / 1;
        transition: var(--tran-03);
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