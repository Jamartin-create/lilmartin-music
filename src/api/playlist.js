import request from "@/util/requets";

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
    },
  });
};
