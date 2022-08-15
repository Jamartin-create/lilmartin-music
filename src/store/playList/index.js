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
  async changeCurSongs({ commit, state }, ids) {
    const res = await getSongDetailById({
      ids,
    });
    if (res.code === 200) {
      const { songs } = res;
      const songsInfo = {
        songId: ids,
        title: songs[0].name,
        pic: songs[0].al.picUrl,
        alia: songs[0].alia,
        singer: songs[0].ar,
        url: `https://music.163.com/song/media/outer/url?id=${ids}.mp3`,
      };
      commit("CHANGE_CUR_SONGS", songsInfo);
    }
  },
};

const mutations = {
  CHANGE_CUR_SONGS(state, data) {
    console.log(data);
    state.curSongs = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
