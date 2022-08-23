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
        @click="searched = searchType.id"
      >
        {{ searchType.label }}
      </div>
    </div>
    <div class="subpage-wrapper">
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