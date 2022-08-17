//vuex自定义插件
export default (store) => {
  store.subscribe((mutations, state) => {
    if (
      [
        "user/UPDATE_USER_PROFILE",
        "user/UPDATE_USER_PLAY_LIST",
        "user/UPDATE_USER_LOGIN_MODE",
        "user/UPDATE_USER_LIKE_PLAY_LIST_ID",
      ].includes(mutations.type)
    ) {
      localStorage.setItem("data", JSON.stringify(state.user.data));
    } else if (
      ["playList/CHANGE_CUR_SONGS", "CHANGE_PLAY_LIST"].includes(mutations.type)
    ) {
      localStorage.setItem("playList", JSON.stringify(state.playList));
    }
  });
};
