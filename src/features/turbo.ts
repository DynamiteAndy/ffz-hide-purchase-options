import { Constants } from '@hpo-globals';
import { Setting } from '@hpo-models';
import { waitForElement } from '@hpo-utilities';

export default async (): Promise<void> => {
  if (!Constants.InIframe) {
    await waitForElement('nav .ffz-top-nav');
  }

  const toggleTurboButton = (value: boolean) => {
    let currentNode = null;

    for (const element of [
      ...document.querySelectorAll('[data-a-target="top-nav-container"] [data-a-target="tw-core-button-label-text"]')
    ]) {
      if (element.textContent.trim() === 'Get Ad-Free') {
        currentNode = element;
        break;
      }
    }

    while (currentNode) {
      if (currentNode.nextElementSibling?.classList?.contains('ffz-top-nav')) {
        if (value) {
          currentNode.classList?.add(Constants.Styles.Base);
        } else {
          currentNode.classList?.remove(Constants.Styles.Base);
        }
        break;
      }

      currentNode = currentNode.parentElement;
    }
  };

  const setting = new Setting(Constants.Settings.Turbo, Constants.Styles.Turbo, false, toggleTurboButton);
  setting.listen();
};
