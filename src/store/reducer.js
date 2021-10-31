import { combineReducers } from "redux-immutable";
// conponent reducers
import { reducer as appHeaderReducer } from "@/components/app-header/store";
import { reducer as loginReducer } from "@/components/login/store";
// page reducers
import { reducer as recommendReducer } from "@/pages/discover/child-pages/recommend/store";
import { reducer as toplistReducer } from '@/pages/discover/child-pages/toplist/store';
import { reducer as playlistReducer } from '@/pages/discover/child-pages/playlist/store';
import { reducer as searchReducer } from '@/pages/search/store';
import { reducer as songPlayerReducer } from '@/pages/song-player/store';

const allReducers = combineReducers({
  // conponent state
  appHeader: appHeaderReducer,
  loginState: loginReducer,
  // page state
  recommend: recommendReducer,
  toplist: toplistReducer,
  playlist: playlistReducer,
  search: searchReducer,
  songPlayer: songPlayerReducer,
});

export default allReducers;
