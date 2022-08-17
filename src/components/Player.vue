<template>
  <div id="player">
    <div class="player-wrapper">
      <div class="songs-info">
        <div class="image">
          <img :src="curSongs.pic ? curSongs.pic : ''" alt="" />
        </div>
        <div class="text-info">
          <span class="songstitle">{{
            curSongs.title ? curSongs.title : "当前未播放音乐"
          }}</span>
          <span class="singers">{{ artist }}</span>
        </div>
      </div>
      <div class="player-ctl">
        <!-- 控制暂停、播放 -->
        <div class="play-pause">
          <i
            class="icon iconfont"
            :class="`icon-${circleMode[selectCircleMode].icon}`"
            @click="changeCircleMode"
          ></i>
          <i class="icon iconfont icon-next" @click="lastMusic"></i>
          <i
            class="icon iconfont"
            :class="isPlaying ? ' icon-pause' : 'icon-play'"
            @click="control()"
          ></i>
          <i class="icon iconfont icon-next" @click="nextMusic"></i>
          <i class="icon"></i>
        </div>
        <!-- 控制音乐进度 -->
        <div class="process-ctl" ref="process">
          <div class="process-bar">
            <div class="passed-process" ref="passedProcess">
              <div id="drager" ref="drager"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="other-ctl">
        <div id="volume-ctl">
          <i class="icon iconfont icon-volume volume"></i>
        </div>
      </div>
    </div>
    <audio id="audio" buffered ref="audio">
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
    return {
      isPlaying: false,
      selectCircleMode: 2,
      circleMode: [
        {
          id: 0,
          icon: "suijibofang",
          type: "random",
        },
        {
          id: 1,
          icon: "danquxunhuan",
          type: "single",
        },
        {
          id: 2,
          icon: "bofang-xunhuanbofang",
          type: "circle",
        },
      ],
      isMouseDown: false,
      curDuration: 0,
      durationInterval: "",
    };
  },
  watched: {},
  computed: {
    ...mapState({
      playList: (state) => state.playList.playList,
      curSongs: (state) => state.playList.curSongs,
    }),
    musicSrc() {
      return this.curSongs.url ? this.curSongs.url : "";
    },
    artist() {
      return this.curSongs.singer
        ? this.curSongs.singer.map((item) => item.name).join("/")
        : "未知";
    },
    processScale() {
      return 580000 / this.curSongs.duration;
    },
  },
  watched: {},
  mounted() {
    this.$bus.$on("changeMusic", this.setMusicSrc);
    this.$bus.$on("pause", this.control);
    this.$nextTick(this.listenProcess);
    this.draggerEventInit();
  },
  methods: {
    ...mapActions("playList", ["changeCurSongs"]),
    //监听鼠标拖拽进度条
    draggerEventInit() {
      const process = this.$refs.process;
      const passedProcess = this.$refs.passedProcess;
      const dragger = this.$refs.drager;
      const audio = document.getElementById("audio");
      this.durationInterval = setInterval(() => {
        this.curDuration = audio.currentTime * this.processScale;
        passedProcess.style.width = this.curDuration + "px";
        dragger.style.left = this.curDuration + "px";
      }, 10);

      process.onmousedown = (event) => {
        //计算已走过的长度
        let passedWidth =
          process.getBoundingClientRect().width -
          Math.abs(process.getBoundingClientRect().width - event.offsetX);
        if (passedWidth < 0) audio.currentTime = 0;
        else if (passedWidth >= process.getBoundingClientRect().width)
          audio.currentTime = process.getBoundingClientRect().width;
        audio.currentTime = passedWidth / this.processScale;
      };
      // dragger.onmousedown = (event) => {
      //   this.isMouseDown = true;
      // };
      // window.onmouseup = (event) => {
      //   this.isMouseDown = false;
      //   console.log(event);
      // };
      // window.onmousemove = (event) => {
      //   if (!this.isMouseDown) return;
      //   console.log(window);
      //   console.log("move");
      //   console.log(dragger.style.left);
      // };
    },
    //绑定进度拖拽按钮监听
    addDragger() {},
    //切换循环模式
    changeCircleMode() {
      this.selectCircleMode =
        (this.selectCircleMode + 1) % this.circleMode.length;
    },
    //监听音乐进度
    listenProcess() {
      document.getElementById("audio").addEventListener("play", () => {
        console.log("开始");
      });
      document.getElementById("audio").addEventListener("ended", () => {
        if (this.selectCircleMode === 1) this.play(this.curSongs.index);
        else this.nextMusic();
      });
    },
    //控制暂停、播放
    control() {
      if (this.isPlaying) this.pauseMusic();
      else this.playMusic();
    },
    //下一首
    nextMusic() {
      let index = this.curSongs.index;
      if (this.playList.length & (this.playList.length < 1)) {
        this.play(index);
        return;
      }
      if (this.selectCircleMode === 2 || this.selectCircleMode === 1) {
        index = this.normalCircleR();
      } else if (this.selectCircleMode === 0) {
        index = this.randomCircle();
      }
      this.play(index);
    },
    //上一首
    lastMusic() {
      let index = this.curSongs.index;
      if (this.playList.length & (this.playList.length < 1)) {
        this.play(index);
        return;
      }
      if (this.selectCircleMode === 2 || this.selectCircleMode === 1) {
        index = this.normalCircleL();
      } else if (this.selectCircleMode === 0) {
        index = this.randomCircle();
      }

      this.play(index);
    },
    //普通正向循环播放
    normalCircleR() {
      return (this.curSongs.index + 1) % this.playList.length;
    },
    //普通逆向循环播放
    normalCircleL() {
      return (
        (this.curSongs.index - 1 + this.playList.length) % this.playList.length
      );
    },
    //随机播放
    randomCircle() {
      return Math.floor(Math.random() * (this.playList.length + 1));
    },
    //根据index播放音乐
    play(index) {
      this.setMusicSrc({
        songsId: this.playList[index],
        index,
      });
    },
    //播放
    playMusic() {
      document.querySelector("audio").play();
      this.isPlaying = true;
    },
    //暂停
    pauseMusic() {
      document.querySelector("audio").pause();
      this.isPlaying = false;
    },
    //音乐进度清零
    clearMusicProcess() {
      document.querySelector("audio").currentTime = 0;
    },
    //重新加载
    loadMusicProcess() {
      document.querySelector("audio").load();
      this.isPlaying = true;
    },
    //设置音乐播放源并重新加载
    async setMusicSrc(data) {
      this.pauseMusic();
      this.clearMusicProcess();
      await this.changeCurSongs(data);
      this.loadMusicProcess();
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
      min-width: 300px;
      display: flex;
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
        height: 15px;
        display: flex;
        align-items: center;
        background-color: var(--player-color);
        .process-bar {
          border: 20px;
          height: 2px;
          width: 100%;
          border: 10px;
          background-color: var(--primary-color);
          opacity: 0.3;
          &:hover {
            height: 5px;
            border-radius: 6px;
          }
          .passed-process {
            position: relative;
            width: 0px;
            height: 110%;
            background-color: rgb(207, 123, 123);
            #drager {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%) translateX(-50%);
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: var(--primary-color);
            }
          }
          &:hover .passed-process #drager,
          #drager:hover {
            box-shadow: 0 0 5px #333;
            width: 15px;
            height: 15px;
            cursor: pointer;
            user-select: none;
          }
        }
      }
    }
    .other-ctl {
      width: 100px;
      height: 100%;
      position: relative;
      .icon {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 20px;
      }
      #volume-ctl {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        text-align: center;
        background-color: aliceblue;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        transition: var(--tran-03);
        i.volume {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
        }
        &:hover {
          height: 100px;
          border-radius: 15px;
          transform: translateY(-65%) translateX(-50%);
          i.volume {
            bottom: 0;
          }
        }
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
          .process-bar {
            background-color: var(--text-color);
            #drager {
              background-color: var(--text-color);
            }
          }
        }
      }
    }
  }
}
</style>