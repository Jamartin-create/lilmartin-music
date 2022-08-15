<template>
  <div id="player">
    <div class="player-wrapper">
      <div class="songs-info">
        <div class="image">
          <img :src="curSongs.pic" alt="" />
        </div>
        <div class="text-info">
          <span class="songstitle">{{ curSongs.title }}</span>
          <span class="singers">{{ artist }}</span>
        </div>
      </div>
      <div class="player-ctl">
        <!-- 控制暂停、播放 -->
        <div class="play-pause">
          <i class="icon iconfont icon-suijibofang"></i>
          <i class="icon iconfont icon-next"></i>
          <i class="icon iconfont icon-pause"></i>
          <i class="icon iconfont icon-next"></i>
          <i class="icon"></i>
        </div>
        <!-- 控制音乐进度 -->
        <div class="process-ctl" ref="process">
          <div id="drager" ref="drager"></div>
        </div>
      </div>
      <div class="other-ctl">
        <i class="icon iconfont icon-volume"></i>
      </div>
    </div>
    <audio id="audio" autoplay buffered ref="audio">
      <source :src="musicSrc" type="audio/mpeg" />
      Your browser does not support this audio format.
    </audio>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "player",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      playList: (state) => state.playList.playList,
      curSongs: (state) => state.playList.curSongs,
    }),
    musicSrc() {
      return this.curSongs.url;
    },
    artist() {
      return this.curSongs.singer.map((item) => item.name).join("/");
    },
  },
  mounted() {
    this.$bus.$on("changeMusic", this.setMusicSrc);
    // this.draggerEventInit();
  },
  methods: {
    ...mapActions("playList", ["changeCurSongs"]),
    playMusic() {
      document.querySelector("audio").play();
    },
    pauseMusic() {
      document.querySelector("audio").pause();
    },
    refresh() {
      this.pauseMusic();
    },
    async setMusicSrc(songId) {
      this.refresh();
      await this.changeCurSongs(songId);
      this.playMusic();
      document.querySelector("audio").load();
    },
    //监听鼠标拖拽进度条
    draggerEventInit() {
      const process = this.$refs.process;
      const dragger = this.$refs.drager;
      dragger.onmousedown = (event) => {
        console.log(event);
      };
    },
  },
  //解绑某事件
  beforeDestroy() {
    this.$bus.$off("changeMusic"); //有事件名代表解绑对应的事件 无事件名则全部解绑(如有人用 则不起作用)
  },
};
</script>

<style lang="less" scoped>
#player {
  position: absolute;
  bottom: 0;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: var(--player-height);
  transition: var(--tran-03);
  display: flex;
  justify-content: center;
  align-items: center;
  .player-wrapper {
    width: 99%;
    height: calc(var(--player-height) - 10px);
    background-color: var(--player-color);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .songs-info {
      min-width: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      .image {
        img {
          margin: 0 10px;
          width: 60px;
          border-radius: 6px;
        }
      }
      .text-info {
        display: flex;
        flex-direction: column;
        .songstitle {
          font-size: 22px;
        }
        .singers {
          font-size: 18px;
        }
      }
    }
    .player-ctl {
      width: 600px;
      display: flex;
      margin: 0 10px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .play-pause {
        margin: 10px auto;
        width: 200px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          font-weight: lighter;
          text-align: center;
          transition: var(--tran-03);
          border-radius: 50%;
          cursor: pointer;
          &:nth-child(3) {
            font-size: 30px;
            width: 40px;
            height: 40px;
            line-height: 40px;
          }
          &:nth-child(2) {
            transform: rotate(180deg);
          }
          &:hover {
            background-color: var(--primary-color);
            color: var(--primary-color-light);
            transition: var(--tran-03);
          }
        }
      }
      .process-ctl {
        width: calc(100% - 20px);
        min-width: 300px;
        height: 2px;
        background-color: var(--primary-color);
        opacity: 0.3;
        position: relative;
        #drager {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) translateX(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--primary-color);
          &:hover {
            box-shadow: 0 0 5px #333;
            width: 12px;
            height: 12px;
          }
        }
      }
    }
    .other-ctl {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
      }
    }
  }
}

body.dark {
  #player {
    .player-wrapper {
      .player-ctl {
        .icon:hover {
          color: var(--text-color);
        }
        .process-ctl {
          background-color: var(--text-color);
          #drager {
            background-color: var(--text-color);
          }
        }
      }
    }
  }
}
</style>