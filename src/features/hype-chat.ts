import { Constants } from '@hpo-globals';
import { until } from '@hpo-helpers';
import { Setting } from '@hpo-models';

export default async (): Promise<void> => {
  if (!Constants.InIframe) {
    await until(() => unsafeWindow.ffz?.site?.elemental._observer === null);
  }

  const togglePostHypeChatButton = (value: boolean) => {
    const button = document.querySelector('button[aria-label="Post a Hype Chat"]');

    if (value) {
      button?.parentElement?.parentElement?.classList[value ? 'add' : 'remove'](Constants.Styles.Base);
    } else {
      button?.parentElement?.parentElement?.classList.remove(Constants.Styles.Base);
    }
  };

  const setting = new Setting(Constants.Settings.HypeChat, Constants.Styles.HypeChat, false, togglePostHypeChatButton);
  setting.listen();
};
