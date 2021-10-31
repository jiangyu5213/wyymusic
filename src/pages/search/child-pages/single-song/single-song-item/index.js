import React, { memo } from "react";

import { NavLink } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSongDetailAction } from "@/pages/song-player/store/actionCreator";

// import { useAddPlaylist } from '@/hooks/change-music'

import { PlayCircleOutlined } from "@ant-design/icons";
import { message } from "antd";

import { SingleSongItemWrapper } from "./style";

import propTypes from "prop-types";

function SingleSongItem(props) {
  // props/state
  const { songId, songName, singer, album, duration } = props;

  // redux hook
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => ({
    playlist: state.getIn(["player", "playList"]),
  }));

  // 播放音乐
  const playMusic = () => {
    dispatch(getSongDetailAction(songId));
    // document.getElementById("audio").autoplay = true;
  };

  // const addPlaylist = useAddPlaylist(playlist, message)

  return (
    <SingleSongItemWrapper>
      <div className="song-name">
        {/* 播放按钮图标 */}
        <PlayCircleOutlined onClick={() => playMusic()} />
        {/* 歌曲名称 */}
        {/* <em onClick={() => playMusic()}>{songName}</em> */}
        <NavLink
          to={{ pathname: `/songplayer`, search: `?id=${songId}` }}
          className="songName"
          onClick={() => playMusic()}
        >
          {songName}
        </NavLink>
        {/* 收藏按钮图标 */}
        <button
          href="/discover/recommend"
          className="sprite_icon2 btn addto"
          // onClick={(e) => addPlaylist(e, songId)}
        ></button>
      </div>
      {/* 歌手 */}
      <NavLink
        to="/discover/song"
        className="singer"
        onClick={() => playMusic()}
      >
        {singer}
      </NavLink>
      {/* 专辑 */}
      <div className="text-nowrap album">《{album}》</div>
      {/* 时长 */}
      <div className="text-nowrap duration">{duration}</div>
    </SingleSongItemWrapper>
  );
}

SingleSongItem.propTypes = {
  songId: propTypes.number.isRequired,
  songName: propTypes.string.isRequired,
  singer: propTypes.string.isRequired,
  album: propTypes.string.isRequired,
  duration: propTypes.string.isRequired,
};

export default memo(SingleSongItem);
