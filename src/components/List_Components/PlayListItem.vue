<template>
  <div id="list-item">
    <div class="item-wrapper" @dblclick="openPlayer(songsInfo.id, songsIndex)">
      <span class="item-info">
        {{ `${songsInfo.name}  ` }}
        <span class="alias"
          >{{
            `${
              songsInfo.alias.length > 0 ? "(" + songsInfo.alias[0] + ")" : ""
            }`
          }}
        </span>
      </span>
      <span class="item-info">{{ songsInfo.artists | artists }}</span>
      <span class="item-info">
        <div class="text-link" @click="toAlbumPage(songsInfo.album.id)">
          {{ songsInfo.album.name }}
        </div></span
      >
      <span class="item-info">{{ songsInfo.duration | formatTime }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "play-list-item",
  props: ["songsInfo", "songsIndex"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapActions("playList", ["changePlayList"]),
    openPlayer(songsId, index) {
      this.changePlayList(this.$parent.playList);
      this.$bus.$emit("changeMusic", { songsId, index });
    },
    toAlbumPage(albumId) {
      this.$bus.$emit("realbum", albumId);
      this.$router.push({ name: "album", query: { id: albumId } });
    },
  },
};
</script>

<style lang="less" scoped>
#list-item {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  margin: 10px 0;
  transition: var(--tran-03);
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: var(--primary-color);
    color: var(--primary-color-light);
    transition: var(--tran-03);
  }
  .item-wrapper {
    height: 36px;
    > span {
      display: inline-block;
      width: 30%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 3px;
      .alias {
        font-size: 16px;
        opacity: 0.4;
      }
      font-size: 16px;
      &:nth-child(1) {
        font-weight: bold;
        font-size: 20px;
      }
      &:nth-child(2),
      &:nth-child(3) {
        width: 30%;
      }
      &:nth-child(4) {
        width: 10%;
        text-align: right;
      }
    }
    .text-link {
      display: inline;
      width: auto;
      &:hover {
        text-decoration: solid;
        text-decoration-color: var(--primary-color-light);
        text-decoration-line: underline;
      }
    }
  }
}

body.dark #list-item {
  &:hover {
    color: var(--text-color);
  }
}
</style>