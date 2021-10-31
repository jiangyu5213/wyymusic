import request from "../request";

// 获取歌曲评论
export function getSongComments(id, limit = 20, offset) {
  return request({
    url: "/comment/music",
    params: {
      id,
      limit,
      offset,
      timestamp: new Date().getTime(),
    },
  });
}

// 获取热门评论
export function getHotComments(id, type = 0) {
  return request({
    url: "/comment/hot",
    params: {
      id,
      type,
    },
  });
}

// 发送/删除评论
export function handleSongComment(id, content, cookie) {
  return request({
    url: "/comment",
    method: "get",
    params: {
      t: 1, // 发送
      type: 0, // 歌曲类型
      id,
      content: content,
      cookie: cookie,
      timestamp: new Date().getTime(),
    },
  });
}

// 给评论点赞
// cid: 评论 id, t: 是否点赞, 1 为点赞, 0 为取消点赞
export function likeComment(id, cid, t, cookie) {
  return request({
    url: "/comment/like",
    params: {
      id,
      cid,
      t,
      type: 0,
      cookie,
    },
  });
}
