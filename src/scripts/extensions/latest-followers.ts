import { Constants } from "../../constants";
import Setting from "../models/Setting";

const setting = new Setting(Constants.Settings.Extensions.LatestFollowers, Constants.Styles.Extensions.LatestFollowers, true);
export const apply = (): void => setting.listen();
