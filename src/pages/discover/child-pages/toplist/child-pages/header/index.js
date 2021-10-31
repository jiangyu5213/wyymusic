import React, { memo } from "react";

import { shallowEqual, useSelector } from "react-redux";

import { FieldTimeOutlined } from "@ant-design/icons";

import { parseImageUrl } from "@/utils/parse-url";
import { formatMonthDay } from "@/utils/handle-date";

import { ToplistHeaderWrapper } from "./style";

function ToplistHeader() {
  const { headerInfo } = useSelector(
    (state) => ({
      headerInfo: state.getIn(["toplist", "currentToplistHeaderInfo"]),
    }),
    shallowEqual
  );

  const picUrl = headerInfo && headerInfo.coverImgUrl;
  const name = headerInfo && headerInfo.name;
  const updateTime = headerInfo && headerInfo.trackNumberUpdateTime;
  const commentCount = headerInfo && headerInfo.commentCount;
  const shareCount = headerInfo && headerInfo.shareCount;
  const subscribedCount = headerInfo && headerInfo.subscribedCount;

  return (
    <ToplistHeaderWrapper>
      <div className="title-image">
        <img src={parseImageUrl(picUrl, 150)} alt="" />
        <div className="image_cover msk"></div>
      </div>
      <div className="title-info">
        <h2>{name}</h2>
        <div className="update-info">
          <FieldTimeOutlined className="timer" />
          最近更新: {formatMonthDay(updateTime)}
        </div>
        <div className="controls">
          <div className="sprite_button play">
            <i className="sprite_button inner">
              <em className="sprite_button play-icon"></em>
              播放
            </i>
          </div>
          <div className="sprite_button favorite">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>(
              {subscribedCount})
            </i>
          </div>
          <div className="sprite_button share">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>({shareCount})
            </i>
          </div>
          <div className="sprite_button download">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>
              下载
            </i>
          </div>
          <div className="sprite_button comment">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>({commentCount})
            </i>
          </div>
        </div>
      </div>
    </ToplistHeaderWrapper>
  );
}

export default memo(ToplistHeader);
