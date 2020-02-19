import { Constants } from "../constants";
import Setting from "./models/Setting";

const setting = new Setting(Constants.Settings.Subscribe, Constants.Styles.Subscribe);
export const apply = (): void => setting.listen();
