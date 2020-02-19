import { Constants } from "../../constants";
import Setting from "../models/Setting";

const setting = new Setting(Constants.Settings.Extensions.EmotesShowcase, Constants.Styles.Extensions.EmotesShowcase, true);
export const apply = (): void => setting.listen();
