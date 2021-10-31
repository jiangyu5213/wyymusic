import * as actionType from "./actionType";

// 从服务端获取数据
import { getSongDetails, getLyric } from "@/api/api/song";
import { getHotComments } from "@/api/api/comment";

// 工具函数
import { parseLyric } from "@/utils/handle-lyric";
import { addPlaylistId, setCurrentSongIndex } from "@/utils/localStorage";

// 首次加载 Action
export const changeFirstLoad = (isFirstLoad) => ({
  type: actionType.CHANGE_FIRST_LOAD,
  isLoad: isFirstLoad,
});

/* --------------------- 歌曲相关 --------------------- */
// 更改当前播放的歌曲 Action
const changeCurrentSongAction = (currentSong) => ({
  type: actionType.CHANGE_CURRENT_SONG,
  currentSong,
});

// 更改歌曲索引 Action
export const changeSongIndexAction = (index) => {
  // 设置本次存储 Index
  setCurrentSongIndex(index);
  return {
    type: actionType.CHANGE_CURRENT_SONG_INDEX,
    index,
  };
};

// 更改播放顺序 Action
export const changePlaySequenceAction = (sequence) => ({
  type: actionType.CHANGE_PLAY_SEQUENCE,
  sequence,
});

// 切换歌曲 Action（整合前几个 Action）
export const changeCurrentIndexAndSongAction = (tag) => {
  return (dispatch, getState) => {
    const playSequence = getState().getIn(["songPlayer", "playSequence"]); // 决定是顺序播放还是随机播放
    const playList = getState().getIn(["songPlayer", "playList"]); // 获取播放列表
    let currentSongIndex = getState().getIn(["songPlayer", "currentSongIndex"]); // 获取当前歌曲的索引

    // 根据播放顺序类型获取下一首音乐的 Index
    switch (playSequence) {
      // 随机播放
      case 1:
        // 生成一个随机数
        let random = Math.floor(Math.random() * playList.length);
        while (random === currentSongIndex) {
          random = Math.floor(Math.random() * playList.length);
        }
        currentSongIndex = random; // 更改当前播放音乐的下标
        break;
      // 顺序播放
      default:
        currentSongIndex += tag; // 更改当前播放音乐的下标
        // 判断当前音乐的下标是否超出播放列表长度
        if (currentSongIndex >= playList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
    }

    // 根据 Index 获取下一首音乐
    const song = playList[currentSongIndex];
    dispatch(changeCurrentSongAction(song)); // 更改当前播放的音乐
    dispatch(changeSongIndexAction(currentSongIndex)); // 更改当前播放的音乐的 Index
    dispatch(getLyricAction(song.id)); // 请求歌词
  };
};

/* --------------------- 歌词相关 --------------------- */

// 更改歌词 Action
const changeLyricAction = (lyric) => ({
  type: actionType.CHANGE_LYRIC_LIST,
  lyric,
});

// 更改当前歌词 Index 的 Action
export const changeCurrentLyricIndexAction = (index) => ({
  type: actionType.CHANGE_CURRENT_LYRIC_INDEX,
  index,
});

// 获取并更改歌词 network request
export const getLyricAction = (id) => {
  return async (dispatch) => {
    await getLyric(id).then((res) => {
      const lyric = res.lrc && res.lrc.lyric;
      const lyricList = parseLyric(lyric);
      dispatch(changeLyricAction(lyricList));
    });
  };
};

/* --------------------- 播放列表相关 --------------------- */

// 更改播放列表 Action
export const changePlayListAction = (playList) => ({
  type: actionType.CHANGE_PLAY_LIST,
  playList,
});

// 更改歌单数量
const changePlayListCount = (count) => ({
  type: actionType.CHANGE_PLAY_LIST_COUNT,
  count,
});

// 修改播放列表和歌曲数量（整合前两个 Action）
export const changePlaylistAndCount = (playlist) => {
  return (dispatch) => {
    dispatch(changePlayListAction(playlist));
    dispatch(changePlayListCount(playlist.length));
  };
};

/* --------------------- 评论相关 --------------------- */

// 更改当前评论总数 Action
export const changeCurrentCommentTotal = (total) => ({
  type: actionType.CHANGE_CURRENT_TOTAL,
  total,
});

// 更改热门评论 Action
const changeHotComment = (hotComments) => ({
  type: actionType.CHANGE_HOT_COMMENT,
  hotComments,
});

// 获取并更改歌曲热门评论 network request
export const getHotCommentAction = (id) => {
  return (dispatch) => {
    getHotComments(id).then((res) => {
      const hotComments = res && res.hotComments;
      dispatch(changeHotComment(hotComments));
    });
  };
};

/* --------------------- 获取/更改歌曲详情 network request --------------------- */

/* // 获取歌曲详情 network request
export const getAddSongDetailAction = (id) => {
  return (dispatch, getState) => {
    getSongDetails(id).then((res) => {
      addPlaylistId(id); // 将歌曲 ID 添加到本地存储
      const playList = getState().getIn(["songPlayer", "playList"]);
      const songIndex = playList.findIndex((song) => song.id === id); // 先判断是已经存在播放列表,如果不存在,再进行添加
      if (songIndex !== -1) return; // 找到了(后续不再执行)
      const willAddSong = res.songs && res.songs[0]; // 获取要添加播放的歌曲信息
      playList.push(willAddSong); // 添加到播放列表
      dispatch(changePlayListCount(playList.length)); // 更改歌曲数量
      dispatch(changePlayListAction(playList)); // 更改播放列表
    });
  };
}; */

// 获取歌曲详情 network request
export const getSongDetailAction = (idx) => {
  return async (dispatch, getState) => {
    // 1.根据 id 查找 playList 中是否已经有了该歌曲
    const playList = getState().getIn(["songPlayer", "playList"]);
    const songIndex = playList.findIndex((song) => song.id === idx);
    let song = null;

    // 2.判断是否找到歌曲
    // playList 中已有该歌曲
    if (songIndex !== -1) {
      song = playList[songIndex]; // 找到该歌曲
      dispatch(changeCurrentSongAction(song)); // 更改当前播放的歌曲
      dispatch(changeSongIndexAction(songIndex)); // 更改当前歌曲的 Index
      dispatch(getLyricAction(idx)); // 请求歌曲的歌词
    }
    // 没找到歌曲
    else {
      // 请求该歌曲的数据
      await getSongDetails(idx).then((res) => {
        addPlaylistId(idx); // 将歌曲 ID 添加到本地存储
        const song = res.songs && res.songs[0];
        if (!song) return;
        playList.push(song); // 添加到播放列表中
        const songIndex = playList.length - 1; // 设置当前歌曲的 Index
        dispatch(changeCurrentSongAction(song)); // 更改当前播放的歌曲
        dispatch(changeSongIndexAction(songIndex)); // 更改当前歌曲的 Index
        dispatch(getLyricAction(idx)); // 请求歌曲的歌词
        dispatch(changePlayListCount(playList.length)); // 更改歌曲数量
        dispatch(changePlayListAction(playList)); // 更改播放列表
      });
    }
  };
};

// 获取歌曲详情 network request (只有首次加载才会触发该 Action)
/* 
用途：在拿到歌曲列表数组的 listId 后，循环遍历该列表发送网络请求
方法：使用 promise + 标识变量 + 定时器来控制 ajax 请求，只有在本次请求成功后才能进行下一次请求
请求过程：每次开启定时器时，首先判断标识变量是否为 true，若为 true 则改为 false，并发送 ajax 请求，本次请求完成后再将标识变量改为 true 
*/
export const getSongDetailArrayAction = (listId, index) => {
  return (dispatch, getState) => {
    const playList = getState().getIn(["songPlayer", "playList"]);
    let i = 0;
    let timer = null;
    let flag = true;
    timer = setInterval(() => {
      let idx = listId[i];
      new Promise((resolve, reject) => {
        flag &&
          getSongDetails(idx).then((res) => {
            flag = false;
            addPlaylistId(idx); // 将歌曲 ID 添加到本地存储
            const song = res.songs && res.songs[0];
            if (!song) return;
            playList.push(song); // 添加到播放列表中
            const songIndex = index ?? playList.length - 1; // 设置当前歌曲的 Index
            let currentIndexSong = playList[songIndex] || song;
            dispatch(changeCurrentSongAction(currentIndexSong)); // 更改当前播放歌曲
            dispatch(changeSongIndexAction(songIndex)); // 更改当前歌曲的 Index
            dispatch(getLyricAction(idx)); // 请求歌曲的歌词
            dispatch(changePlayListCount(playList.length)); // 更改歌曲数量
            dispatch(changePlayListAction(playList)); // 更改播放列表
            resolve(i);
          });
      }).then(() => {
        flag = true;
      });
      i++;
      if (i >= listId.length) {
        clearInterval(timer);
      }
    });
  };
};

