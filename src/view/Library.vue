<template>
  <div id="library">
    <div class="header">
      <span class="nick-name"
        >“{{ userProfile.nickname ? userProfile.nickname : "" }}”</span
      >
      <span class="title">的音乐库</span>
    </div>
    <div class="nav">
      <div
        :class="searchType.id === searched ? 'active' : ''"
        v-for="searchType in searchTypes"
        :key="searchType.id"
        @click="searched = searchType.id"
      >
        {{ searchType.label }}
      </div>
    </div>
    <div id="library-content-wrapper">
      <StorePlayList :userId="userProfile.userId" v-show="searched === 0" />
      <MVList v-show="searched === 1" />
      <AlbumList v-show="searched === 2" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { libraryNavBarList } from "@/js/navBarLists";
import StorePlayList from "@/components/displayList/StorePlayList.vue";
import MVList from "@/components/displayList/MVList.vue";
import AlbumList from "@/components/displayList/AlbumList.vue";
export default {
  data() {
    return {
      searched: 0,
      searchTypes: libraryNavBarList,
    };
  },
  components: {
    StorePlayList,
    MVList,
    AlbumList,
  },
  computed: {
    ...mapState({
      userProfile: (state) => state.user.data.profile,
    }),
  },
};
</script>

<style lang="less" scoped>
#library {
  width: 100%;
  height: 100%;
  min-width: var(--content-min-width);
  overflow: scroll;
  padding-top: var(--content-padding-t);
  padding-left: var(--content-padding-lr);
  padding-right: var(--content-padding-lr);
  &::-webkit-scrollbar {
    display: none;
  }
  .header {
    font-size: 30px;
    height: 55px;
    line-height: 55px;
    .nick-name {
      font-weight: bold;
    }
  }
  .nav {
    margin-top: 5%;
    display: flex;
    justify-content: space-evenly;
    font-size: 22px;
    div {
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    .active {
      font-weight: bold;
      border-bottom: 2px solid black;
    }
  }
  #library-content-wrapper {
    padding-top: 10px;
  }
}
</style>