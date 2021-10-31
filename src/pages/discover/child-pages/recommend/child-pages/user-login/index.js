import React, { memo } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { changeIsVisible } from '@/components/login/store/actionCreator'

import { UserLoginWrapper } from './style'

function UserLogin() {
  const { isLogin } = useSelector((state) => ({
    isLogin: state.getIn(['loginState', 'isLogin']),
  }))

  const dispatch = useDispatch()

  const handleLogin = () => {
    if (!isLogin) dispatch(changeIsVisible(true))
  }
  
  return (
    <UserLoginWrapper style={{ display: isLogin ? 'none' : 'block' }}>
      <div className="profile-info sprite_02">
        <p className="login-detail">
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
        </p>
        <button className="user-login sprite_02" onClick={() => handleLogin()}>
          用户登录
        </button>
      </div>
    </UserLoginWrapper>
  )
}

export default memo(UserLogin)
