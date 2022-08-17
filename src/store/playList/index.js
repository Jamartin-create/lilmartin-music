import playList from "./playListInitLocalStorage";
import { getSongDetailById } from "@/api/playlist";

if (localStorage.getItem("playList") === null) {
  localStorage.setItem("playList", JSON.stringify(playList));
}

const state = {
  ...(JSON.parse(localStorage.getItem("playList")) ?? {}),
};

const getters = {};

const actions = {
  async changeCurSongs({ commit }, { songsId, index }) {
    const res = await getSongDetailById({
      ids: songsId,
    });
    console.log(res);
    if (res.code === 200) {
      const { songs } = res;
      const songsInfo = {
        index,
        songId: songsId,
        title: songs[0].name,
        pic: songs[0].al.picUrl,
        alia: songs[0].alia,
        singer: songs[0].ar,
        url: `https://music.163.com/song/media/outer/url?id=${songsId}.mp3`,
        duration: songs[0].dt,
      };
      commit("CHANGE_CUR_SONGS", songsInfo);
    }
  },
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
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
