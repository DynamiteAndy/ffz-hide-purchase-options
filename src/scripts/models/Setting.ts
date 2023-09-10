import config from "../../config";
import { Constants } from "../../constants";

export default class Setting {
  private styleClass: string;
  private settingId: string;
  private tampermonkeySetting: boolean;
  private settingFunction: (value: boolean) => void
  private eventListener = () => {
    const value = config.settings.get(this.settingId);
    this.setClass(value, !value, false)
  };

  constructor(settingId: string, styleClass: string, tampermonkeySetting = false, settingFn: (value: boolean) => void = null) {
    this.settingId = settingId;
    this.styleClass = styleClass;
    this.tampermonkeySetting = tampermonkeySetting
    this.settingFunction = settingFn;
  }

  public listen(): void {
    if (Constants.InIframe && this.tampermonkeySetting) {
      const value = config.settings.get(this.settingId);
      this.setClass(value, !value);
      GM_addValueChangeListener(this.settingId, (_key, oldValue, newValue) => this.setClass(newValue, oldValue, false));
      return;
    }

    if (!Constants.InIframe) {
      (unsafeWindow as any).ffz.addons.settings.getChanges(this.settingId, this.setClass.bind(this));
      (unsafeWindow as any).ffz.on('chat:room-add', this.eventListener);
      (unsafeWindow as any).ffz.on('chat:room-remove', this.eventListener);
    }
  }

  private setClass(newValue: boolean, _oldValue: boolean, updateGMValue = true): void {
    if (this.tampermonkeySetting && updateGMValue) {
      config.settings.set(this.settingId, newValue);
    }

    if (newValue) {
      document.body.classList.add(this.styleClass);
    } else {
      document.body.classList.remove(this.styleClass);
    }

    if (this.settingFunction) {
      this.settingFunction(newValue)
    }
  }
}