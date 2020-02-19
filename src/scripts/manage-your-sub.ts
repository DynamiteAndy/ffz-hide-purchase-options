import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.ManageYourSub, Constants.Styles.ManageYourSub);
export const apply = (): void => setting.listen();
