<template>
  <div id="play-list">
    <PlayListItemVue
      v-for="(item, subIndex) in playList"
      :key="item.id"
      :songsInfo="item"
      :songsIndex="subIndex"
    />
  </div>
</template>

<script>
import PlayListItemVue from "./PlayListItem.vue";

export default {
  name: "play-list",
  props: ["playList"],
  components: {
    PlayListItemVue,
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
#play-list {
}
body.dark {
  #play-list {
    table {
      tbody {
        tr {
          &:hover {
            color: var(--text-color);
          }
        }
      }
    }
  }
}
</style>