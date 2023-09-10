import { Constants } from '@hpo-globals';
import { until } from '@hpo-helpers';
import { Setting } from '@hpo-models';

export default async (): Promise<void> => {
  if (!Constants.InIframe) {
    await until(() => unsafeWindow.ffz?.site?.elemental._observer === null);
  }

  const toggleCharityButton = (value: boolean) => {
    let currentNode = null;

    for (const element of [
      ...document.querySelectorAll('[data-target="channel-header-right"] [data-a-target="tw-core-button-label-text"]')
    ]) {
      if (element.textContent.trim() === 'Donate to Charity') {
        currentNode = element;
        break;
      }
    }

    const charityButton = currentNode?.closest('button')?.parentElement;
    const charityHeading = document.querySelector(
      '[data-test-selector="chat-room-component-layout"] [aria-label="Charity details"]'
    );

    if (value) {
      charityButton?.classList?.add(Constants.Styles.Base);
      charityHeading?.classList?.add(Constants.Styles.Base);
      charityHeading?.previousElementSibling?.classList?.add(Constants.Styles.Base);
    } else {
      charityButton?.classList?.remove(Constants.Styles.Base);
      charityHeading?.classList?.remove(Constants.Styles.Base);
      charityHeading?.previousElementSibling?.classList?.remove(Constants.Styles.Base);
    }
  };

  const setting = new Setting(Constants.Settings.Charity, Constants.Styles.Charity, false, toggleCharityButton);
  setting.listen();
};
