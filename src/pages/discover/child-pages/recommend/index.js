import React, { memo } from "react";

import TopBanners from "./child-pages/top-banners";
import HotRecommend from "./child-pages/hot-recommend";
import NewAlbums from "./child-pages/new-albums";
import RankingList from "./child-pages/ranking-list";
import UserLogin from "./child-pages/user-login";
import HotAnchors from "./child-pages/hot-anchors";
import Singers from "./child-pages/singers";

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

function Recommend(props) {
  return (
    <RecommendWrapper>
      <TopBanners />

      <Content className="w980">
      <RecommendLeft>
        <HotRecommend history={props.history} />
        <NewAlbums />
        {/* <RankingList to={props.history} /> */}
      </RecommendLeft>

      <RecommendRight>
        <UserLogin />
        <Singers />
        <HotAnchors />
      </RecommendRight>
    </Content>
  </RecommendWrapper>
  )
}

export default memo(Recommend);
