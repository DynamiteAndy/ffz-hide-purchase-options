import { pubSub } from '@hpo-components';
import styles from '@hpo-scss/index.scss';
import { Constants } from '@hpo-globals';

const applyClass = () => document.body.classList.add(Constants.Styles.Root);

const listen = (): void => {
  pubSub.subscribe('styles:reapply', applyClass);

  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation: MutationRecord) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const targetElement = mutation.target as HTMLBodyElement;

        if (!targetElement.classList.contains('ffz-hide-purchase-options')) {
          pubSub.publish('styles:reapply');
        }
      }
    });
  });

  observer.observe(document.body, {
    attributes: true
  });
};

export default (): void => {
  applyClass();
  GM_addStyle(styles);
  listen();
};
