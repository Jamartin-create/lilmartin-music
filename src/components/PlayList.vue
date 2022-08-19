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
  margin-top: 3%;
  width: 100%;
  table {
    width: 100%;
    thead {
      tr {
        th {
          font-size: 18px;
          font-weight: lighter;
          color: #a0a0a0;
        }
        .thead:nth-child(1),
        .thead:nth-child(2) {
          width: 5%;
        }

        .thead:nth-child(3),
        .thead:nth-child(5) {
          width: 29%;
        }
        .thead:nth-child(4) {
          width: 25%;
        }
        .thead:nth-child(6) {
          width: 8%;
        }
      }
    }
    tbody {
      tr {
        &:hover {
          background-color: var(--primary-color);
          color: var(--primary-color-light);
          cursor: pointer;
        }
        td {
          font-size: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          line-height: 50px;
          height: 50px;
          &:nth-child(1) {
            text-align: center;
          }
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5) {
            padding-right: 2%;
          }
        }
      }
    }
  }
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