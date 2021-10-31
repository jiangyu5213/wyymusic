import { Map } from "immutable";
import * as actionTypes from "./actionType";

const defaultState = Map({
  firstLoad: true,
  currentSong: {},
  currentSongIndex: 0,
  playSequence: 0, // 0循环播放  1随机播放  2单曲循环
  lyricList: [],
  currentLyricIndex: 0,
  playList: [],
  playListCount: 5,
  hotComments: [],
  currentCommentTotal: 0,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_FIRST_LOAD:
      return state.set("firstLoad", action.isLoad);
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set("currentSong", action.currentSong);
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set("currentSongIndex", action.index);
    case actionTypes.CHANGE_PLAY_SEQUENCE:
      return state.set("playSequence", action.sequence);
    case actionTypes.CHANGE_LYRIC_LIST:
      return state.set("lyricList", action.lyric);
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
      return state.set("currentLyricIndex", action.index);
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set("playList", action.playList);
    case actionTypes.CHANGE_PLAY_LIST_COUNT:
      return state.set("playListCount", action.count);
    case actionTypes.CHANGE_HOT_COMMENT:
      return state.set("hotComments", action.hotComments);
    case actionTypes.CHANGE_CURRENT_TOTAL:
      return state.set("currentCommentTotal", action.total);
    default:
      return state;
  }
}

export default reducer;
