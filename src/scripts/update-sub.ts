import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.UpdateSub, Constants.Styles.UpdateSub);
export const apply = (): void => setting.listen();
