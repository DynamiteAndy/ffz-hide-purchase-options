import config from "../../config";
import { Constants } from "../../constants";
import { parse } from "../helpers/get-changes-args-util";

export default class Setting {
  private styleClass: string;
  private settingId: string;
  private tampermonkeySetting: boolean;

  constructor(settingId: string, styleClass: string, tampermonkeySetting = false) {
    this.settingId = settingId;
    this.styleClass = styleClass;
    this.tampermonkeySetting = tampermonkeySetting
  }

  public listen(): void {
    if (Constants.InIframe && this.tampermonkeySetting) {
      this.setClass(config.settings.get(this.settingId));
      return;
    }

    if (!Constants.InIframe) {
      (unsafeWindow as any).ffz.addons.settings.getChanges(this.settingId, this.setClass.bind(this));
    }
  }

  private setClass(...args: any[]): void {
    const { value } = parse(args);

    if (this.tampermonkeySetting) {
      config.settings.set(this.settingId, value);
    }

    if (value) {
      document.body.classList.add(this.styleClass);
    } else {
      document.body.classList.remove(this.styleClass);
    }
  }
}