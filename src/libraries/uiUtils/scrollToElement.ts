export const scrollToElement = (
  element: HTMLElement | null,
  offSet = 200,
  behavior: ScrollBehavior = "smooth"
): void => {
  window.scrollTo({
    top: element ? element.offsetTop - offSet : 0,
    behavior,
  });
};
