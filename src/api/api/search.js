import request from "../request";

// 获取搜索结果
// 调用此接口, 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户, 关键词可以多个, 以空格隔开, 如 "周杰伦 搁浅"
export function getSearchData(keywords, limit = 6, type = 1) {
  return request({
    url: "/search",
    params: {
      keywords,
      limit,
      type,
    },
  });
}
