export const getCleanUrl = (url) => {
  return url.replace(/#.*$/, "").replace(/\?.*$/, "");
};
