import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.GiftASub, Constants.Styles.GiftASub);
export const apply = (): void => setting.listen();
