import { isLoging, isAccountLogin, doLogout } from "@/util/auth";
import { getUserAccount, getUserPlayList } from "@/api/user";
import updataApp from "@/util/updataApp";
import myLocalStorage from "@/store/defaultLocalStorage";
import provinces from "../dataSource/provinces";
import nProgress from "nprogress";
import store from "@/store";
import router from "@/router";

if (localStorage.getItem("data") === null) {
  localStorage.setItem("data", JSON.stringify(myLocalStorage.userData));
}

//刷新localstorage
updataApp();

const state = {
  ...(JSON.parse(localStorage.getItem("data")) ?? {}),
};

const getters = {};

const actions = {
  /**
   * @description 获取用户信息
   * @param {Object} context store上下文对象
   * @returns
   */
  async fetchUserAccount({ commit }) {
    if (!isLoging()) return;
    nProgress.start();
    const res = await getUserAccount();
    nProgress.done();
    if (res.code === 200 && res.account != null) {
      console.log(res);
      const provinceInfo = {
        provinceName: "未知",
        provinceLabel: "Unknow",
      };
      provinces.province.forEach((item) => {
        if (item.code === res.profile.province) {
          provinceInfo.provinceName = item.name;
          provinceInfo.provinceLabel = item.label;
        }
      });
      commit("UPDATE_USER_PROFILE", {
        ...res.profile,
        ...provinceInfo,
      });
    } else {
      store.dispatch("sys/showToast", "获取账号信息失败，请重新登录");
      doLogout();
      router.dispatch({ name: "login" });
    }
  },
  /**
   * @description 获取用户的歌单
   * @param {Object} context
   * @returns
   */
  async fetchUserPlayList({ commit, state }) {
    if (!isAccountLogin()) return;
    if (isAccountLogin()) {
      nProgress.start();
      return getUserPlayList({
        uid: state.data.profile.userId,
        limit: 2000,
      }).then((res) => {
        nProgress.done();
        if (res.playlist) {
          commit("UPDATE_USER_PLAY_LIST", res.playlist);
          commit("UPDATE_USER_LIKE_PLAY_LIST_ID", res.playlist[0].id);
        }
      });
    }
  },
};

const mutations = {
  //更新账户信息
  UPDATE_USER_PROFILE(state, data) {
    state.data.profile = data;
  },
  //更新登录模式（账户登录或其他）
  UPDATE_USER_LOGIN_MODE(state, data) {
    state.data.loginMode = data;
  },
  //更新歌单
  UPDATE_USER_PLAY_LIST(state, data) {
    state.playLists = data;
  },
  //更新我喜欢的音乐歌单id
  UPDATE_USER_LIKE_PLAY_LIST_ID(state, data) {
    state.data.likeSongPlayListId = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
