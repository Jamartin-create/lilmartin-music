<template>
  <div id="recomendation">
    <Banner :bannerList="banner" />
    <div id="rec-mv">
      <div class="sub-title">推荐MV</div>
      <div class="mv-list">
        <div class="mv-item" v-for="mv in recMvList" :key="mv.id">
          <div class="image">
            <img :src="mv.picUrl" alt="" />
          </div>
          <div class="mvInfo">
            <div class="mv-title">{{ mv.name }}</div>
            <div class="mv-artists">{{ mv.artists | artists }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="rec-new-songs">
      <div class="sub-title">新歌速递</div>
      <div class="new-song-list">
        <div
          class="new-song-item"
          v-for="newSong in recNewSongs"
          :key="newSong.id"
        >
          <div class="image">
            <img :src="newSong.picUrl" alt="" />
          </div>
          <div class="song-info">
            <div class="song-title">{{ newSong.name }}</div>
            <div class="song-artists">{{ newSong.song.artists | artists }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="rec-play-list">
      <div class="sub-title">推荐歌单</div>
      <div class="store-list">
        <div class="store-item" v-for="store in recPlayList" :key="store.id">
          <div class="image">
            <img :src="store.picUrl" alt="" />
          </div>
          <div class="store-title">{{ store.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBanner,
  getRecMV,
  getRecomPlayList,
  getRecomSongs,
} from "@/api/home";
// import {
//   getBanner,
//   getRecomPlayList,
//   getRecMV,
//   getRecomSongs,
// } from "@/api/mock";
import nprogress from "nprogress";
import Banner from "../Banner.vue";

export default {
  components: {
    Banner,
  },
  data() {
    return {
      banner: [],
      recPlayList: [],
      recMvList: [],
      recNewSongs: [],
    };
  },
  mounted() {
    this.getAll();
  },
  methods: {
    getAll() {
      this.getBanner();
      this.getRecomMV();
      this.getRecomPlayList();
      this.getRecomSongs();
    },
    async getBanner() {
      try {
        const res = await getBanner();
        if (res.code === 200) {
          console.log(res);
          this.banner = res.banners;
        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    async getRecomMV() {
      try {
        const res = await getRecMV();
        if (res.code === 200) {
          this.recMvList = res.result.slice(0, 3);
        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    async getRecomPlayList() {
      try {
        const res = await getRecomPlayList();
        if (res.code === 200) {
          this.recPlayList = res.result;
        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    async getRecomSongs() {
      try {
        nprogress.start();
        const res = await getRecomSongs({
          limit: 12,
        });
        nprogress.done();
        if (res.code === 200) {
          this.recNewSongs = res.result;
        } else {
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
  },
};
</script>

<style lang="less" scoped>
#recomendation {
  .sub-title {
    display: inline;
    font-size: 24px;
    font-weight: bold;
  }
  #rec-new-songs {
    .new-song-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 3% auto;
      .new-song-item {
        display: flex;
        width: calc(100% / 3 - 20px);
        margin: 10px auto;
        .image {
          img {
            width: 80px;
            border-radius: 6px;
          }
        }
        .song-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: calc(100% - 70px);
          padding-left: 10px;
          .song-title,
          .song-artists {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .song-artists {
            opacity: 0.7;
            font-weight: lighter;
            font-size: 16px;
          }
        }
      }
    }
  }
  #rec-mv {
    .mv-list {
      display: flex;
      justify-content: space-around;
      margin: 3% auto;
      .mv-item {
        width: calc(100% / 3 - 30px);
        .image {
          img {
            width: 100%;
            border-radius: 6px;
          }
        }
        .mv-artists {
          opacity: 0.7;
          font-weight: lighter;
          font-size: 16px;
        }
      }
    }
  }
  #rec-play-list {
    .store-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin: 3% auto;
      .store-item {
        width: calc(100% / 5 - 40px);
        margin: 10px 20px;
        .image {
          img {
            width: 100%;
            border-radius: 6px;
          }
        }
      }
      .store-title {
        margin-top: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>