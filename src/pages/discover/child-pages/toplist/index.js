import React, { memo, useEffect } from 'react'

// redux
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  getToplistHeaderInfoAction,
  getToplistInfoAction,
} from './store/actionCreator'

// 子组件
import ToplistHeader from './child-pages/header'
import ToplistMain from './child-pages/main'
import ToplistLeftSection from './child-pages/left-section'

import qs from 'query-string'

import { ToplistLeft, ToplistRight, ToplistWrapper } from './style'

function Toplist(props) {

  const { toplistInfo, currentToplistId } = useSelector(
    (state) => ({
      toplistInfo: state.getIn(['toplist', 'toplistInfo']),
      currentToplistId: state.getIn(['toplist', 'currentToplistId']),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  useEffect(() => {
    // 榜单item
    dispatch(getToplistInfoAction())
  }, [dispatch])

  // 排行榜头部信息
  useEffect(() => {
    // 派发榜单标题信息 Action
    let { id } = qs.parse(props.location.search)
    id = id ? id : currentToplistId
    dispatch(getToplistHeaderInfoAction(id))
  }, [currentToplistId, dispatch, props])

  return (
    <ToplistWrapper className="wrap-bg2">
      <div className="content w980">
        <ToplistLeft>
          <div className="top-list-container">
            <ToplistLeftSection toplistInfo={toplistInfo} history={props.history} />
          </div>
        </ToplistLeft>

        <ToplistRight>
          <ToplistHeader />
          <ToplistMain />
        </ToplistRight>
      </div>
    </ToplistWrapper>
  )
}

export default memo(Toplist)
