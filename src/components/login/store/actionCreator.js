import md5 from "js-md5";
import { message } from "antd";

import * as actionTypes from "./actionType";
import loginInfo from "@/config/token";
import { gotoEmailLogin } from "@/api/api/user";
import { getLoginInfo, setLoginInfo } from "@/utils/handle-login";

// 更改登录框显示
export const changeIsVisible = visibleState => ({
  type: actionTypes.CHANGE_IS_VISIBLE_STATE,
  isVisible: visibleState,
});

// 更改登录用户信息
export const changeUserProfile = (profileInfo) => ({
  type: actionTypes.CHANGE_PROFILE_INFO,
  profile: profileInfo,
});

// 更改登录状态
export const changeUserLoginState = (loginState) => ({
  type: actionTypes.CHANGE_USER_LOGIN_STATE,
  isLogin: loginState,
});

// 更改登录状态(token)
export const changeUserLoginToken = (token) => ({
  type: actionTypes.CHANGE_PROFILE_TOKEN,
  token,
});

// 更改登录状态(cookie)
export const changeUserLoginCookie = (cookie) => ({
  type: actionTypes.CHANGE_PROFILE_COOKIE,
  cookie,
});

// 👉 获取登录信息 👈
export const getLoginProfileInfo = (username, password, tip) => {
  return (dispatch) => {
    gotoEmailLogin(username, undefined, md5(password)).then((res) => {
      if (res.code !== 200) {
        message.error("邮箱或密码错误");
      } else {
        tip && message.success("登录成功");
      }
      document.cookie = res.cookie;
      // 保存登录信息
      dispatch(changeUserProfile(res && res.profile));
      // 更改登录状态
      dispatch(changeUserLoginState(true));
      dispatch(changeUserLoginToken(res.token));
      dispatch(changeUserLoginCookie(res.cookie));
      loginInfo.state = true;
      loginInfo.username = username;
      loginInfo.password = password;
      let newLoginInfo = Object.assign(getLoginInfo("loginInfo", loginInfo));
      setLoginInfo("loginInfo", newLoginInfo);
      // 关闭模态框
      dispatch(changeIsVisible(false));
    });
  };
};
