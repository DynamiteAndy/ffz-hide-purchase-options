import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.Bits, Constants.Styles.Bits);
export const apply = (): void => setting.listen();
