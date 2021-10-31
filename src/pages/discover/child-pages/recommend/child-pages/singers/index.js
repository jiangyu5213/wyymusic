import React, { memo, useEffect } from "react";

// redux
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getSingersAction } from "../../store/actionCreator";

// 其他组件
import RecHeaderline from "@/components/recommend-headline";
import SingerCover from "@/components/covers/singer-cover";

import { SINGERS_COUNT } from "@/common/constants";

import { SingersWrapper } from "./style";

function Singers() {
  // redux hook
  const { singers } = useSelector(
    (state) => ({
      singers: state.getIn(["recommend", "singers"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // other hook
  useEffect(() => {
    dispatch(getSingersAction(SINGERS_COUNT));
  }, [dispatch]);

  return (
    <SingersWrapper>
      <RecHeaderline titleSlot="入驻歌手" rightSlot="查看全部 >" />
      <div className="singer-container">
        {singers &&
          singers.map((item) => {
            return <SingerCover key={item.id} info={item} />;
          })}
      </div>
    </SingersWrapper>
  );
}

export default memo(Singers);
