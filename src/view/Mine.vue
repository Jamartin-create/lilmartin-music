<template>
  <div id="home-wrapper" class="content-page">
    <div class="title">发现音乐</div>
    <div class="nav">
      <span
        class="bar"
        v-for="mode in homePageNavBarList"
        :class="searched === mode.id ? 'active' : ''"
        :key="mode.id"
        @click="searched = mode.id"
      >
        {{ mode.label }}
      </span>
    </div>
    <div class="subpage-wrapper">
      <Recomendation v-show="searched === 0" />
    </div>
  </div>
</template>

<script>
import Recomendation from "@/components/home/Recomendation.vue";
import { homePageNavBarList } from "@/js/navBarLists";
export default {
  name: "mine-music",
  components: { Recomendation },
  data() {
    return {
      searched: 0,
      homePageNavBarList,
    };
  },
  created() {},
};
</script>