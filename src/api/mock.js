import request from "@/util/mockRequest";

/**
 * 获取歌单列表
 * @param {Object} params
 * @param {Number} params.uid
 * @param {Number} params.limit
 * @returns
 */
export const getUserPlayListMock = () => {
  return request({
    method: "get",
    url: "/hub/playList",
  });
};

export const getUserMVListMock = () => {
  return request({
    method: "get",
    url: "/hub/mv",
  });
};

export const getUserAlbumListMock = () => {
  return request({
    method: "get",
    url: "/hub/album",
  });
};

export const getBannerMock = () => {
  return request({
    method: "get",
    url: "/home/banner",
  });
};

export const getRecomSongsMock = () => {
  return request({
    method: "get",
    url: "/home/recSongs",
  });
};

export const getRecomMVMock = () => {
  return request({
    method: "get",
    url: "/home/recMV",
  });
};

export const getRecomPlayList = () => {
  return request({
    method: "get",
    url: "/home/recPlayList",
  });
};
