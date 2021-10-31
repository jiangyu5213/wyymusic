import React, { useState, memo } from "react";

// redux
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getSongList } from "../../store/actionCreators";

// 其他组件
import { Skeleton } from "antd";
import SongCover from "@/components/covers/song-cover";
import AppPagination from "@/components/pagination";

import { SONG_LIST_LIMIT } from "@/common/constants";

import { MainWrapper } from "./style";

function PlaylistMain() {
  // hooks
  const [currentPage, setCurrentPage] = useState(1);

  // redux
  const { categorySongs } = useSelector(
    (state) => ({
      categorySongs: state.getIn(["playlist", "categorySongs"]),
    }),
    shallowEqual
  );
  const songList = categorySongs.playlists || [];
  const total = categorySongs.total || 0;
  const dispatch = useDispatch();

  const onPageChange = (page) => {
    window.scroll(0, 0);
    setCurrentPage(page);
    dispatch(getSongList(page));
  }
  
  return (
    <MainWrapper>
      {!songList.length ? (
        <Skeleton active />
      ) : (
        <div className="songs-list">
          {songList.map((item) => {
            return <SongCover info={item} key={item.id}/>;
          })}
        </div>
      )}
      <AppPagination
        current={currentPage}
        total={total}
        pageSize={SONG_LIST_LIMIT}
        onChange={currentPage => onPageChange(currentPage)}
      />
    </MainWrapper>
  );
}

export default memo(PlaylistMain);
