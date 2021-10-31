import React, { memo } from "react";

import { NavLink } from "react-router-dom";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSongDetailAction } from "@/pages/song-player/store/actionCreator";

// 其他组件和函数
import { PlayCircleOutlined } from "@ant-design/icons";
import { message } from "antd";
// import { useAddPlaylist } from '@/hooks/change-music'
import { parseImageUrl } from "@/utils/parse-url";

import { SongItemWrapper } from "./style";

import propTypes from "prop-types";

// 页面右侧歌曲
function SongItem(props) {
  const {
    currentRanking,
    coverPic,
    singer,
    songId,
    songName,
    className = "",
  } = props;

  const dispatch = useDispatch();
  const { playlist } = useSelector(
    (state) => ({
      playlist: state.getIn(["songPlayer", "playList"]),
    }),
    shallowEqual
  );

  const playMusic = (e, isTo = false) => {
    if (!isTo) e.preventDefault();
    dispatch(getSongDetailAction(songId));
    document.getElementById("audio").autoplay = true;
  };

  // const addPlaylist = useAddPlaylist(playlist, message)

  return (
    <SongItemWrapper
      className={className}
      isPic={coverPic}
      style={{ margin: "20px 0" }}
    >
      {/* 序号 */}
      <div className="song-item rank-count">{currentRanking}</div>
      {/* 歌曲封面 */}
      {coverPic && (
        <NavLink
          to="/discover/song"
          className="song-item"
          onClick={(e) => playMusic(e, true)}
        >
          <img src={parseImageUrl(coverPic, 50)} alt="" />
        </NavLink>
      )}
      <div className="song-item song-info">
        <div className="left-info">
          {/* 图标 */}
          <PlayCircleOutlined
            className="font-active"
            onClick={(e) => playMusic(e)}
          />
          <div className="singer-song">
            {/* 歌曲名称 */}
            <a
              href="/play"
              onClick={(e) => playMusic(e)}
              className="text-nowrap"
            >
              {songName}
            </a>
            <br />
            {/* 歌手 */}
            <NavLink
              to="/discover/song"
              className="song-item singer"
              onClick={(e) => playMusic(e, true)}
            >
              {singer}
            </NavLink>
          </div>
        </div>
        {/* 按钮 */}
        <div className="right-operator">
          <button
            href="/discover/recommend"
            className="sprite_icon2 btn addto"
            // onClick={(e) => addPlaylist(e, songId)}
          ></button>
        </div>
      </div>
    </SongItemWrapper>
  );
}

SongItem.propTypes = {
  currentRanking: propTypes.number.isRequired,
  coverPic: propTypes.string,
  singer: propTypes.string.isRequired,
  songId: propTypes.number.isRequired,
  className: propTypes.string,
  songName: propTypes.string.isRequired,
};

export default memo(SongItem);
