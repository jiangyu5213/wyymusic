/* 顶部导航 */
export const headerLinks = [
  {
    title: "发现音乐",
    link: "/discover",
  },
  {
    title: "我的音乐",
    link: "/mymusic",
  },
  {
    title: "朋友",
    link: "/friend",
  },
  {
    title: "商城",
    link: "https://music.163.com/store/product",
  },
];

/* 搜索分类 */
export const searchLinks = [
  // '单曲', '歌手', '专辑', '歌单'
  {
    title: "单曲",
    link: "/search/singlesong?type=1",
  },
  {
    title: "歌手",
    link: "/search/singer?type=100",
  },
  {
    title: "专辑",
    link: "/search/album?type=11",
  },
  {
    title: "歌单",
    link: "/search/songs?type=14",
  },
];

/* discover 板块的导航 */
export const dicoverLinks = [
  {
    title: "推荐",
    link: "/discover/recommend",
  },
  {
    title: "排行榜",
    link: "/discover/toplist",
  },
  {
    title: "歌单",
    link: "/discover/playlist",
  },
  // {
  //   title: "每日推荐",
  //   link: "/discover/album",
  // },
];

// 歌手分类
export const singerAreaLinks = [
  {
    title: "华语",
    area: 7,
    artists: [
      {
        name: "华语男歌手",
        url: "/discover/artist?id=1001",
        type: 1,
      },
      {
        name: "华语女歌手",
        url: "/discover/artist?id=1002",
        type: 2,
      },
      {
        name: "华语组合/乐队",
        url: "/discover/artist?id=1003",
        type: 3,
      },
    ],
  },
  {
    title: "欧美",
    area: 96,
    artists: [
      {
        name: "欧美男歌手",
        url: "/discover/artist?id=2001",
        type: 1,
      },
      {
        name: "欧美女歌手",
        url: "/discover/artist?id=2002",
        type: 2,
      },
      {
        name: "欧美组合乐队",
        url: "/discover/artist?id=2003",
        type: 3,
      },
    ],
  },
  {
    title: "日本",
    area: 8,
    artists: [
      {
        name: "日本男歌手",
        url: "/discover/artist?id=6001",
        type: 1,
      },
      {
        name: "日本女歌手",
        url: "/discover/artist?id=6002",
        type: 2,
      },
      {
        name: "日本组合/乐队",
        url: "/discover/artist?id=6003",
        type: 3,
      },
    ],
  },
  {
    title: "韩国",
    area: 16,
    artists: [
      {
        name: "韩国男歌手",
        url: "/discover/artist?id=7001",
        type: 1,
      },
      {
        name: "韩国女歌手",
        url: "/discover/artist?id=7002",
        type: 2,
      },
      {
        name: "韩国组合/乐队",
        url: "/discover/artist?id=7003",
        type: 3,
      },
    ],
  },
  {
    title: "其他",
    area: 0,
    artists: [
      {
        name: "其他男歌手",
        url: "/discover/artist?id=4001",
        type: 1,
      },
      {
        name: "其他女歌手",
        url: "/discover/artist?id=4002",
        type: 2,
      },
      {
        name: "其他组合乐队",
        url: "/discover/artist?id=4003",
        type: 3,
      },
    ],
  },
];

/* 底部导航 */
export const footerLinks = [
  {
    title: "服务条款",
    link: "https://st.music.163.com/official-terms/service",
  },
  {
    title: "隐私政策",
    link: "https://st.music.163.com/official-terms/privacy",
  },
  {
    title: "儿童隐私政策",
    link: "https://st.music.163.com/official-terms/children",
  },
  {
    title: "版权投诉指引",
    link: "https://music.163.com/st/staticdeal/complaints.html",
  },
  {
    title: "意见反馈",
    link: "#",
  },
];

/* 底部图标 */
export const footerImageLinks = [
  {
    link: "https://music.163.com/st/userbasic#/auth",
  },
  {
    link: "https://music.163.com/recruit",
  },
  {
    link: "https://music.163.com/web/reward",
  },
  {
    link: "https://music.163.com/uservideo#/plan",
  },
];
