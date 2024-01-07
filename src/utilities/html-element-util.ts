export const waitForElement = (
  selector: string,
  element: Document | HTMLElement | Element = document.documentElement,
  timeoutMS = 10000
): Promise<HTMLElement> =>
  new Promise((resolve) => {
    if (!element) {
      return resolve(null);
    }

    const foundElement = element.querySelector(selector);
    if (foundElement) {
      return resolve(foundElement as HTMLElement);
    }

    // eslint-disable-next-line prefer-const
    let observer: MutationObserver;

    const timeout = setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeoutMS);

    observer = new MutationObserver(() => {
      const foundElement = element.querySelector(selector);
      if (foundElement) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve(foundElement as HTMLElement);
      }
    });

    observer.observe(element, {
      childList: true,
      subtree: true
    });
  });

export const waitForElements = (
  selector: string,
  element: Document | HTMLElement | Element = document.documentElement,
  timeoutMS = 10000
): Promise<HTMLElement[]> =>
  new Promise((resolve) => {
    if (!element) {
      return resolve(null);
    }

    const elements = element.querySelectorAll(selector);
    if (elements.length > 0) {
      return resolve(Array.from(elements) as HTMLElement[]);
    }

    // eslint-disable-next-line prefer-const
    let observer: MutationObserver;

    const timeout = setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeoutMS);

    observer = new MutationObserver(() => {
      const elements = element.querySelectorAll(selector);
      if (elements.length > 0) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve(Array.from(elements) as HTMLElement[]);
      }
    });

    observer.observe(element, {
      childList: true,
      subtree: true
    });
  });
