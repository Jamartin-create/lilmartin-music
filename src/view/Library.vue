<template>
  <div id="library" class="content-page">
    <div class="title">
      音乐库by
      <span class="high-light"
        >"{{ userProfile.nickname ? userProfile.nickname : "" }}"</span
      >
    </div>
    <div class="nav">
      <div
        :class="searchType.id === searched ? 'active' : ''"
        v-for="searchType in searchTypes"
        :key="searchType.id"
        @click="changeList(searchType.id)"
      >
        {{ searchType.label }}
      </div>
    </div>
    <div class="subpage-wrapper">
      <StorePlayList :playLists="playLists" v-show="searched === 0" />
      <MVList :mvLists="mvLists" v-show="searched === 1" />
      <AlbumList :albumLists="albumLists" v-show="searched === 2" />
    </div>
  </div>
</template>

<script>
// import {
//   getUserAlbumListMock,
//   getUserMVListMock,
//   getUserPlayListMock,
// } from "@/api/mock";
import { getUserAlbumList, getUserMvList, getUserPlayList } from "@/api/user";
import { mapState } from "vuex";
import { libraryNavBarList } from "@/js/navBarLists";
import StorePlayList from "@/components/List_Components/StorePlayList.vue";
import MVList from "@/components/List_Components/MVList.vue";
import AlbumList from "@/components/List_Components/AlbumList.vue";
import nprogress from "nprogress";
export default {
  data() {
    return {
      searched: 0,
      searchTypes: libraryNavBarList,
      playLists: [],
      albumLists: [],
      mvLists: [],
    };
  },
  components: {
    StorePlayList,
    MVList,
    AlbumList,
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.user.profile,
    }),
  },
  mounted() {
    this.getPlayList();
    this.getUserMvList();
    this.getAlbumList();
  },
  methods: {
    changeList(id) {
      this.searched = id;
    },
    async getPlayList() {
      nprogress.start();
      try {
        const res = await getUserPlayList({
          uid: this.userProfile.userId,
        });
        if (res.code === 200) {
          this.playLists = res.playlist;
        }
      } catch (e) {
        console.log(e);
      } finally {
        nprogress.done();
      }
    },
    async getAlbumList() {
      try {
        nprogress.start();
        const res = await getUserAlbumList();
        if (res.code === 200) {
          this.albumLists = res.data;
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      } finally {
        nprogress.done();
      }
    },
    async getUserMvList() {
      try {
        nprogress.start();
        const res = await getUserMvList();
        if (res.code === 200) {
          this.mvLists = res.data;
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