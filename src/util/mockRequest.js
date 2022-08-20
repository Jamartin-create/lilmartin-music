import router from "@/router";
import axios from "axios";
import { doLogout, getCookie } from "./auth";

const baseURL = "http://localhost:9200/data/lilmartinmusic/";

const instance = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
});

//请求拦截
instance.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {};
    }
    //添加token
    if (baseURL.length) {
      config.params.cookie = `MUSIC_U=${getCookie("MUSIC_U")}`;
    }
    return config;
  },
  (config) => {}
);

//响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    //跳转登录
    if (
      err.response &&
      typeof err.response.data === "object" &&
      err.response.data.code === 301 &&
      err.response.data.msg === "需要登录"
    ) {
      console.warn("Token has expired, logout now!");
      doLogout();
      router.push({ name: "login" });
    }
  }
);

export default instance;
