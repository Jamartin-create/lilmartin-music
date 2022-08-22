<template>
  <div id="album-list">
    <div class="album-item" v-for="album in albumList" :key="album.id">
      <div class="image">
        <img :src="album.picUrl" alt="" />
      </div>
      <div class="title">
        {{ album.name }}
        <span class="alias">
          {{ album.alias[0] ? "(" + album.alias[0] + ")" : "" }}
        </span>
      </div>
      <div class="artist">{{ album.artists[0].name }}</div>
      <div class="songs-num">{{ album.size }}首</div>
    </div>
  </div>
</template>

<script>
import { getUserAlbumListMock } from "@/api/mock";
import { getUserAlbumList } from "@/api/user";
import nprogress from "nprogress";

export default {
  name: "AlbumList",
  data() {
    return {
      albumList: [],
    };
  },
  mounted() {
    this.getAlbumList();
  },
  methods: {
    async getAlbumList() {
      nprogress.start();
      const res = await getUserAlbumListMock();
      nprogress.done();
      if (res.code === 200) {
        console.log(res);
        this.albumList = res.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#album-list {
  margin-top: 3%;
  min-width: 660px;
  .album-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px auto;
    padding: 1% 1%;
    border-radius: 6px;
    transition: var(--tran-03);
    &:hover {
      background-color: var(--primary-color);
      color: var(--primary-color-light);
    }
    font-size: 20px;
    .image,
    .title,
    .artist,
    .songs-num {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .image {
      width: 10%;
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
    .title {
      width: 50%;
      .alias {
        font-size: 16px;
        opacity: 0.6;
      }
    }
    .artist {
      width: 20%;
    }
    .songs-num {
      width: 10%;
      text-align: right;
    }
  }
}

body.dark #album-list {
  .album-item {
    &:hover {
      color: var(--text-color);
    }
  }
}
</style>