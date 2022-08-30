import sysSetting from "./sysInitLocalStorage";

if (localStorage.getItem("sysSetting") === null) {
  localStorage.setItem("sysSetting", JSON.stringify(sysSetting));
}

const state = {
  //系统配置
  setting: JSON.parse(localStorage.getItem("sysSetting")) ?? {},
  //消息弹窗
  toast: {
    show: false,
    text: "",
    timer: null,
  },
};

const getters = {};

const actions = {
  changeMode({ commit }) {
    document.querySelector("body").classList.toggle("dark");
    commit("CHANGE_MODE");
  },
  showToast({ state, commit }, text) {
    //先清除上次的定时
    if (state.toast.timer !== null) {
      clearTimeout(state.toast.timer);
      commit("UPDATE_TOAST", {
        show: false,
        text: "",
        timer: null,
      });
    }
    commit("UPDATE_TOAST", {
      show: true,
      text: text,
      //通过闭包，在定时器结束后再次将弹窗内容设为空字符串
      timer: setTimeout(() => {
        commit("UPDATE_TOAST", {
          show: false,
          text: state.toast.text,
          timer: null,
        });
      }, 3000),
    });
  },
};

const mutations = {
  CHANGE_MODE(state) {
    state.setting.isLight = !state.setting.isLight;
    localStorage.setItem("sysSetting", JSON.stringify(state.setting));
  },
  UPDATE_TOAST(state, data) {
    state.toast = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
