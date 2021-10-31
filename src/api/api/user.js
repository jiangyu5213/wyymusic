import request from "../request";

// 邮箱登录
export function gotoEmailLogin(email, password, md5_password) {
  return request({
    url: "/login",
    method: "get",
    params: {
      email,
      password,
      md5_password,
    },
  });
}

// 邮箱注册
export function sendRegister(email, password, nickname) {
  return request({
    url: "/register",
    method: "get",
    params: {
      email,
      password,
      nickname,
    },
  });
}

/* // 📱 手机号登录
export function gotoPhoneLogin(phoneNumber, password, md5_password) {
    return request({
      url: "/login/phone",
      method: "get",
      params: {
        phoneNumber,
        password,
        md5_password,
      },
    });
  }

// 发送验证码
export function sendCaptcha(phoneNumber) {
    return request({
        url: 'login/phone/captcha',
        method: 'get',
        params: {
            phoneNumber,
        }
    })
} */

// 获取用户信息（如歌单/收藏）
export const getUserInfo = (cookie) => {
  return request({
    url: "/user/subcount",
    params: {
      cookie,
    },
  });
};

// 获取用户歌单
export const getUserPlaylist = (userId) => {
  return request({
    url: "/user/playlist",
    params: {
      uid: userId,
      timestamp: new Date().getTime(),
    },
  });
};

// 新建歌单
export const createUserPlaylist = (name, cookie) => {
  return request({
    url: "/playlist/create",
    params: {
      name,
      cookie,
    },
  });
};
