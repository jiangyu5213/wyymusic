import React, { memo, useEffect, useState } from "react";

import { shallowEqual, useSelector } from "react-redux";

// 子组件
import SongInfo from "./child-pages/song-info";
import SongItem from "./child-pages/song-item";
import SongComment from "./child-pages/song-comment";

// 其他函数
import { getSimilarSongs } from "@/api/api/song";
// import { useGlobalKeyboardEvent } from '../../hooks/change-state'
import { formatMinuteSecond } from "@/utils/handle-date";

import { SongPlayerWrapper, SongLeft, SongRight } from "./style";

// 歌曲详情页面
function SongPlayer(props) {
  const [songlist, setSonglist] = useState([]);

  const { currentSongId } = useSelector(
    (state) => ({
      currentSongId: state.getIn(["songPlayer", "currentSong", "id"]),
    }),
    shallowEqual
  );

  useEffect(() => {
    getSimilarSongs(currentSongId).then((res) => {
      setSonglist(res.songs);
    });
  }, [currentSongId]);

  // useGlobalKeyboardEvent() // 全局注册 ctrl+k 唤醒下拉框

  return (
    <SongPlayerWrapper>
      <div className="content w980">
        <SongLeft>
          <SongInfo />
          <SongComment />
        </SongLeft>
        <SongRight>
          {songlist &&
            songlist.map((item, index) => {
              return (
                <SongItem
                  key={item.id}
                  currentRanking={index + 1}
                  className="song_item"
                  duration={formatMinuteSecond(item.dt)}
                  songName={item.name}
                  singer={item.artists[0].name}
                  songId={item.id}
                />
              );
            })}
        </SongRight>
      </div>
    </SongPlayerWrapper>
  );
}

export default memo(SongPlayer);
