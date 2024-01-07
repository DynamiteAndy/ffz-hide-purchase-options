import { Constants } from '@hpo-globals';
import { until } from '@hpo-helpers';
import { allConcurrently } from '@hpo-utilities';
import {
  Bits,
  Charity,
  CompletePurchase,
  ContinueSub,
  Gift,
  HypeChat,
  ManageYourSub,
  Resubscribe,
  SettingsMenu,
  Styles,
  Subscribe,
  Subtember,
  Turbo,
  UpdateSub
} from '@hpo-features';
import { EmotesShowcase, FeaturedViewer, LatestFollowers, MyEmotes } from '@hpo-feature-extensions';

(async () => {
  await until(() =>
    !Constants.InIframe
      ? unsafeWindow.ffz?.addons?.loaded === true && unsafeWindow.ffz?.on !== undefined
      : document.readyState === 'complete'
  );

  allConcurrently('Features', [
    { name: 'feature:settings-menu', task: SettingsMenu },
    { name: 'feature:styles', task: Styles },
    { name: 'feature:bits', task: Bits },
    { name: 'feature:complete-purchase', task: CompletePurchase },
    { name: 'feature:continue-sub', task: ContinueSub },
    { name: 'feature:gift', task: Gift },
    { name: 'feature:manage-your-sub', task: ManageYourSub },
    { name: 'feature:resubscribe', task: Resubscribe },
    { name: 'feature:subscribe', task: Subscribe },
    { name: 'feature:subtember', task: Subtember },
    { name: 'feature:update-sub', task: UpdateSub }
  ]);

  allConcurrently('Feature Extensions', [
    { name: 'feature-extension:emotes-showcase', task: EmotesShowcase },
    { name: 'feature-extension:featured-viewer', task: FeaturedViewer },
    { name: 'feature-extension:latest-followers', task: LatestFollowers },
    { name: 'feature-extension:my-emotes', task: MyEmotes }
  ]);

  allConcurrently('Dynamic Features', [
    { name: 'dynamic-feature:charity', task: Charity },
    { name: 'dynamic-feature:hype-chat', task: HypeChat },
    { name: 'dynamic-feature:turbo', task: Turbo }
  ]);
})();
