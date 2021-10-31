import request from "../request";

// 获取歌曲详情
export function getSongDetails(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids,
    },
  });
}

// 获取歌词
export function getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}

// 获取相似歌曲
export function getSimilarSongs(songid) {
  return request({
    url: "/simi/song",
    params: {
      id: songid,
    },
  });
}

// 获取每日推荐歌曲 ( 需要登录 )
export function getRecommendSongs(cookie) {
  return request({
    url: "/recommend/songs",
    method: "get",
    params: {
      cookie: cookie,
    },
  });
}
