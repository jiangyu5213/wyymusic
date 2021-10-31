// 解析获取 url 参数
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

// 格式化图片 url
export function parseImageUrl(imgUrl, size) {
  return `${imgUrl}?param=${size}x${size}`;
}

// 获取歌曲 url
export function getMusicUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}