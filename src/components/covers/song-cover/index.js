import React, { memo } from "react";

import { getPlayCount } from "@/utils/handle-song";
import { parseImageUrl } from "@/utils/parse-url";

import { SongCoverWrapper } from "./style";

/* 歌曲封面组件 */
function SongCover(props) {
  const { info, songList, width = 140 } = props;
  // 图片URL
  const picUrl =
    (info && (info.picUrl || info.coverImgUrl)) ||
    (songList && songList.coverImgUrl);
  // 播放量
  const playCount =
    (info && info.playCount) || (songList && songList.playCount) || 0;
  // 名称
  const name = (info && info.name) || (songList && songList.name);
  // 昵称
  const nickname =
    (info && info.copywriter) || (songList && songList.creator.nickname);
  // 歌曲ID
  const songInfoId = (info && info.id) || (songList && songList.id);

  return (
    <SongCoverWrapper
      width={width}
      href={`#/songlist?songlistId=${songInfoId}`}
    >
      <div className="cover-wrapper">
        <img src={parseImageUrl(picUrl, 140)} alt="" />
        <div className="cover-mask sprite_cover">
          <div className="bottom-bar sprite_cover">
            <span>
              <i className="sprite_icon erji"></i>
              {getPlayCount(playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-title text-nowrap">by-{name}</div>
      {/* <div className="cover-source text-nowrap">
        by {(info && info.copywriter) || nickname}
      </div> */}
    </SongCoverWrapper>
  );
}

export default memo(SongCover);
