import request from "../request";

// 获取轮播图
export function getTopBanners() {
  return request({
    url: "/banner",
  });
}

// 获取推荐歌单
export function getHotRecommend(limit) {
  return request({
    url: "/personalized",
    params: {
      limit,
    },
  });
}

// 获取新专辑
export function getNewAlbums() {
  return request({
    url: "/album/newest",
  });
}

// 获取所有榜单
export function getToplist() {
  return request({
    url: "/toplist",
  });
}

// 获取热门歌手
export function getSingers(limit) {
  return request({
    url: "/top/artists",
    params: {
      limit,
    },
  });
}

// 获取热门主播
export function getAnchors(limit) {
  return request({
    url: "/dj/toplist/popular",
    params: {
      limit,
    },
  });
}
