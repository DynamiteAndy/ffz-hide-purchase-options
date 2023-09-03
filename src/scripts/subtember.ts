import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.Subtemeber, Constants.Styles.Subtember);
export const apply = (): void => setting.listen();
