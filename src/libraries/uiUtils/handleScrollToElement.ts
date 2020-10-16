
export const scrollToDiv = (element: HTMLDivElement | null, offSet: number = 200, behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({
    top: (element) ? element.offsetTop - offSet : 0,
    behavior: behavior,
  });
}