import { Constants } from '@hpo-globals';
import { Setting } from '@hpo-models';
import { waitForElements } from '@hpo-utilities';

export default async (): Promise<void> => {
  const toggleGiftASubButton = async (value: boolean) => {
    let currentNode = null;
    const elements = await waitForElements('.support-panel [data-a-target="tw-core-button-label-text"]');

    for (const element of elements) {
      if (element.textContent.trim() === 'Gift a Sub') {
        currentNode = element;
        break;
      }
    }

    const giftASubButton = currentNode?.closest('button');

    if (value) {
      giftASubButton?.classList?.add(Constants.Styles.Base);
    } else {
      giftASubButton?.classList?.remove(Constants.Styles.Base);
    }
  };

  const setting = new Setting(Constants.Settings.GiftASub, Constants.Styles.GiftASub, false, toggleGiftASubButton);
  setting.listen();
};
