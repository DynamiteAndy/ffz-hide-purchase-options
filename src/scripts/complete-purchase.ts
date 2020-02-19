import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.CompletePurchase, Constants.Styles.CompletePurchase);
export const apply = (): void => setting.listen();
