import React, { memo } from "react";
// import { useAddPlaylist } from '@/hooks/change-music'

import { NavLink } from "react-router-dom";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { getSongDetailAction } from '@/pages/player/store/actionCreator'

// 其他函数
import { message } from "antd";
import { parseImageUrl } from "@/utils/parse-url.js";

// 样式
import { PlayCircleOutlined } from "@ant-design/icons";
import { SongItemWrapper } from "./style";

import propTypes from "prop-types";

function SongItem(props) {
  const {
    currentRanking,
    coverPic,
    duration,
    singer,
    songId,
    songName,
    className = "",
  } = props;

  const dispatch = useDispatch();
  
  const { playlist } = useSelector(
    (state) => ({
      playlist: state.getIn(["player", "playlist"]),
    }),
    shallowEqual
  );

  const playMusic = (e, isTo = false) => {
    if (!isTo) e.preventDefault();
    dispatch(getSongDetailAction(songId));
    document.getElementById("audio").autoplay = true;
  };
  const addPlaylist = useAddPlaylist(playlist, message);

  return (
    <SongItemWrapper className={className} isPic={coverPic}>
      <div className="song-item rank-count">{currentRanking}</div>

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
          <PlayCircleOutlined
            className="font-active"
            onClick={(e) => playMusic(e)}
          />
          <a href="/play" onClick={(e) => playMusic(e)} className="text-nowrap">
            {songName}
          </a>
        </div>

        <div className="right-operator">
          <button
            href="/discover/recommend"
            className="spriite_icon2 btn addto"
            onClick={(e) => addPlaylist(e, songId)}
          >
            加入列表
          </button>
        </div>
      </div>

      <div className="song-item duration">{duration}</div>

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
  className: propTypes.string.isRequired,
};

export default memo(SongItem);
