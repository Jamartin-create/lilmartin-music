//初始用户localStorage的data值
const userData = {
  profile: {},
  likedSongPlaylistID: 0,
  lastRefreshCookieDate: 0,
  loginMode: null,
};
//初始系统localStorage的data值
const sysData = {
  isLight: true,
};

//初始歌单localstorage的data值
const playListData = {
  curSongs: {},
  playList: [],
};

export default {
  userData,
  sysData,
  playListData,
};
