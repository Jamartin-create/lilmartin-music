import sysSetting from "./sysInitLocalStorage";

if (localStorage.getItem("sysSetting") === null) {
  localStorage.setItem("sysSetting", JSON.stringify(sysSetting));
}

const state = {
  data: JSON.parse(localStorage.getItem("sysSetting")) ?? {},
};

const getters = {};

const actions = {
  changeMode({ commit }) {
    document.querySelector("body").classList.toggle("dark");
    commit("CHANGE_MODE");
  },
};

const mutations = {
  CHANGE_MODE(state) {
    state.data.isLight = !state.data.isLight;
    localStorage.setItem("sysSetting", JSON.stringify(state.data));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
