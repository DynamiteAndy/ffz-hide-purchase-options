import { Constants } from "../constants";
import Setting from "./models/Setting";

const togglePostHypeChatButton = (value: boolean) => {
  const button = document.querySelector('button[aria-label="Post a Hype Chat"]');

  if (value) {
    button?.parentElement?.parentElement?.classList.add(Constants.Styles.Base);
  } else {
    button?.parentElement?.parentElement?.classList.remove(Constants.Styles.Base);
  }
};

const setting = new Setting(Constants.Settings.HypeChat, Constants.Styles.HypeChat, false, togglePostHypeChatButton);
export const apply = (): void => setting.listen();
