function MyAudio(audio) {
  this.audio = audio;
}

//更新当前播放位置
MyAudio.prototype.changeCurrentTime = (time) => {
  this.audio.currentTime = time;
};

//获取当前播放位置
MyAudio.prototype.getCurrentTime = () => {
  return this.audio.currentTime;
};

//更新音量
MyAudio.prototype.changeVolume = (size) => {
  this.audio.volume = size;
};

//获取当前音量
MyAudio.prototype.getVolume = () => {
  return this.audio.volume;
};

//获取起始时间
MyAudio.prototype.getStartTime = () => {
  return this.audio.starTime();
};

//播放/暂停音乐
MyAudio.prototype.playOrPauseMusic = () => {
  if (this.audio.paused) {
    this.audio.play();
  } else {
    this.audio.paused();
  }
};

//重新加载音乐
MyAudio.prototype.reloadMusic = () => {
  this.audio.load();
};

export default MyAudio;
