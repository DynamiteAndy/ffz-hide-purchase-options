import { Constants } from '@hpo-globals';
import { Setting } from '@hpo-models';

export default async (): Promise<void> => {
  const setting = new Setting(
    Constants.Settings.Extensions.LatestFollowers,
    Constants.Styles.Extensions.LatestFollowers,
    true
  );

  setting.listen();
};
