<template>
  <div id="recomendation">
    <!-- <div id="banner">轮播图</div> -->
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
  getBannerMock,
  getRecomMVMock,
  getRecomPlayListMock,
  getRecomSongsMock,
} from "@/api/mock";
export default {
  data() {
    return {
      banner: [],
      recPlayList: [],
      recMvList: [],
      recNewSongs: [],
    };
  },
  mounted() {
    this.getBanner();
    this.getRecomMV();
    this.getRecomPlayList();
    this.getRecomSongs();
  },
  methods: {
    async getBanner() {
      try {
        const res = await getBannerMock();
        if (res.code === 200) {
          this.banner = res.banner;
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
        const res = await getRecomMVMock();
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
        const res = await getRecomPlayListMock();
        if (res.code === 200) {
          this.recPlayList = res.result;
          console.log(res);
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
        const res = await getRecomSongsMock();
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
  margin-top: 3%;
  #banner {
  }
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
        .mv-title {
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
        width: calc(100% / 5 - 20px);
        margin: 10px auto;
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