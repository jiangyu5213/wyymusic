import React, { memo, useEffect } from 'react'

// redux
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopListAction } from '../../store/actionCreator'

// 其他组件
import RecommedNavbar from '@/components/recommend-navbar'
// import TopList from '@/components/top-ranking'

import { RankingWrapper } from './style'

function RankingList(props) {
  const { upRanking = [], originRanking = [], newRanking = [] } = useSelector(state => ({
    upRanking: state.getIn(['recommend', 'upRanking']),
    originRanking: state.getIn(['recommend', 'originRanking']),
    newRanking: state.getIn(['recommend', 'newRanking'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(getTopListAction(19723756))
    dispatch(getTopListAction(3779629))
    dispatch(getTopListAction(2884035))
  }, [dispatch])

  return (
    <RankingWrapper>
      <RecommedNavbar title="榜单" />
{/*       <div className="ranking-info">
        <TopList info={originRanking} index={2} {...props} />
        <TopList info={upRanking} index={0}  {...props}/>
        <TopList info={newRanking} index={1} {...props}/>
      </div> */}
    </RankingWrapper>
  )
}

export default memo(RankingList)
