import {
  LOCAL_PLAYLIST_ID_KEY,
  LOCAL_CURRENT_SONG_INDEX_KEY,
} from "@/common/constants";

/* —————————— 对本地存储的音乐列表（数组）进行操作 —————————— */

/* 获取歌曲列表 id */
export function getPlaylistId(key = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
  return songListId;
}

/* 本地存储添加歌曲 id（如果已存在则不再添加） */
export function addPlaylistId(id, key = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = getPlaylistId(key);
  if (id instanceof Array) {
    id.forEach((id) => {
      !songListId.includes(id) && songListId.push(id);
    });
  } else if (typeof id === "number") {
    !songListId.includes(id) && songListId.push(id);
  } else {
    throw Error("id 只能是数组或者数字类型");
  }
  localStorage.setItem(key, JSON.stringify(songListId));
}

/* 移除歌曲 id */
export function removeSongId(id, key = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = getPlaylistId(key);
  if (songListId.length && songListId.includes(id)) {
    songListId.splice(songListId.includes(id), 1);
  }
  localStorage.setItem(key, JSON.stringify(songListId));
}

/* 清除全部歌曲 */
export function removeAllSongs(key = LOCAL_PLAYLIST_ID_KEY) {
  const songListId = getPlaylistId(key);
  if (songListId.length) {
    songListId.length = 0;
  }
  localStorage.setItem(key, JSON.stringify(songListId));
}

/* 重置本次存储歌曲列表 id */
export function resetPlaylistId(idArray) {
  removeAllSongs();
  idArray && idArray.forEach((id) => addPlaylistId(id));
}

/* —————————— 对当前播放的音乐 index（数字） 进行操作 —————————— */

/* 初始化当前播放的音乐索引 */
export function initCurrentSongIndex(
  index = 0,
  key = LOCAL_CURRENT_SONG_INDEX_KEY
) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, index);
  }
}

/* 获取当前播放的音乐索引 index */
export function getCurrentSongIndex(key = LOCAL_CURRENT_SONG_INDEX_KEY) {
    const currentIndex = JSON.parse(localStorage.getItem(key)) || 0;
    return currentIndex;
  }

/* 更新当前播放的音乐索引 index */
export function setCurrentSongIndex(index, key = LOCAL_CURRENT_SONG_INDEX_KEY) {
  localStorage.setItem(key, index);
}
