import React from "react";
import { renderRoutes } from "react-router-config";
import { Redirect } from "react-router-dom";

// discover
const Discover = React.lazy(() => import('@/pages/discover'))
const Recommend = React.lazy(() =>
  import("@/pages/discover/child-pages/recommend")
);
const Toplist = React.lazy(() =>
  import("@/pages/discover/child-pages/toplist")
);
const Playlist = React.lazy(() =>
  import("@/pages/discover/child-pages/playlist")
);
// friend
const Friend = React.lazy(() => import('@/pages/friend'))
// my-music
const MyMusic = React.lazy(() => import('@/pages/my-music'))
// profile
const Profile = React.lazy(() => import('@/pages/profile'))
// search
const Search = React.lazy(() => import('@/pages/search'))
const SearchSinger = React.lazy(() => import('@/pages/search/child-pages/singer'))
const SearchSingleSong = React.lazy(() => import('@/pages/search/child-pages/single-song'))
// song-player
const SongPlayer = React.lazy(() => import('@/pages/song-player'))

const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      { path: "/discover/recommend", component: Recommend },
      { path: "/discover/toplist", component: Toplist },
      { path: "/discover/playlist", component: Playlist },
    ]
  },
  {
    path: "/friend",
    component: Friend,
  },
  {
    path: "/mymusic",
    component: MyMusic,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: '/search',
    component: Search,
    routes: [
      {
        path: '/search',
        exact: true,
        render: () => <Redirect to="/search/singlesong?song=&type=1" />,
      },
      { path: '/search/singlesong', component: SearchSingleSong }, // 由 /single 改
      { path: '/search/singer', component: SearchSinger },
    ],
  },
  {
    path: '/songplayer', // 由 /songlist 改
    exact: true,
    component: SongPlayer,
  },
];

export default renderRoutes(routes);
