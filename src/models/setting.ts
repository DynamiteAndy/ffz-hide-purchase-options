import { Constants, config } from '@hpo-globals';
import { pubSub } from '@hpo-components';

export class Setting {
  private styleClass: string;
  private settingId: string;
  private tampermonkeySetting: boolean;
  private settingFunction: (value: boolean) => void;
  private applyClass = () => {
    const value = config.get(this.settingId);
    this.setClass(value, !value, false);
  };

  constructor(
    settingId: string,
    styleClass: string,
    tampermonkeySetting = false,
    settingFn: (value: boolean) => void = null
  ) {
    this.settingId = settingId;
    this.styleClass = styleClass;
    this.tampermonkeySetting = tampermonkeySetting;
    this.settingFunction = settingFn;
  }

  public listen(): void {
    pubSub.subscribe('styles:reapply', this.applyClass);

    if (Constants.InIframe && this.tampermonkeySetting) {
      GM_addValueChangeListener(this.settingId, (_key, oldValue, newValue) => this.setClass(newValue, oldValue, false));
    } else if (!Constants.InIframe) {
      unsafeWindow.ffz.addons.settings.getChanges(this.settingId, this.setClass.bind(this));
      unsafeWindow.ffz.on('chat:room-add', this.applyClass);
      unsafeWindow.ffz.on('chat:room-remove', this.applyClass);
    }

    this.applyClass();
  }

  private setClass(newValue: boolean, _oldValue: boolean, updateGMValue = true): void {
    if (this.tampermonkeySetting && updateGMValue) {
      config.set(this.settingId, newValue);
    }

    if (newValue) {
      document.body.classList.add(this.styleClass);
    } else {
      document.body.classList.remove(this.styleClass);
    }

    if (this.settingFunction) {
      this.settingFunction(newValue);
    }
  }
}
