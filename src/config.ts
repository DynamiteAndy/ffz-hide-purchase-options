export default {
  settings: {
    get: (setting: string): boolean => { return GM_getValue(setting, true); },
    set: (setting: string, value: boolean) => { GM_setValue(setting, value); }
  }
};