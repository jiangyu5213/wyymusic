import React, { memo } from "react";

import SongItem from "@/components/playlist-songItem"; // 导入其他组件

import { formatMinuteSecond } from "@/utils/handle-date.js";

import { PlatlistWrapper } from "./style";

import propTypes from "prop-types";

function ThemePlaylist(props) {
  const { playlist } = props;
  return (
    <PlatlistWrapper>
      <div className="main-header">
        <div className="sprite_table header-item"></div>
        <div className="sprite_table header-item header-title">标题</div>
        <div className="sprite_table header-item header-time">时长</div>
        <div className="sprite_table header-item header-singer">歌手</div>
      </div>
      <div className="main-list">
        {playlist &&
          playlist.slice(0, 100).map((item, index) => {
            return (
              <SongItem
                key={item.id}
                className="song-item"
                currentRanking={index + 1}
                coverPic={index < 3 ? item.al.picUrl : ""}
                duration={formatMinuteSecond(item.dt)}
                songName={item.name}
                singer={item.ar[0].name}
                songId={item.id}
              />
            );
          })}
      </div>
    </PlatlistWrapper>
  );
}

ThemePlaylist.propTypes = {
  playlist: propTypes.array.isRequired,
};

export default memo(ThemePlaylist);
