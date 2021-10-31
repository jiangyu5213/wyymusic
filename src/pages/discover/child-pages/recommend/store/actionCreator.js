import * as actionTypes from "./actionType";

import {
  getTopBanners,
  getHotRecommend,
  getNewAlbums,
  getToplist,
  getSingers,
  getAnchors,
} from "@/api/api/recommend";

// 轮播图
export const changeTopBannersAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners, // 注意响应值 res 的属性不要写错
});

// 热门推荐
export const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommend: res.result,
});

// 新碟上架
export const changeNewAlbumsAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUMS,
  newAlbums: res.albums,
});

// 飙升榜
export const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist,
});
// 新歌榜
export const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist,
});
// 原创榜
export const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist,
});

// 入驻歌手
export const changeSingersAction = (res) => ({
  type: actionTypes.CHANGE_SINGERS,
  singers: res.artists,
});

export const changeAnchorsAction = (res) => ({
  type: actionTypes.CHANGE_ANCHORS,
  anchors: res.data.list,
})

/* 发送网络请求将结果传递到派发的 action 中 */

// 轮播图
export const getTopBannersAction = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannersAction(res));
    });
  };
};

// 热门推荐
export const getHotRecommendAction = (limit) => {
  return (dispatch) => {
    getHotRecommend(limit).then((res) => {
      dispatch(changeHotRecommendAction(res));
    });
  };
};

// 新碟上架
export const getNewAlbumsAction = () => {
  return (dispatch) => {
    getNewAlbums().then((res) => {
      dispatch(changeNewAlbumsAction(res));
    });
  };
};

// 榜单详情
export const getTopListAction = (idx) => {
  return (dispatch) => {
    getToplist(idx).then((res) => {
      switch (idx) {
        case 19723756:
          dispatch(changeUpRankingAction(res));
          break;
        case 3779629:
          dispatch(changeNewRankingAction(res));
          break;
        case 2884035:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  };
};

// 入驻歌手
export const getSingersAction = (limit) => {
  return (dispatch) => {
    getSingers(limit).then((res) => {
      dispatch(changeSingersAction(res));
    });
  };
};

// 热门主播
export const getAnchorsAction = (limit) => {
  return (dispatch) => {
    getAnchors(limit).then((res) => {
      dispatch(changeAnchorsAction(res))
    })
  }
}
