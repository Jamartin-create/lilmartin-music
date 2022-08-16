<template>
  <div id="play-list">
    <table>
      <thead>
        <tr>
          <th class="thead"></th>
          <th class="thead"></th>
          <th class="thead">歌名</th>
          <th class="thead">歌手</th>
          <th class="thead">专辑</th>
          <th class="thead">时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in playList"
          :key="item.id"
          @dblclick="openPlayer(item.id, index)"
        >
          <td>{{ (index >= 9 ? "" : "0") + (index + 1) }}</td>
          <td></td>
          <td>{{ item.name }}</td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | formatTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "play-list",
  props: ["playList"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    ...mapActions("playList", ["changePlayList"]),
    openPlayer(songsId, index) {
      this.changePlayList(this.playList);
      this.$bus.$emit("changeMusic", { songsId, index });
    },
  },
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