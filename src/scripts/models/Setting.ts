import config from "../../config";
import { Constants } from "../../constants";
import { parse } from "../helpers/get-changes-args-util";

export default class Setting {
  private styleClass: string;
  private settingId: string;
  private tampermonkeySetting: boolean;
  private settingFunction: (value: boolean) => void
  private eventListener = () => this.setClass({ value: (unsafeWindow as any).ffz.addons.settings.get(this.settingId) });

  constructor(settingId: string, styleClass: string, tampermonkeySetting = false, settingFn: (value: boolean) => void = null) {
    this.settingId = settingId;
    this.styleClass = styleClass;
    this.tampermonkeySetting = tampermonkeySetting
    this.settingFunction = settingFn;
  }

  public listen(): void {
    if (Constants.InIframe && this.tampermonkeySetting) {
      this.setClass(config.settings.get(this.settingId));
      return;
    }

    if (!Constants.InIframe) {
      (unsafeWindow as any).ffz.addons.settings.getChanges(this.settingId, this.setClass.bind(this));
      (unsafeWindow as any).ffz.on('chat:room-add', this.eventListener);
      (unsafeWindow as any).ffz.on('chat:room-remove', this.eventListener);
    }
  }

  private setClass(...args: unknown[]): void {
    const { value }: { value: boolean } = parse(args);

    if (this.tampermonkeySetting) {
      config.settings.set(this.settingId, value);
    }

    if (value) {
      document.body.classList.add(this.styleClass);
    } else {
      document.body.classList.remove(this.styleClass);
    }

    if (this.settingFunction) {
      this.settingFunction(value)
    }
  }
}