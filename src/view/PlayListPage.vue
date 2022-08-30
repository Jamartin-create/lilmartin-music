<template>
  <div class="content-page" id="play-list-page">
    <ListPageHeader
      :itemInfo="headerSchema.itemInfo"
      :title="headerSchema.title"
      :type="headerSchema.type"
      :creatorInfo="headerSchema.createUserInfo"
    ></ListPageHeader>
    <div class="subpage-wrapper">
      <PlayList :playList="playList" />
    </div>
  </div>
</template>

<script>
import { getPlayListAllSongsById } from "@/api/playlist";
import nprogress from "nprogress";
import PlayList from "@/components/List_Components/PlayList.vue";
import CoverImage from "@/components/CoverImage.vue";
import ListPageHeader from "@/components/ListPageHeader.vue";
export default {
  components: {
    PlayList,
    CoverImage,
    ListPageHeader,
  },
  data() {
    return {
      limit: 40,
      playList: [],
      playListId: 0,
      headerSchema: {
        title: "",
        type: "",
        createUserInfo: {},
        itemInfo: {},
      },
    };
  },
  watched: {},
  mounted() {
    this.$bus.$on("replaylist", async (id) => {
      this.playListId = id;
      this.getPlayListAllSongsById();
    });
    this.playListId = this.$route.query.id;
    this.getPlayListAllSongsById();
  },
  methods: {
    transformDataToSchema(title, type, createUserInfo, itemInfo) {
      this.headerSchema = {
        title,
        type,
        createUserInfo,
        itemInfo,
      };
    },
    async getPlayListAllSongsById() {
      try {
        nprogress.start();
        const res = await getPlayListAllSongsById({
          limit: this.limit,
          offset: Math.floor(this.playList.length / this.limit),
          id: this.playListId,
        });
        if (res.code === 200) {
          const data = res.playlist;
          this.transformDataToSchema(data.name, "playList", data.creator, {
            playCount: data.playCount,
            trackCount: data.trackCount,
            updateTime: data.updateTime,
            createTime: data.createTime,
            coverImgUrl: data.coverImgUrl,
            description: data.description,
          });
          this.playList = data.tracks.map((item) => {
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
