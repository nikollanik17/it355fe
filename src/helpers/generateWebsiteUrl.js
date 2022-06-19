export const generateWebsiteUrl = (url) => {
  if (!url) return "#";
  if (url.includes("http://") || url.includes("https://")) {
    return url;
  } else {
    return "http://" + url;
  }
};
