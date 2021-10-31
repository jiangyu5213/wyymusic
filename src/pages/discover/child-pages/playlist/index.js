import React, { useEffect, memo } from "react";

import { useLocation } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import {
  getCategory,
  getSongList,
  changeCurrentCategoryAction,
} from "./store/actionCreators";

// 子组件
import PlaylistHeader from "./child-pages/playlist-header";
import PlaylistList from "./child-pages/playlist-main";

import { getQueryObject } from "@/utils/parse-url";

import { PlaylistWrapper } from "./style";

function Playlist() {
  // props/state
  const { albumName } = getQueryObject();

  // redux
  const dispatch = useDispatch();
  const cat = useLocation().cat;

  useEffect(() => {
    dispatch(changeCurrentCategoryAction(albumName || cat));
  }, [dispatch, cat, albumName]);

  // hooks
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSongList(0));
  }, [dispatch]);

  return (
    <PlaylistWrapper className="wrap-v2">
      <PlaylistHeader />
      <PlaylistList />
    </PlaylistWrapper>
  );
}

export default memo(Playlist);
