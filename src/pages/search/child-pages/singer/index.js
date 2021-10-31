import React, { memo, useEffect } from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSearchSingerListAction } from "../../store/actionCreator";

import SingerItem from "./singer-item";

import qs from "query-string";

import { SingerWrapper } from "./style";

function SearchSinger(props) {
  // props/state
  const { type, song } = qs.parse(props.location.search);

  // redux hook
  const dispatch = useDispatch();
  const { singerList } = useSelector(
    (state) => ({
      singerList: state.getIn(["search", "singerList"]),
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getSearchSingerListAction(song, 20, type));
  }, [dispatch, song, type]);

  return (
    <SingerWrapper>
      {singerList &&
        singerList.map((item) => {
          return (
            <SingerItem
              key={item.id}
              coverPic={item.picUrl}
              singer={item.name}
            />
          );
        })}
    </SingerWrapper>
  );
}

export default memo(SearchSinger);
