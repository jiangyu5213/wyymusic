import { getSearchData } from '@/api/api/search'
import * as actionTypes from './actionType'

// 改变歌曲列表 Action
const changeSongListAction = (songs) => ({
  type: actionTypes.CHANGE_SEARCH_SONG_LIST,
  songs
})

// 改变歌手列表
const changeSingerListAction = (singerList) => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  singerList: singerList
})

// 搜索歌曲列表 network
export const getSearchSongListAction = (songName, limit, type = 1) => {
  return (dispatch) => {
    getSearchData(songName, limit, type).then((res) => {
      const songs = res && res.result.songs
      dispatch(changeSongListAction(songs))
    })
  } 
}

// 搜索歌手列表 network
export const getSearchSingerListAction = (song, limit, type) => {
  return (dispatch) => {
    getSearchData(song, 20, type).then((res) => {
      const singerList = res.result && res.result.artists
      dispatch(changeSingerListAction(singerList))
    })
  }
}