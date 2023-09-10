import { Constants } from '@hpo-globals';
import { Setting } from '@hpo-models';

export default async (): Promise<void> => {
  const setting = new Setting(Constants.Settings.Extensions.MyEmotes, Constants.Styles.Extensions.MyEmotes, true);

  setting.listen();
};
