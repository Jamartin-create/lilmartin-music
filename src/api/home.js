import request from "@/util/requets";

//轮播图
export const getBanner = () => {
  return request({
    mathod: "get",
    url: "/banner",
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

//mv
export const getRecMV = () => {
  return request({
    method: "get",
    url: "/personalized/mv",
    params: {
      timestamp: new Date().getTime(),
    },
  });
};

//推荐新歌
export const getRecomSongs = (params) => {
  return request({
    method: "get",
    url: "/personalized/newsong",
    params: {
      ...params,
      timestamp: new Date().getTime(),
    },
  });
};

//推荐播放列表
export const getRecomPlayList = () => {
  return request({
    method: "get",
    url: "/personalized",
    params: {
      timestamp: new Date().getTime(),
    },
  });
};
