export const waitForElement = (
  selector: string,
  element: Document | HTMLElement | Element = document.documentElement,
  timeoutMS = 10000
): Promise<HTMLElement> =>
  new Promise((resolve) => {
    if (element === null) {
      return null;
    }

    if (element === document.documentElement) {
      element = document.documentElement;
    }

    if (element.querySelector(selector)) {
      return resolve(element.querySelector(selector) as HTMLElement);
    }

    /* eslint-disable prefer-const */
    let observer: MutationObserver;
    /* eslint-enable prefer-const */

    const timeout = setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeoutMS);

    observer = new MutationObserver(() => {
      if (element.querySelector(selector)) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve(element.querySelector(selector) as HTMLElement);
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
    if (element === null) {
      return [];
    }

    if (element === document.documentElement) {
      element = document.documentElement;
    }

    if (element.querySelector(selector)) {
      return resolve([...element.querySelectorAll(selector)] as HTMLElement[]);
    }

    /* eslint-disable prefer-const */
    let observer: MutationObserver;
    /* eslint-enable prefer-const */

    const timeout = setTimeout(() => {
      observer.disconnect();
      resolve([]);
    }, timeoutMS);

    observer = new MutationObserver(() => {
      if (element.querySelector(selector)) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve([...element.querySelectorAll(selector)] as HTMLElement[]);
      }
    });

    observer.observe(element, {
      childList: true,
      subtree: true
    });
  });
