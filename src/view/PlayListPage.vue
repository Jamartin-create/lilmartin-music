<template>
  <div class="content-page" id="play-list-page">
    <div class="play-list-info">
      <div class="image">
        <img :src="`${playListInfo.coverImgUrl}`" alt="" />
      </div>
      <div class="info" v-if="playListInfo.name != ''">
        <div class="play-list-name">{{ playListInfo.name }}</div>
        <div class="other">
          <div class="create-info">
            <img
              :src="`${playListInfo.creator.avatarUrl}?param=224y224`"
              alt=""
            />
            <div class="creator">{{ playListInfo.creator.nickname }}</div>
            <div class="create-time">
              {{ playListInfo.createTime | formatTime("Human") }} 创建
            </div>
          </div>
          <div class="count-info">
            <span class="count">
              歌曲:
              <span class="number">
                {{ playListInfo.trackCount }}
              </span>
            </span>
            <span class="count">
              播放:
              <span class="number">
                {{ playListInfo.playCount }}
              </span>
            </span>
          </div>
          <div class="play-list-description">
            {{ playListInfo.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="subpage-wrapper">
      <PlayList :playList="playList" />
    </div>
  </div>
</template>

<script>
import { getPlayListAllSongsById } from "@/api/playlist";
import nprogress from "nprogress";
import PlayList from "@/components/displayList/PlayList.vue";

export default {
  components: {
    PlayList,
  },
  data() {
    return {
      limit: 40,
      playList: [],
      playListId: 0,
      playListInfo: {
        name: "", //名字
        coverImgUrl: "", //封面
        creator: {}, //创建者
        description: "", //描述
        playCount: 0, //播放次数
        trackCount: 0, //音乐数量
        updateTime: 0, //歌单更新时间
        createTime: 0,
      },
    };
  },
  watched: {
    "$route.query": function (to, from) {
      console.log(to, from);
    },
  },
  mounted() {
    this.$bus.$on("replaylist", async (id) => {
      this.playListId = id;
      this.getPlayListAllSongsById();
    });
    this.playListId = this.$route.query.id;
    this.getPlayListAllSongsById();
  },
  methods: {
    async getPlayListAllSongsById() {
      try {
        nprogress.start();
        const res = await getPlayListAllSongsById({
          limit: this.limit,
          offset: Math.floor(this.playList.length / this.limit),
          id: this.playListId,
        });
        if (res.code === 200) {
          const {
            name,
            coverImgUrl,
            creator,
            description,
            playCount,
            trackCount,
            tracks,
            updateTime,
            createTime,
          } = res.playlist;
          this.playListInfo = {
            name,
            coverImgUrl,
            creator,
            description,
            playCount,
            trackCount,
            updateTime,
            createTime,
          };
          this.playList = tracks.map((item) => {
            return {
              id: item.id,
              name: item.name,
              album: {
                name: item.al.name,
                id: item.al.id,
              },
              artists: item.ar,
              alias: item.alia,
              duration: item.dt,
            };
          });
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
#play-list-page {
  .play-list-info {
    display: flex;
    .image {
      width: 250px;
      min-width: 250px;
      img {
        width: 100%;
        border-radius: 6px;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 20px;
      .play-list-name {
        font-size: 40px;
        font-weight: bold;
      }
      .other {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 60%;
        .create-info {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          & * {
            margin: 5px 5px;
          }
          .create-time {
            opacity: 0.6;
          }
          img {
            width: 40px;
            border-radius: 50%;
          }
        }
        .count-info {
          .count {
            margin: 5px 5px;
            .number {
              opacity: 0.6;
            }
          }
        }
        .play-list-description {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>