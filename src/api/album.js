import request from "@/util/requets";

//获取专辑内容
export const getAlbumInfo = (params) => {
  return request({
    url: "/album",
    method: "get",
    params: {
      ...params,
      timestamp: new Date().getTime(),
    },
  });
};
