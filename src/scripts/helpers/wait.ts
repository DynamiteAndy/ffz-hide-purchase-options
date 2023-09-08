export const waitForElement = (element: Document | HTMLElement = document, selector: string): Promise<Element> => new Promise(resolve => {
  if (element.querySelector(selector)) {
    return resolve(document.querySelector(selector));
  }

  const observer = new MutationObserver(() => {
    if (element.querySelector(selector)) {
      resolve(element.querySelector(selector));
      observer.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

export const until = async (f: () => boolean, timeoutMs = 10000) => {
  return new Promise((resolve) => {
    const timeWas = new Date();
    const wait = setInterval(() => {
      if (f()) {
        clearInterval(wait);
        resolve(true);
      } else if (+new Date() - +timeWas > timeoutMs) {
        clearInterval(wait);
        resolve(false);
      }
    }, 20);
  });
};

export const wait = async (timeoutMs = 250) => new Promise((resolve) => setTimeout(resolve, timeoutMs));