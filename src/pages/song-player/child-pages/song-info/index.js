import React, { memo } from "react";

import { shallowEqual, useSelector } from "react-redux";

import { Collapse } from "antd";

import { parseImageUrl, getMusicUrl } from "@/utils/parse-url";

import { SongInfoWrapper } from "./style";

function SongInfo(props) {
  const { currentSong, lyricList, totalComment } = useSelector(
    (state) => ({
      currentSong: state.getIn(["songPlayer", "currentSong"]),
      lyricList: state.getIn(["songPlayer", "lyricList"]),
      totalComment: state.getIn(["songPlayer", "currentCommentTotal"]),
    }),
    shallowEqual
  );

  const { Panel } = Collapse;
  const pirUrl = currentSong.al && currentSong.al.picUrl;
  const songName = currentSong.name ? currentSong.name : "";
  const singer = currentSong.ar && currentSong.ar[0].name;
  const album = currentSong.al && currentSong.al.name;

  const playMusic = () => {
    document.querySelector("#audio").play();
  };

  return (
    <SongInfoWrapper>
      <div className="album">
        <img src={parseImageUrl(pirUrl, 130)} alt="" />
        <div className="image_cover cover"></div>
      </div>
      <div className="song-detail-wrapper">
        <div className="song-title">
          <i className="sprite_icon2 single-song"></i>
          <h2 className="song-name">{songName}</h2>
          <em className="sprite_icon2 mv"></em>
        </div>
        <div className="singer">
          <span>歌手：</span>
          <a href="/discover/recommend">{singer}</a>
        </div>
        <div className="settle-album">
          <span>所属专辑：</span>
          <a href="/discover/recommend" className="no-link">
            {album}
          </a>
        </div>
        <div className="controls">
          <div
            className="sprite_button play pointer"
            onClick={() => playMusic()}
          >
            <i className="sprite_button inner">
              <em className="sprite_button play-icon"></em>
              播放
            </i>
          </div>
          {/* <div className="sprite_button favorite">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>
              收藏
            </i>
          </div> */}
          {/* <div className="sprite_button share">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>
              分享
            </i>
          </div> */}
          <div
            className="sprite_button download pointer"
            onClick={() => window.open(getMusicUrl(currentSong.id))}
          >
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>
              下载
            </i>
          </div>
          <div className="sprite_button comment">
            <i className="sprite_button inner">
              <em className="sprite_button favorite-icon"></em>({totalComment})
            </i>
          </div>
        </div>
        <Collapse>
          <Panel header={`歌词展示`}>
            {lyricList &&
              lyricList.map((item) => {
                return (
                  <div key={item.totalTime} className="lyric-item">
                    {item.content}
                  </div>
                );
              })}
          </Panel>
        </Collapse>
      </div>
    </SongInfoWrapper>
  );
}

export default memo(SongInfo);
