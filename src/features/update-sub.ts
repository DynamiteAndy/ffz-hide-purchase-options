import { Constants } from '@hpo-globals';
import { Setting } from '@hpo-models';

export default (): void => {
  const setting = new Setting(Constants.Settings.UpdateSub, Constants.Styles.UpdateSub);
  setting.listen();
};
