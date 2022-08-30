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
          <i class="icon set-space"></i>
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
        <div class="volume">
          <i class="icon iconfont icon-volume" id="volume-icon"></i>
          <div id="volume-ctl" ref="volumeCtl">
            <div id="volume-process" ref="volumeProcess">
              <div id="volume-passed" ref="volumePassed">
                <div id="volume-dragger" ref="volumeDragger"></div>
              </div>
            </div>
          </div>
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
      audio: "",
      process: "",
      passedProcess: "",
      dragger: "",
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
      isVolumeDraging: false,
      curVolume: 0,
      isProcessDraging: false,
      curDuration: 0, //当前播放的进度
      durationInterval: "", //定时器（同步播放进度和dragger）
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
      //注册虚拟dom(进度控件)
      this.audio = this.$refs.audio;
      this.process = this.$refs.process;
      this.passedProcess = this.$refs.passedProcess;
      this.dragger = this.$refs.drager;
      //音量控件
      this.volumeCtl = this.$refs.volumeCtl;
      this.volumeProcess = this.$refs.volumeProcess;
      this.volumePassed = this.$refs.volumePassed;
      this.volumeDragger = this.$refs.volumeDragger;
      //定义监听
      this.process.onmousedown = this.processMouseDown;
      this.dragger.onmousedown = this.draggerMouseDown;
      window.onmouseup = this.mouseUp;
      window.onmousemove = this.mouseMove;
    },
    //鼠标抬起
    mouseUp(event) {
      if (!this.isVolumeDraging && !this.isProcessDraging) return;
      if (this.isProcessDraging) this.mouseUpFromProcess(event);
      if (this.isVolumeDraging) this.mouseUpFromVolume(event);
    },
    //鼠标在全局移动
    mouseMove(event) {
      if (!this.isVolumeDraging && !this.isProcessDraging) return;
      if (this.isProcessDraging) this.mouseMoveFromProcess(event);
      if (this.isVolumeDraging) this.mouseMoveFromVolume(event);
    },
    /**
     *
     * 进度条控件
     */
    //鼠标拖动进度条时抬起
    mouseUpFromProcess(event) {
      this.isProcessDraging = false;
      if (!this.audio.paused) this.setDurationInterval();
      this.changeCurrentTime(this.computePassedLength(event));
    },
    //计算进度条dragger移动的路径
    computePassedLength(event) {
      let sideBarWidth = document
        .getElementById("sidebar")
        .getBoundingClientRect().width;
      let processLength = this.process.getBoundingClientRect().width;
      //计算已走过的长度
      let passedWidth =
        event.clientX - (sideBarWidth + this.process.offsetLeft);
      if (passedWidth < 0) {
        return 0;
      } else if (passedWidth >= processLength) {
        return processLength / this.processScale;
      }
      return Math.floor(passedWidth / this.processScale);
    },
    //绑定进度拖拽按钮监听
    draggerMouseDown() {
      this.isProcessDraging = true;
      this.clearDurationInterval();
    },
    //鼠标拖动进度条时移动事件
    mouseMoveFromProcess(event) {
      let passedTime = this.computePassedLength(event);
      this.changeDraggerPosition(passedTime * this.processScale);
    },
    //鼠标在进度条上按下
    processMouseDown(event) {
      let passedTime = this.computePassedLength(event);
      this.changeCurrentTime(passedTime);
    },
    //更新dragger和走过路径的位置
    changeDraggerPosition(length) {
      this.passedProcess.style.width = length + "px";
      this.dragger.style.left = length + "px";
    },
    //设置定时器
    setDurationInterval() {
      this.durationInterval = setInterval(() => {
        this.curDuration = this.getCurrentTime() * this.processScale;
        this.changeDraggerPosition(this.curDuration);
      }, 10);
    },
    //清空定时器
    clearDurationInterval() {
      clearInterval(this.durationInterval);
    },
    //改变播放进度
    changeCurrentTime(time) {
      this.audio.currentTime = time;
      this.changeDraggerPosition(time * this.processScale);
    },
    //获取播放进度
    getCurrentTime() {
      return this.audio.currentTime;
    },

    /**
     * 播放控件
     */
    //切换循环模式
    changeCircleMode() {
      this.selectCircleMode =
        (this.selectCircleMode + 1) % this.circleMode.length;
    },
    //监听音乐进度
    listenProcess() {
      document.getElementById("audio").addEventListener("play", () => {
        // console.log("开始");
      });
      document.getElementById("audio").addEventListener("ended", () => {
        if (this.selectCircleMode === 1) this.play(this.curSongs.index);
        else this.nextMusic();
      });
    },
    //控制暂停、播放
    control() {
      this.isPlaying = this.audio.paused;
      if (this.audio.paused) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    },
    //下一首
    nextMusic() {
      if (this.playList.length === 0) return;
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
      if (this.playList.length === 0) return;
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

    /**
     * audio控件
     */
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
      this.setDurationInterval();
    },
    //暂停
    pauseMusic() {
      document.querySelector("audio").pause();
      this.clearDurationInterval();
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
    background-color: var(--sidebar-color);
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

        //所有icon的浮动样式
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
        }
        .icon:hover {
          background-color: var(--primary-color);
          color: var(--primary-color-light);
          transition: var(--tran-03);
        }
        .icon {
          &:nth-child(3) {
            width: 40px;
            height: 40px;
            line-height: 40px;
          }
          &:nth-child(2) {
            transform: rotate(180deg);
          }
        }
      }
      .process-ctl {
        width: calc(100% - 20px);
        min-width: 300px;
        height: 15px;
        display: flex;
        align-items: center;
        background-color: var(--sidbar-color);
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
            height: 100%;
            border-radius: 6px;
            background-color: var(--music-process-color);
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
      height: calc(100% - 10px);
      position: relative;
      .volume {
        .icon {
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          font-weight: lighter;
          text-align: center;
          cursor: pointer;
        }
        #volume-icon.icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          font-size: 25px;
          width: 40px;
          height: 40px;
          border-radius: 0;
          line-height: 40px;
          background-color: transparent;
          z-index: 2;
        }
        #volume-ctl:hover,
        #volume-icon.icon:hover ~ #volume-ctl {
          & * {
            transition: var(--tran-03);
          }
          transition: var(--tran-03);
          position: absolute;
          width: 40px;
          height: 130px;
          #volume-process {
            width: 3px;
            height: 100px;
            #volume-passed {
              width: 3px;
              height: 10px;
              #volume-dragger {
                width: 10px;
                height: 10px;
              }
            }
          }
        }
        #volume-ctl {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateY(-40%) translateX(-50%);
          width: 0px;
          height: 0px;
          border-radius: 8px;
          background-color: var(--primary-color);
          z-index: 1;
          #volume-process {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            width: 0px;
            height: 0px;
            background-color: var(--primary-color-light);
            #volume-passed {
              position: absolute;
              bottom: 0;
              width: 0px;
              height: 0px;
              background-color: red;
              #volume-dragger {
                position: absolute;
                top: 0;
                left: 50%;
                width: 0px;
                height: 0px;
                border-radius: 50%;
                transform: translateY(-50%) translateX(-50%);
                background-color: red;
              }
            }
          }
        }
        // div#volume-ctl:hover,
        // .icon:hover ~ div#volume-ctl {
        //   height: 100px;
        //   transition: var(--tran-03);
        //   z-index: 5;
        //   #volume-passed {
        //     height: 80px;
        //     width: 2px;
        //     z-index: 6;
        //     #volume-dragger {
        //       width: 10px;
        //       height: 10px;
        //       z-index: 10;
        //     }
        //   }
        // }
      }
    }
  }
}

body.dark {
  #player {
    .player-wrapper {
      .player-ctl {
        .play-pause {
          .icon:hover {
            color: var(--text-color);
          }
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
      .other-ctl {
        .volume {
          #volume-ctl {
            #volume-process {
              background-color: var(--text-color);
            }
          }
        }
      }
    }
  }
}
</style>