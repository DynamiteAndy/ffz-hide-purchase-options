import { Constants } from "../constants";
import Setting from "./models/Setting";

let turboButton = null;

const toggleTurboButton = (value: boolean) => {
  if (!turboButton) {
    let currentNode = null;
    for (const element of [...document.querySelectorAll('[data-a-target="top-nav-container"] [data-a-target="tw-core-button-label-text"]')]) {
      if (element.textContent.trim() === 'Get Ad-Free') {
        currentNode = element;
        break;
      }
    }

    while (currentNode) {
      if (currentNode.nextElementSibling?.classList?.contains('ffz-top-nav')) {
        turboButton = currentNode;
        break;
      }

      currentNode = currentNode.parentElement;
    }
  }

  if (turboButton) {
    if (value) {
      turboButton.classList.add(Constants.Styles.Base);
    } else {
      turboButton.classList.remove(Constants.Styles.Base);
    }
  }
};

const setting = new Setting(Constants.Settings.Turbo, Constants.Styles.Turbo, false, toggleTurboButton);
export const apply = (): void => setting.listen();
