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