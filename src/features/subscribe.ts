import { Constants } from '@hpo-globals';
import { Setting } from '@hpo-models';

export default (): void => {
  const setting = new Setting(Constants.Settings.Subscribe, Constants.Styles.Subscribe);
  setting.listen();
};
