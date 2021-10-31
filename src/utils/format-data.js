// 根据数组对象的某个字段去重
export const deduplicateArray = (arr, val) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1));
};

// 过滤对象中为空的属性
export function filterObj(obj) {
  if (!(typeof obj == "object")) {
    return;
  }

  for (var key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      (obj[key] == null ||
        obj[key] === undefined ||
        obj[key] === "undefined" ||
        obj[key] === "")
    ) {
      delete obj[key];
    }
  }
  return obj;
}
