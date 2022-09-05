/**
 * @description 控制播放列表
 */
import myLocalStorage from "@/store/defaultLocalStorage";
import { getSongDetailById, getSonsUrl } from "@/api/playlist";

if (localStorage.getItem("playList") === null) {
  localStorage.setItem("playList", JSON.stringify(myLocalStorage.playListData));
}

const state = {
  ...(JSON.parse(localStorage.getItem("playList")) ?? {}),
};
const getters = {};
const actions = {
  /**
   * @description 切歌
   * @param {*} context
   * @param {*} data
   */
  async changeCurSongs({ commit }, { songsId, index }) {
    const res = await getSongDetailById({
      ids: songsId,
    });
    const musicUrl = await getSonsUrl({
      id: songsId,
      level: "standard",
    });
    if (res.code === 200) {
      const { songs } = res;
      const songsInfo = {
        index,
        songId: songsId,
        title: songs[0].name,
        pic: songs[0].al.picUrl,
        alia: songs[0].alia,
        singer: songs[0].ar,
        url: musicUrl.data[0].url,
        duration: songs[0].dt,
      };
      commit("CHANGE_CUR_SONGS", songsInfo);
    }
  },
  /**
   * @description 更新当前播放列表
   * @param {*} context
   * @param {*} list 歌单列表
   */
  async changePlayList({ commit }, list = []) {
    commit(
      "CHANGE_PLAY_LIST",
      list.map((item) => item.id)
    );
  },
};
const mutations = {
  CHANGE_CUR_SONGS(state, data) {
    state.curSongs = data;
  },
  CHANGE_PLAY_LIST(state, data) {
    state.playList = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
