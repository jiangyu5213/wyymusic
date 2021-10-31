import * as actionTypes from "./actionType";

import { getSearchData } from '@/api/api/search'

// 搜索歌曲
export const changeSearchSongListAction = songList => ({
  type: actionTypes.CHANGE_SEARCH_SONG_LIST,
  songList,
});

export const getSearchSongListAction = (searchStr) => {
  return (dispatch) => {
    getSearchData(searchStr).then((res) => {
      const songList = res.result && res.result.songs;
      dispatch(changeSearchSongListAction(songList));
    });
  };
};

export const changeFocusStateAction = state => ({
    type: actionTypes.CHANGE_FOCUS_STATE,
    state
})