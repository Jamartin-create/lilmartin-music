<template>
  <div v-if="false" class="container">
    <audio id="audio" controls ref="audio">
      <source :src="musicSrc" type="audio/mpeg" />
      Your browser does not support this audio format.
    </audio>
  </div>
</template>

<script>
export default {
  name: "player",
  data() {
    return {
      songId: 1954420092,
    };
  },
  computed: {
    musicSrc() {
      return `https://music.163.com/song/media/outer/url?id=${this.songId}.mp3`;
    },
  },
  mounted() {
    this.$bus.$on("changeMusic", this.setMusicSrc);
  },
  methods: {
    playMusic() {
      document.querySelector("audio").play();
    },
    pauseMusic() {
      document.querySelector("audio").pause();
    },
    refresh() {
      this.pauseMusic();
      document.querySelector("audio").load();
    },
    setMusicSrc(songId) {
      this.refresh();
      this.songId = songId;
      this.playMusic();
    },
  },
  //解绑某事件
  beforeDestroy() {
    this.$bus.$off("changeMusic"); //有事件名代表解绑对应的事件 无事件名则全部解绑(如有人用 则不起作用)
  },
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  #audio {
    width: 100%;
  }
}
</style>