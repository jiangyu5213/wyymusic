import React, { memo, useState, useEffect } from "react";

import { NavLink, Redirect } from "react-router-dom";
import { renderRoutes } from 'react-router-config'

import { Input } from "antd";


// 其他函数
// import { useChangeDropBoxState } from '@/hooks/change-state'
import { searchLinks } from "@/common/local-data";

import { SearchWrapper } from "./style";

import qs from "query-string";

function AppSearch(props) {
  // props/state
  const { route } = props;
  const [searchSongName, setSearchSongName] = useState(null); // 搜索歌曲名字
  const [activeIndex, setActiveIndex] = useState(null); // 控制导航 item 的 active

  // other handle
  const { Search } = Input;
  const { song } = qs.parse(props.location.search);

  // other hooks
  // 组件渲染更新歌曲名字
  useEffect(() => {
    setSearchSongName(song);
    // eslint-disable-next-line
  }, []);

  // (本次存储索引: NavLink 选中状态的索引)
  useEffect(() => {
    // 判断本地存储是否包含 key: activeIndex
    !localStorage.hasOwnProperty("activeIndex") &&
      localStorage.setItem("activeIndex", 0);
    const activeIndex = JSON.parse(localStorage.getItem("activeIndex"));
    setActiveIndex(activeIndex);
  }, []);

  // 更新 activeIndex 索引时保存本地存储
  useEffect(() => {
    localStorage.setItem("activeIndex", JSON.stringify(activeIndex));
  }, [activeIndex]);

  return (
    <SearchWrapper /* onClick={useChangeDropBoxState()} */>
      <div className="w980 content">
        <div className="search-wrapper">
          <Search
            value={searchSongName}
            style={{ width: 490 }}
            onChange={(e) => setSearchSongName(e.target.value)}
          />
        </div>
        <div className="search-content">
          <div className="search-info">
            搜索"{song}", 找到
            <span className="music-amount"> 20 </span>单曲
          </div>
          <div className="m-tab search-category">
            {searchLinks.map((item, index) => {
              return (
                <NavLink
                  key={item.link}
                  to={{ pathname: item.link + `&song=${song}` }}
                  className={`route-item m-tab ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {activeIndex === index ? (
                    <Redirect to={item.link + `&song=${searchSongName}`} />
                  ) : null}
                  <em>{item.title}</em>
                </NavLink>
              );
            })}
          </div>
          {renderRoutes(route.routes)}
        </div>
      </div>
    </SearchWrapper>
  );
}

export default memo(AppSearch);
