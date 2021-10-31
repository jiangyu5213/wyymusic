import request from "../request";

// 获取歌单分类
export function getPlaylistCategory() {
  return request({
    url: "/playlist/catlist",
  });
}

// 获取歌单 ( 网友精选碟 )
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从歌单分类接口获取 (/playlist/catlist)
export function getPlaylists(cat = "全部", offset = 0, limit = 35) {
  return request({
    url: "/top/playlist",
    params: {
      cat,
      limit,
      offset,
    },
  });
}

// 获取歌单详情
// 传入歌单 id, 可以获取对应歌单内的所有的音乐 (未登录状态只能获取不完整的歌单,登录后是完整的)
export function getPlaylistDetails(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
}

// 收藏/取消收藏歌单
export function handlePlaylistSub(id, cookie) {
  return request({
    url: "/playlist/subscribe",
    params: {
      t: 1,
      id,
      cookie,
    },
  });
}