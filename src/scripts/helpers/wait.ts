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

export const until = (predFn) => {
  const poll = (done) => (predFn() ? done() : setTimeout(() => poll(done), 500));
  return new Promise(poll);
};