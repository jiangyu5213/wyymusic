import React, { memo, useEffect } from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSearchSongListAction } from "../../store/actionCreator";

import SingleSongItem from "./single-song-item";

import { formatMinuteSecond } from "@/utils/handle-date";

import { SingleSongWrapper } from "./style";

import qs from "query-string";

function SearchSingleSong(props) {
  // props/state
  const { song, type } = qs.parse(props.location.search);

  // redux hook
  const dispatch = useDispatch();
  const { singleSongList } = useSelector(
    (state) => ({
      singleSongList: state.getIn(["search", "singleSongList"]),
    }),
    shallowEqual
  );

  // other hook
  // 根据歌曲名字发送网络请求
  useEffect(() => {
    if (song) dispatch(getSearchSongListAction(song, 20, type));
  }, [dispatch, song, type, props]);

  return (
    <SingleSongWrapper>
      {singleSongList &&
        singleSongList.map((item) => {
          return (
            <SingleSongItem
              key={item.id}
              songId={item.id}
              songName={item.name}
              singer={item.artists[0].name}
              album={item.album.name}
              duration={formatMinuteSecond(item.duration)}
            />
          );
        })}
    </SingleSongWrapper>
  );
}

export default memo(SearchSingleSong);
