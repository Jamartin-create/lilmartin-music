<template>
  <div class="content-page" id="play-list-page">
    <ListPageHeader
      :artistsInfo="headerSchema.artists"
      :title="headerSchema.title"
      :type="headerSchema.type"
      :itemInfo="headerSchema.itemInfo"
    ></ListPageHeader>
    <div class="subpage-wrapper">
      <PlayList :playList="playList" />
    </div>
  </div>
</template>

<script>
import { getAlbumInfo } from "@/api/album";
import nprogress from "nprogress";
import PlayList from "@/components/List_Components/PlayList.vue";
import ListPageHeader from "@/components/ListPageHeader.vue";

export default {
  components: {
    PlayList,
    ListPageHeader,
  },
  data() {
    return {
      limit: 40,
      playList: [],
      albumId: 0,
      albumInfo: {
        name: "", //名字
        picUrl: "", //封面
        artists: [], //创建者
        description: "", //描述
        publishTime: 0,
      },
      headerSchema: {
        title: "",
        type: "",
        artists: [],
        itemInfo: {},
      },
    };
  },
  watched: {},
  mounted() {
    this.$bus.$on("realbum", async (id) => {
      this.albumId = id;
      this.getAlbumAllSongsById();
    });
    this.albumId = this.$route.query.id;
    this.getAlbumAllSongsById();
  },
  methods: {
    transformDataToSchema(title, type, artists, itemInfo) {
      this.headerSchema = {
        title,
        type,
        artists,
        itemInfo,
      };
    },
    async getAlbumAllSongsById() {
      try {
        nprogress.start();
        const res = await getAlbumInfo({
          id: this.albumId,
        });
        if (res.code === 200) {
          const data = res.album;
          this.transformDataToSchema(data.name, "album", data.artists, {
            coverImgUrl: data.picUrl,
            description: data.description,
            publishTime: data.publishTime,
          });
          const { name, picUrl, artists, description, publishTime } = res.album;
          this.albumInfo = {
            name,
            picUrl,
            artists,
            description,
            publishTime,
          };
          this.playList = res.songs.map((item) => {
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
      width: 200px;
      min-width: 200px;
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
        justify-content: center;
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