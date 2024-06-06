export const extractUrlAfterAdmin = (url: string) => {
  if (!/^\/admin\//.test(url)) {
    throw new Error("'/admin/' not found in the URL");
  }
  return url.substring(7); // 7 to skip over '/admin/'
};
