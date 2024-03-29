import { Constants } from '@hpo-globals';

const menuPath = 'Add-Ons > Hide Purchase Options';
const defaultPath = `${menuPath} >> Purchase Options`;
const extensionsPath = `${menuPath} >> Extensions`;

const addAddonUIOption = (): void => {
  unsafeWindow.ffz.addons.settings.addUI('add_ons.hide_purchase_options', {
    path: defaultPath,
    component: 'container'
  });
};

const addOptions = (): void => {
  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Bits, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Get Bits"',
      description: 'Hides the "Get Bits" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.ContinueSub, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Continue Sub"',
      description: 'Hides the "Continue Sub" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.CompletePurchase, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Complete Purchase"',
      description: 'Hides the "Complete Purchase" button',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Charity, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Donate To Charity"',
      description: 'Hides the "Donate To Charity" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.GiftASub, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Gift a Sub"',
      description: 'Hides the "Gift a Sub" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.HypeChat, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Hype Chat"',
      description: 'Hides the "Hype Chat" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.ManageYourSub, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Manage Your Sub"',
      description: 'Hides the "Manage Your Sub" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Resubscribe, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Resubscribe"',
      description: 'Hides the "Resubscribe" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Subscribe, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Subscribe"',
      description: 'Hides the "Subscribe" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Subtember, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Subtember"',
      description: 'Hides the "Subtember" advert',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Turbo, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Turbo"',
      description: 'Hides the "Turbo" payment option',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.UpdateSub, {
    default: true,
    ui: {
      path: defaultPath,
      title: 'Hide "Update Sub"',
      description: 'Hides the "Update Subscription" payment option',
      component: 'setting-check-box'
    }
  });
};

const addExtensions = (): void => {
  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Extensions.EmotesShowcase, {
    default: true,
    ui: {
      path: extensionsPath,
      title: 'Hide "Emotes Showcase"',
      description: 'Hides payment options on the Emotes Showcase extension',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Extensions.FeaturedViewer, {
    default: true,
    ui: {
      path: extensionsPath,
      title: 'Hide "Featured Viewer"',
      description: 'Hides payment options on the Featured Viewer extension',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Extensions.LatestFollowers, {
    default: true,
    ui: {
      path: extensionsPath,
      title: 'Hide "Latest Followers"',
      description: 'Hides payment options on the Latest Followers extension',
      component: 'setting-check-box'
    }
  });

  unsafeWindow.ffz.addons.settings.add(Constants.Settings.Extensions.MyEmotes, {
    default: true,
    ui: {
      path: extensionsPath,
      title: 'Hide "MyEmotes',
      description: 'Hides payment options on the MyEmotes extension',
      component: 'setting-check-box'
    }
  });
};

export default (): void => {
  if (Constants.IsExtension) {
    return;
  }

  addAddonUIOption();
  addOptions();
  addExtensions();
};
