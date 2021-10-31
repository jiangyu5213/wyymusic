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

function SongItem(props) {
  // props/state
  const {
    currentRanking,
    coverPic,
    duration,
    singer,
    songId,
    songName,
    className = "",
  } = props;

  // redux hook
  const dispatch = useDispatch();

    const {playlist} = useSelector(state => ({
    playlist: state.getIn(['songPlayer', 'playList'])
  }), shallowEqual)

  // other function
  const playMusic = (e, isTo = false) => {
    if (!isTo) e.preventDefault();
    dispatch(getSongDetailAction(songId));
    document.getElementById("audio").autoplay = true;
  };

  // const addPlaylist = useAddPlaylist(playlist, message)

  return (
    <SongItemWrapper className={className} isPic={coverPic}>
      {/* 序号 */}
      <div className="song-item rank-count">{currentRanking}</div>
      {/* 歌曲封面 */}
      {coverPic && (
        <NavLink
          to={{ pathname: `/songplayer`, search: `?id=${songId}` }}
          className="song-item"
          onClick={(e) => playMusic(e, true)}
        >
          <img src={parseImageUrl(coverPic, 50)} alt="" />
        </NavLink>
      )}
      <div className="song-item song-info">
        {/* 播放图标和歌曲名 */}
        <div className="left-info">
          <PlayCircleOutlined
            className="font-active"
            onClick={(e) => playMusic(e)}
          />
          <NavLink
          to={{ pathname: `/songplayer`, search: `?id=${songId}` }}
            className="text-nowrap"
            onClick={(e) => playMusic(e, true)}
          >
            {songName}
          </NavLink>
        </div>
        {/* “添加到收藏夹”按钮 */}
        <div className="right-operator">
          <button
            href="/discover/recommend"
            className="sprite_icon2 btn addto"
            // onClick={(e) => addPlaylist(e, songId)}
          ></button>
        </div>
      </div>
      {/* 时长 */}
      <div className="song-item duration">{duration}</div>
      {/* 歌手 */}
      <NavLink
        to="/discover/song"
        className="song-item singer"
        onClick={(e) => playMusic(e, true)}
      >
        {singer}
      </NavLink>
    </SongItemWrapper>
  );
}

SongItem.propTypes = {
  currentRanking: propTypes.number.isRequired,
  coverPic: propTypes.string,
  duration: propTypes.string.isRequired,
  singer: propTypes.string.isRequired,
  songId: propTypes.number.isRequired,
  className: propTypes.string,
  songName: propTypes.string.isRequired,
};

export default memo(SongItem);
