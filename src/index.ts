import { Constants } from './constants';
import { until } from './scripts/helpers/wait'

/* eslint-disable @typescript-eslint/no-var-requires */
(async () => {
  const styles = require('./styles/index');
  const settings = require('./scripts/settings-menu');
  const bits = require('./scripts/bits');
  const continueSub = require('./scripts/continue-sub');
  const updateSub = require('./scripts/update-sub');
  const completePurchase = require('./scripts/complete-purchase');
  const gift = require('./scripts/gift');
  const manageYourSub = require('./scripts/manage-your-sub');
  const resubscribe = require('./scripts/resubscribe');
  const subscribe = require('./scripts/subscribe');
  const emotesShowcase = require('./scripts/extensions/emotes-showcase');
  const subtember = require('./scripts/subtember');

  if (!Constants.InIframe) {
    await until(() => (unsafeWindow as any).ffz?.addons?.loaded === true);
    settings.render();
  } else {
    await until(() => document.readyState === 'complete');
  }

  styles.apply();
  bits.apply();
  continueSub.apply();
  updateSub.apply();
  completePurchase.apply();
  gift.apply();
  manageYourSub.apply();
  resubscribe.apply();
  subscribe.apply();
  emotesShowcase.apply();
  subtember.apply();
})();
/* eslint-enable @typescript-eslint/no-var-requires */