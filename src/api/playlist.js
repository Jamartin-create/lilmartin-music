import request from "@/util/requets";

/**
 *
 * @param {Object} params :
 *      keywords：关键词
 *      limit：返回数量
 *      offset：偏移量，用于分页
 *      type：1：单曲、10：专辑、100：歌手、1000：歌单、1002：用户、1004：MV、1006：歌词、1009：电台、1014：视频、1018：综合、2000：声音
 * @returns
 */
export const searchByKeywords = (params) => {
  return request({
    method: "get",
    url: "/search",
    params: {
      ...params,
      timestamp: new Date().getTime(),
    },
  });
};

export const getSonsUrl = (params) => {
  return request({
    method: "get",
    url: "/song/url",
    params: {
      ...params,
      timestamp: new Date().getTime(),
      br: 320000,
    },
  });
};

export const getSongDetailById = (params) => {
  return request({
    method: "get",
    url: "/song/detail",
    params: {
      ...params,
      timestamp: new Date().getTime(),
    },
  });
};

export const getPlayListAllSongsById = (params) => {
  return request({
    method: "get",
    url: "/playlist/detail",
    params: {
      ...params,
      timestamp: new Date().getTime(),
    },
  });
};
