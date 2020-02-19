import * as fs from 'fs';
import { Constants } from '../constants';

export const apply = (): void => {
  document.body.classList.add(Constants.Styles.Root);

  GM_addStyle(fs.readFileSync(`./dist/styles/ffz-hide-purchase-options.styles.css`, 'utf8'));
};
