<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th class="opera">操作</th>
          <th class="name">歌名</th>
          <th class="artist">歌手</th>
          <th class="album">专辑</th>
          <th class="time">时间</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in playList"
          :key="item.id"
          @dblclick="openPlayer(item.id)"
        >
          <td class="opera">♥</td>
          <td class="name">{{ item.name }}</td>
          <td class="artist">{{ item.artists[0].name }}</td>
          <td class="album">{{ item.album.name }}</td>
          <td class="time">{{ item.duration | formatTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "play-list",
  props: ["playList"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    openPlayer(songsId) {
      this.$bus.$emit("changeMusic", songsId);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 90vh;
  margin: 0;
  padding: 0;
  overflow: scroll;
  table {
    width: 90%;
    .opera {
      width: 5%;
    }
    .name {
      width: 30%;
    }
    .artist {
      width: 30%;
    }
    .album {
      width: 30%;
    }
    .time {
      width: 5%;
    }
    tr {
      height: 4%;
    }
    tr:hover {
      background-color: rgb(177, 177, 177);
    }
    th,
    td {
      text-align: left;
      font-size: 20px;
    }
    th:first-child,
    td:first-child {
      text-align: center;
    }
  }
}
</style>