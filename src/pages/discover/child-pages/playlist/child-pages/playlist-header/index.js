import React, { useState, memo } from "react";

import { useSelector, shallowEqual } from "react-redux";

import PlaylistCategory from "../playlist-category";

import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style";

function PlaylistHeader() {
  // hooks
  const [showCategory, setShowCategory] = useState(false);

  // redux
  const { currentCategory } = useSelector(
    (state) => ({
      currentCategory: state.getIn(["playlist", "currentCategory"]),
    }),
    shallowEqual
  );

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span className="title">{currentCategory}</span>
        <button
          className="select"
          onClick={() => setShowCategory(!showCategory)}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {showCategory ? <PlaylistCategory /> : null}
      </HeaderLeft>
      <HeaderRight>
        <button className="hot">热门</button>
      </HeaderRight>
    </HeaderWrapper>
  );
}

export default memo(PlaylistHeader);
