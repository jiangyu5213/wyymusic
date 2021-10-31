// 解析歌词
const parseExp = /\[([0-9]{2}):([0-9]{2})\.([0-9]{2,3})\]/;
export function parseLyric(lyrics) {
  if (!lyrics) return;
  const lineStrings = lyrics.split("\n");
  const lyricList = [];
  for (const line of lineStrings) {
    if (line) {
      const result = parseExp.exec(line);
      if (!result) continue;
      const time1 = result[1] * 60 * 1000;
      const time2 = result[2] * 1000;
      const time3 = result[3].length > 2 ? result[3] * 1 : result[3] * 1000;
      // 当前歌曲播放的总时长(毫秒)
      const totalTime = time1 + time2 + time3;
      const content = line.replace(parseExp, "").trim();
      const lineObj = { totalTime, content };
      lyricList.push(lineObj);
    }
  }
  return lyricList;
}

// 歌词滚动
export function scrollTo(element, to, duration) {
  // 当前播放时间
  if (duration <= 0) return;
  // 目标-当前距离的卷曲的 top
  var difference = to - element.scrollTop;
  var perTick = (difference / duration) * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
