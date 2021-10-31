import React, { memo, useEffect } from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getHotRecommendAction } from "../../store/actionCreator";

// 导入其他组件
import RecommendNavbar from "@/components/recommend-navbar";
import SongCover from "@/components/covers/song-cover";

import { HOT_RECOMMEND_LIMIT } from "@/common/constants";

import { HotRecommendWrapper } from "./style";

function HotRecommend(props) {
  const { history } = props;
  
  const { hotRecommend } = useSelector(
    state => ({
      hotRecommend: state.getIn(["recommend", "hotRecommend"]),
    }),
    shallowEqual
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);
  
  const handleKeyWordClick = item => {
    history.push(`/discover/songs?albumName=${item}`);
  };

  return (
    <HotRecommendWrapper>
      <RecommendNavbar
        title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
        keywordsClick={item => handleKeyWordClick(item)}
      />
      <div className="recommend-list">
        {hotRecommend &&
          hotRecommend.map(item => {
            return (
              <SongCover key={item.id} info={item} className="recommend-list">
                {item.name}
              </SongCover>
            );
          })}
      </div>
    </HotRecommendWrapper>
  );
}

export default memo(HotRecommend);
