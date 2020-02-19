import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.ContinueSub, Constants.Styles.ContinueSub);
export const apply = (): void => setting.listen();
