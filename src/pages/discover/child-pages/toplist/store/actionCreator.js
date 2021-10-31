import * as actionTypes from './actionTypes'

import { getToplist } from '@/api/api/recommend'
import { getPlaylistDetails } from '@/api/api/playlist'

// 改变榜单头部信息 Action
const changeToplistHeaderInfo = (HeaderInfo) => ({
  type: actionTypes.CHANGE_CURRENT_TOPLIST_HEADER_INFO,
  HeaderInfo,
})

// 改变榜单信息 Action
const changeToplistAction = (toplistInfo) => ({
  type: actionTypes.CHANGE_TOPLIST_COUNT,
  toplistInfo,
})

// 改变不同榜单列表 Action
const changeCurrentToplist = (toplist) => ({
  type: actionTypes.CHANGE_CURRENT_TOPLIST,
  toplist,
})

// 改变榜单 ID Action（不同 ID 对应飙升榜/新歌榜/原创榜等）
export const changeCurrentToplistIdAction = (id) => ({
  type: actionTypes.CHANGE_CURRENT_TOPLIST_ID,
  id,
})

// 改变榜单 Index Action（不同 Index 对应云音乐特色榜/全球媒体榜等）
export const changeCurrentIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_INDEX,
  index,
})

/* ------------- network ------------- */

// 获取榜单数据 network
export const getToplistInfoAction = () => {
  return (dispatch) => {
    getToplist().then((res) => {
      dispatch(changeToplistAction(res.list))
    })
  }
}

// 获取榜单头部信息 network
export const getToplistHeaderInfoAction = (id) => {
  return (dispatch) => {
    getPlaylistDetails(id).then((res) => {
      // 取出榜单标题详情信息
      const {
        coverImgUrl,
        name,
        trackNumberUpdateTime,
        playCount,
        subscribedCount,
        commentCount,
        shareCount,
      } = res && res.playlist

      const toplistHeaderInfo = {
        coverImgUrl,
        name,
        trackNumberUpdateTime,
        playCount,
        subscribedCount,
        commentCount,
        shareCount,
      }
      
      dispatch(changeToplistHeaderInfo(toplistHeaderInfo))
    })
  }
}

// 获取榜单列表详情信息 network
export const getToplistItemAction = (id) => {
  return (dispatch) => {
    getPlaylistDetails(id).then((res) => {
      const currentToplist = res && res.playlist && res.playlist.tracks
      dispatch(changeCurrentToplist(currentToplist))
    })
  }
}
