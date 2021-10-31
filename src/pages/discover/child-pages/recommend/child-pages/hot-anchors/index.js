import React, { memo, useEffect } from 'react'

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAnchorsAction } from "../../store/actionCreator";

import RecHeaderline from "@/components/recommend-headline";
import AnchorCover from "@/components/covers/anchor-cover";

import { SINGERS_COUNT } from "@/common/constants";

import { HotAnchorsWrapper } from './style'

function HotAnchors() {

  const { anchors } = useSelector(
    (state) => ({
      anchors: state.getIn(["recommend", "anchors"]),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAnchorsAction(SINGERS_COUNT))
  }, [dispatch])

  return (
    <HotAnchorsWrapper>
      <RecHeaderline titleSlot="热门主播" />
      <div className="artist-container">
        {anchors && anchors.map(item => {
          return <AnchorCover key={item.avatarUrl} info={item} />
        })}
      </div>
    </HotAnchorsWrapper>
  )
}

export default memo(HotAnchors)
