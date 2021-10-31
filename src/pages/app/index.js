import React, { memo, useState, useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { getLoginProfileInfo } from "@/components/login/store/actionCreator";
// import { getSongDetailArrayAction } from "@/pages/player/store/actionCreator";

// 导入其他组件
import { Button } from "antd";
import ThemeDialog from "@/components/theme-dialog/index"; 

// 导入其他模块的函数或参数
import loginInfo from "@/config/token";
import { SONG_PLAYLIST_ID } from "@/common/constants";
import { setLoginInfo, getLoginInfo } from "@/utils/handle-login";
import {
  addPlaylistId,
  getPlaylistId,
  initCurrentSongIndex,
  getCurrentSongIndex,
} from "@/utils/localStorage";


function AppWrapper() {
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  /* 初始化登录信息 */
  const initLogin = () => {
    if (localStorage.getItem("loginInfo") != null) {
      const { username, password } = getLoginInfo("loginInfo");
      username && password
        ? dispatch(getLoginProfileInfo(username, password))
        : console.log("当前登录的默认信息");
    } else {
      setLoginInfo("loginInfo", loginInfo);
    }
  };
  initLogin();

  /* 添加本地存储的默认歌曲 ID */
  useEffect(() => {
    addPlaylistId(SONG_PLAYLIST_ID);
    initCurrentSongIndex();
  }, []);

  /* 从本地存储读取歌曲列表 ID */
  useEffect(() => {
    const index = getCurrentSongIndex();
    // dispatch(getSongDetailArrayAction(getPlaylistId(), index));
  });

  return (
    <>
      {/* <Suspense fallback={<Skeleton active />}>{renderRoutes(routes)}</Suspense> */}
      <ThemeDialog
        title="上传音乐"
        isShow={isShow}
        handleOk={() => setIsShow(false)}
        handleCancel={() => setIsShow(false)}
      >
        <h2>hello dialog</h2>
        <h3>上传音乐</h3>
      </ThemeDialog>
      {/* <Button onClick={() => setIsShow(!isShow)}>点击</Button> */}
    </>
  );
};

export default memo(AppWrapper)
