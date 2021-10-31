import * as actionTypes from "./actionType";
import { SONG_LIST_LIMIT } from "@/common/constants";

import { getPlaylistCategory, getPlaylists } from "@/api/api/playlist";
import { handleSongsCategory } from "@/utils/handle-song";

const changeCategoryAction = (res) => ({
  type: actionTypes.CHANGE_CATEGORY,
  category: res,
});

const changeSongListAction = (res) => ({
  type: actionTypes.CHANGE_CATEGORY_SONGS,
  categorySongs: res,
});

export const changeCurrentCategoryAction = (name) => ({
  type: actionTypes.CHANGE_CURRENT_CATEGORY,
  currentCategory: name,
});

export const getCategory = () => {
  return (dispatch) => {
    getPlaylistCategory().then((res) => {
      const categoryData = handleSongsCategory(res);
      dispatch(changeCategoryAction(categoryData));
    });
  };
};

export const getSongList = (page) => {
  return (dispatch, getState) => {
    // 1.获取currentCategory
    const name = getState().getIn(["songList", "currentCategory"]);

    // 2.获取数据
    getPlaylists(name, page * SONG_LIST_LIMIT).then((res) => {
      dispatch(changeSongListAction(res));
    });
  };
};
