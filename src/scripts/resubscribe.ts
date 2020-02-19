import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.Resubscribe, Constants.Styles.Resubscribe);
export const apply = (): void => setting.listen();
