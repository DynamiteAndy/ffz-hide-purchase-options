const settingPrefix = 'addon.hide_purchase_options';

export class Constants {
  static readonly InIframe = window.location.host !== 'www.twitch.tv';
  static readonly IsExtension = window.location.host.endsWith('ext-twitch.tv');

  static Styles = class {
    static readonly Root = 'ffz-hide-purchase-options';
    static readonly Base = 'ffz-h-p-hide';
    static readonly GiftASub = 'hide-gift-a-sub';
    static readonly ManageYourSub = 'hide-manage-your-sub';
    static readonly Bits = 'hide-bits';
    static readonly Subscribe = 'hide-subscribe';
    static readonly Resubscribe = 'hide-resubscribe';
    static readonly ContinueSub = 'hide-continue-sub';
    static readonly UpdateSub = 'hide-update-sub';
    static readonly CompletePurchase = 'hide-complete-purchase';
    static readonly Subtember = 'hide-subtember';
    static readonly Turbo = 'hide-turbo';
    static readonly HypeChat = 'hide-hype-chat';
    static readonly Charity = 'hide-charity';

    static Extensions = class {
      static readonly EmotesShowcase = 'hide-emotes-showcase';
      static readonly LatestFollowers = 'hide-latest-followers';
    };
  };

  static Settings = class {
    static readonly prefix = `${settingPrefix}.support-panel`;
    static readonly GiftASub = `${this.prefix}.gift_a_sub`;
    static readonly ManageYourSub = `${this.prefix}.go_above_and_beyond`;
    static readonly Bits = `${this.prefix}.bits`;
    static readonly ContinueSub = `${this.prefix}.continue_sub`;
    static readonly UpdateSub = `${this.prefix}.update_sub`;
    static readonly Subscribe = `${this.prefix}.subscribe`;
    static readonly Resubscribe = `${this.prefix}.resubscribe`;
    static readonly CompletePurchase = `${this.prefix}.complete_purchase`;
    static readonly Subtember = `${this.prefix}.subtember`;
    static readonly Turbo = `${this.prefix}.turbo`;
    static readonly HypeChat = `${this.prefix}.hype_chat`;
    static readonly Charity = `${this.prefix}.charity`;

    static Extensions = class {
      static readonly prefix = `${settingPrefix}.support-panel.extensions`;
      static readonly Text = `${this.prefix}.text`;
      static readonly EmotesShowcase = `${this.prefix}.emotes_showcase`;
      static readonly LatestFollowers = `${this.prefix}.latest_followers`;
    };
  };
}
