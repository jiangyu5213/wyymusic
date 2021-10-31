import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import { NavLink, Redirect } from "react-router-dom";

// 导入其他组件
import { Dropdown, Input, Menu } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import Login from "@/components/login";

// redux 相关
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getSearchSongListAction,
  changeFocusStateAction,
} from "./store/actionCreator";
import { changeIsVisible } from "@/components/login/store/actionCreator";
import { getSongDetailAction } from '@/pages/song-player/store/actionCreator'

// 导入其他模块的函数
import { headerLinks } from "@/common/local-data";
import { refreshDebounce } from "@/utils/optimize-func";
import { clearLoginState } from "@/utils/handle-login";

// 导入自身样式
import { HeaderWrapper, HeaderLeft, HeaderRight } from "./style";

function AppHeader() {
  const [isRedirect, setIsRedirect] = useState(false); // 是否重定向
  const [value, setValue] = useState(""); // 搜索框 Input 组件的 value 值
  const [recordActive, setRecordActive] = useState(-1);

  const inputRef = useRef();

  // redux hooks
  const dispatch = useDispatch();
  const { searchSongList, focusState, isLogin, profile } = useSelector(
    (state) => ({
      searchSongList: state.getIn(["appHeader", "searchSongList"]),
      focusState: state.getIn(["appHeader", "focusState"]),
      isLogin: state.getIn(["loginState", "isLogin"]),
      profile: state.getIn(["loginState", "profile"]),
    }),
    shallowEqual
  );

  // 根据当前焦点状态设置 input 焦点
  useEffect(() => {
    if (focusState) inputRef.current.focus();
    else inputRef.current.blur();
  }, [focusState]);

  // 在搜索框输入内容时显示下拉框并发送网络请求
  const changeInput = refreshDebounce((target) => {
    let value = target.value.trim();
    if (value.length < 1) return;
    dispatch(changeFocusStateAction(true)); // 显示下拉框
    dispatch(getSearchSongListAction(value)); // 发送网络请求
  }, 400);

  // 改变当前 item 歌曲项
    const changeCurrentSong = (id, item) => {
    setValue(item.name + "-" + item.artists[0].name);
    dispatch(getSongDetailAction(id));
    dispatch(changeFocusStateAction(false)); // 隐藏下拉框
    // document.getElementById("audio").autoplay = true; // 播放音乐
  };

  // 在搜索框获取焦点时
  const handleFocus = useCallback(() => {
    inputRef.current.select(); // 当文本获取焦点时，设置文本为被选中状态
    dispatch(changeFocusStateAction(true)); // 更改为获取焦点状态
    setIsRedirect(false); // 修改重定向状态
  }, [dispatch]);

  // 在搜索框失去焦点时
  const handleBlur = useCallback(() => {
    inputRef.current.blur(); // 当文本失去焦点时，设置文本为未选中状态
    dispatch(changeFocusStateAction(false)); // 更改为失去焦点状态
    setIsRedirect(false); // 修改重定向状态
  }, [dispatch])

  // 在搜索框按下回车后的响应
  const handleEnter = useCallback(
    (e) => {
      // 表示当前光标有“高亮当前行”
      if (recordActive >= 0) {
        setValue(
          searchSongList[recordActive].name +
            "-" +
            searchSongList[recordActive].artists[0].name
        );
      }
      dispatch(changeFocusStateAction(false));
      setIsRedirect(true);
    },
    [dispatch, recordActive, searchSongList]
  );

  // 监控用户是否按上/下键，用于选择歌曲
  const watchKeyboard = useCallback(
    (e) => {
      let activeNumber = recordActive;
      if (e.keyCode === 38) {
        activeNumber--;
        activeNumber =
          activeNumber < 0 ? searchSongList.length - 1 : activeNumber;
        setRecordActive(activeNumber);
      } else if (e.keyCode === 40) {
        activeNumber++;
        activeNumber = activeNumber >= searchSongList.length ? 0 : activeNumber;
        setRecordActive(activeNumber);
      }
    },
    [recordActive, setRecordActive, searchSongList]
  );

  const showSelectedItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink
          key={item.title}
          to={item.link}
          className="header-item"
          activeClassName="link-active"
        >
          <em>{item.title}</em>
          <i className="icon"></i>
        </NavLink>
      );
    } else {
      return (
        <a href={item.link} key={item.title} className="header-item">
          {item.title}
        </a>
      );
    }
  };

  // icons 键盘图标
  const icons = (
    <div className="icons-wrapper">
      <div className="ctrl-wrapper">ctrl</div>
      <div className="k-wrapper">k</div>
    </div>
  );

  // 用户下拉 JSX
  const profileDownMenu = () => {
    return isLogin ? (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            href="#/"
            rel="noopener noreferrer"
            onCLick={(e) => e.preventDefault()}
          >
            {profile.nickname}
          </a>
        </Menu.Item>

        <Menu.Item>
          <a href="#/user" rel="noopener noreferrer">
            我的主页
          </a>
        </Menu.Item>

        <Menu.Item danger onCLick={() => clearLoginState()}>
          退出登录
        </Menu.Item>
      </Menu>
    ) : (
      ""
    );
  };

  const showProfileContent = () => {
    return <img src={profile.avatarUrl} alt="" className="profile-img" />;
  };

  // console.log("recordActive",recordActive, "searchSongList", searchSongList)

  // 返回的 JSX
  return (
    // 头部
    <HeaderWrapper>
      <div className="content w1100">
        <HeaderLeft>
          <h1>
            <a href="/" className="logo sprite_01">
              网易云音乐
            </a>
          </h1>

          <div className="header-group">
            {headerLinks.map((item, index) => {
              return showSelectedItem(item, index);
            })}
          </div>
        </HeaderLeft>

        <HeaderRight>
          <div className="search-wrapper">
            <Input
              ref={inputRef}
              className="search"
              placeholder="音乐/歌手"
              size="large"
              prefix={<SearchOutlined />}
              suffix={icons}
              value={value}
              onChange={(e) => setIsRedirect(false) || setValue(e.target.value)}
              onInput={({ target }) => changeInput(target)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onPressEnter={(e) => handleEnter(e)}
              onKeyDown={(e) => watchKeyboard(e)}
            />

            {/* 跳转到搜索页（默认“单曲”） */}
            {isRedirect && (
              <Redirect
                to={{
                  pathname: "/search/singlesong",
                  search: `?song=${value}&type=1`,
                }}
              />
            )}

            <div
              className="down-slider"
              style={{ display: focusState ? "block" : "none" }}
            >
              <div className="search-header">
                <span className="discover">搜"歌曲"相关用户&gt;</span>
              </div>

              <div className="content">
                <div className="content-left">
                  <span className="song">单曲</span>
                </div>

                <div className="content-right">
                  <span className="main">
                    {searchSongList &&
                      searchSongList.map((item, index) => {
                        return (
                          <div
                            className={
                              "item" + (recordActive === index ? "active" : "")
                            }
                            key={item.id}
                            onClick={() => changeCurrentSong(item.id, item)}
                          >
                            <span>
                              {item.name} - {item.artists[0].name}
                            </span>
                          </div>
                        );
                      })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="center">创作者中心</div>

          <Dropdown overlay={profileDownMenu}>
            <div
              className="login"
              onClick={() => !isLogin && dispatch(changeIsVisible(true))}
            >
              <a
                href="/"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {isLogin ? showProfileContent() : "登录"} <DownOutlined />
              </a>
            </div>
          </Dropdown>
        </HeaderRight>
      </div>

      <div className="red-line"></div>

      <Login />
    </HeaderWrapper>
  );
}

export default memo(AppHeader);
