import store from "@/store";
import Cookies from "js-cookie";
import { logout } from "@/api/user";

/**
 * 存储cookies
 * @param {String} string 拆分获取的Cookie值，分组存储
 */
export function setCookies(string) {
  const cookies = string.split("; HTTPOnly;");
  cookies.map((cookie) => {
    document.cookie = cookie;
    const cookieKeyValue = cookie.split(";")[0].split("=");
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
  });
}

/**
 *
 * @param {String} key
 * @returns 根据key获取cookie
 */
export function getCookie(key) {
  return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`);
}

//删除COOKIE
export function removeCookie(key) {
  Cookies.remove(key);
  localStorage.removeItem(`cookie-${key}`);
}

/**
 * 判断当前登录状态
 * @returns boolean
 */
export function isLoging() {
  return getCookie("MUSIC_U") && getCookie("MUSIC_U") !== undefined;
}

/**
 * 判断当前是否已登录账号
 * @retuns boolean
 */
export function isAccountLogin() {
  return (
    getCookie("MUSIC_U") &&
    getCookie("MUSIC_U") !== undefined &&
    store.state.user.data.loginMode === "account"
  );
}

//登出
export function doLogout() {
  logout();
  removeCookie("MUSIC_U");
  removeCookie("__csrf");
  //更新仓库中用户信息、登录态、喜欢列表
  store.commit("user/UPDATE_USER_PROFILE", {});
  store.commit("user/UPDATE_USER_LOGIN_MODE", null);
  store.commit("user/UPDATE_USER_LIKE_PLAY_LIST_ID", undefined);
}
