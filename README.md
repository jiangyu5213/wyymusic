# 基于React的仿网易云音乐web开发实战

## 项目介绍

### 技术栈

- react
- react-router
- redux+react-redux
- axios
- ant design
- immutable+redux-immutable
- styled-components



### 页面功能展示

#### 首页组件展示

<img src="https://media.giphy.com/media/sFvcGBfwJnhysy54Xw/giphy.gif" alt="show"/>

#### 歌曲搜索

<img src="https://media.giphy.com/media/Yoo3kcPmq6lRWeYiB3/giphy.gif" alt="show"/>

#### 歌曲详情页

<img src="https://media.giphy.com/media/rBnCzmF7GhEQJkaVXz/giphy.gif" alt="show"/>

#### 排行榜

<img src="https://media.giphy.com/media/LUfEdkRbMCU9bDe31Q/giphy.gif" alt="show"/>



## 项目结构

- 🀄️ api    网络配置和请求

  - config.js	本地测试API和访问失效时间
  - request.js	使用 axios 请求本地测试API的数据并返回响应信息
  - api
    - login.js	注册和登录登录相关的**后端路由**	导入 <u>request.js</u>，通过与其中的 `BASE_URL` 拼接得到完整的 url
    - ...

- 🀄️ assets    

  - css    全局css
  - img    图片

- 🀄️ common

  - constants    全局常量参数
  - local-data.js	保存固定的URL信息

- components	公共组件

  - app-footer	底部

  - app-header	头部

    导入<u>Login</u>

  - app-header-navbar	头部导航条

  - comment-headline	评论头部分割线

  - comment-input	发布评论的表单

  - covers

    - album-cover	专辑封面
    - anchor-cover    热门主播封面
    - comment-cover	评论区用户头像封面
    - singer-cover	歌手封面
    - song-cover	歌曲封面

  - login	登录模态框

    导入组件 <u>theme-login-form</u>

    导入自身 action ---- <u>changeIsVisible</u>

  - login-form	登录表单

    导入其他模块的函数 <u>service/login.js 👉 sendRegister & utils/format-utils.js</u> 

    导入 <u>theme-login</u> 的 action ---- <u>getLoginProfileInfo</u>

  - pagination	分页

  - playlist	歌曲列表

  - playlist-songitem	播放列表歌曲

  - recommend-headline	“推荐”板块的分割线

  - recommend-navbar	“推荐”板块的导航条

  - theme-dialog	

- config

  - token.js	密钥和空登录用户信息

- hooks    自定义的 hooks

- pages    路由映射组件（页面级组件）

  - 404    找不到页面（😄简单）
  - app    
  - discover    “发现音乐” 板块（😡复杂）
    - recommend    “推荐” 板块
    - toplist    “排行榜”板块
    - ...
  - friend [未登录]（😄简单）
  - my-music [未登录]（😄简单）
  - profile（😄简单）
  - search（🤖中等）
  - song-player    音乐播放页（🤖中等）
    - song-comment    评论区
    - song-info    歌曲信息
    - song-item    

- 🀄️ router    **前端路由**，使用集中式路径映射表工具 `react-router-config` 管理路由，形成 `path` 与组件之间的映射关系，并通过 `lazy()` 对组件进行懒加载和渲染。

- 🀄️ store	导入项目中所有的 reducers，汇总形成全局 state 属性

- 🀄️ utils	工具函数

  - format-data.js	防抖函数；获取登录模式；正则匹配邮箱和手机号
  - handle-login	加密信息；获取加密信息；清除登录状态（localStorage）	导入 <u>token.js</u>
  - ...



## 项目文件介绍

### 根目录文件

`App.js`	组件容器

```jsx
import React, { memo, Suspense } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Skeleton } from "antd";

import store from "./store";
import routes from "@/router";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import AppWrapper from "@/pages/app";

function App() {

  return (
    <Provider store={store}> // 用于 redux 状态管理
      <HashRouter> // 路由管理
        <AppHeader /> // 页面头部
        <AppWrapper />
        // 用于路由映射 pages 中的组件
        // 其中 Skeleton 用于页面加载等待时显示骨架屏
        <Suspense fallback={<Skeleton active />}>
          {routes}
        </Suspense>
        <AppFooter /> // 页面底部
      </HashRouter>
    </Provider>
  );
}

export default memo(App);
```



`craco.config.js`	利用 webpack 自定义用于匹配路径的字符串

```js
const path = require("path");
const addPath = dir => path.join(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": addPath("src"),
    },
  },
};

```



### store 目录文件

`reducer.js`	



`index.js`	

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";

import allReducers from './reducer'

export default createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunk))
)
```





## 组件代码编写顺序

### 导入

- hooks
- router
- redux
- 其他组件
- 其他函数或参数
- 自身样式



### 组件代码

- 组件内部 state
- 用于获取 state 的 hooks 代码（如 useSelector(); shallowEqual）以及设置ref 的 hooks 代码（useRef()）
- 与redux相关的hooks代码
- 其他hooks代码
- 其他业务代码
- 返回JSX代码





## 从网易云音乐接口获取数据的流程

- 调用后端路由以请求数据
- 并 `dispatch` 给 `action`
- 最后在 `reducer` 中将获取到的响应数据赋给 `state` 属性

调用后端路由以请求数据：

```js
// service/recommend
import request from './request'

export function getTopBanners() {
    return request({
        url: "/banner"
    })
}
```

`dispatch` 给 `action`：

```js
// 组件的 actionCreator
import * as actionTypes from "./actionType";

import { getTopBanners } from "@/service/recommend";

export const changeTopBannersAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});

export const getTopBannersAction = () => {
  return (dispatch) => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannersAction(res));
    });
  };
};
```

在 `reducer` 中将获取到的响应数据赋给 `state` 属性：

```js
// 组件的 reducer
import { Map } from "immutable";
import * as actionTypes from "./actionType";

const defaultState = Map({
  topBanners: [],
  // ...
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return state.set("topBanners", action.topBanners);
    // ...
    default:
      return state;
  }
}

export default reducer;
```





## 路由设计

使用集中式路径映射表工具 `react-router-config` 管理路由，形成 `path` 与组件之间的映射关系，并通过 `lazy()` 对组件进行懒加载和渲染。对于有分级路由的组件，在其内部也需要使用 `renderRoutes` 对 `route` 进行包裹。

如对于`path`为`"/search"`的路由：

```jsx
{
    path: '/search',
    component: Search,
    routes: [
      {
        path: '/search',
        exact: true,
        render: () => <Redirect to="/search/single?song=&type=1" />,
      },
      { path: '/search/single', component: SearchSingleSong },
      { path: '/search/singer', component: SearchSinger },
    ],
  },
```

在 `Search` 组件内部需要做的设计如下：

```jsx
import { NavLink, Redirect } from "react-router-dom";
import { renderRoutes } from 'react-router-config'

function Search(props) {
  // props/state
  const { route } = props;
  // ...
  {renderRoutes(route.routes)}
}

export default memo(Search);
```



### 标签选择

- `a`	
- `Link`	
- `Navlink`	





## 问题的发现和解决

问题：在组件 `style.js` 中获取 `assets` 中的图片但图片不显示

解决方法：在`url()`后面加上`.default`

```jsx
const { default: styled } = require("styled-components");

export const BannerRight = styled.a.attrs({
  href: "https://d1.music.126.net/dmusic/cloudmusicsetup2.8.0.198822.exe",
  target: "_blank",
})`
  width: 250px;
  background: url(${require("@/assets/img/download.png").default});
`;
```



问题：没能拿到接口数据

解决方法：响应属性没写对，如`res.artists`为歌手数据（可打印`res`查看一下数据）



问题：`a`标签的`href`属性设置有误

解决方法：需加上前缀`/#`，如下：

```jsx
<a href={`/#/user/home?id=${info.id}`} className="artist-name">
  {info.nickName}
</a>
```



问题：导航条高亮显示错误

解决方法：检查发现导航条上不同`item`的`link`指向相同，导致样式也相同，这可能是`NavLink`的特性。





## 可改进的地方

在 `actionCreator.js` 中可以根据 `action` 的功能、是否需要导出、是否用于请求网络数据等进行划分

`components/covers`中的封面组件能否减少种类

歌单页面的分页栏显示错误
