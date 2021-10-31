import CryptoJS from "crypto-js";
import { message } from "antd";

// 取出密钥
import { secretKey } from "../config/token";

/* 加密信息 */
export function setLoginInfo(key, info) {
  if (key.length && JSON.stringify(info) !== "{}") {
    // 参数分别为：要存储的值；加密的秘钥 secretKey
    let cipherText = CryptoJS.AES.encrypt(
      JSON.stringify(info),
      secretKey
    ).toString();
    // 本地存储
    localStorage.setItem(key, cipherText);
    return true;
  } else {
    message.error("网络异常, 请稍后重试");
    return false;
  }
}

/* 取出加密后的信息 */
export function getLoginInfo(key) {
  if (key.length) {
    // 取出加密后的 value
    let tk = localStorage.getItem(key);
    let bytes = CryptoJS.AES.decrypt(tk, secretKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8); //解密操作
    return JSON.parse(originalText);
  }
}

/* 清除登录状态 */
export function clearLoginState() {
  localStorage.clear();
  window.location.reload();
}

/* 登录模式 */
// export function getParseLoginState(loginState) {
//   let loginMode = "";
//   switch (loginState) {
//     case "email":
//       loginMode = "邮箱";
//       break;
//     case "phoneNumber":
//       loginMode = "手机号";
//       break;
//     default:
//       loginMode = "邮箱";
//       break;
//   }
//   return loginMode;
// }

/* 正则匹配 */
// export function getMatchReg(loginState) {
//   switch (loginState) {
//     case "email":
//       return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     case "phoneNumber":
//       return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
//     default:
//       return "";
//   }
// }
