// ==UserScript==
// @name          FFZ Hide Purchase Options
// @namespace     dynamite-andy
// @version       2.0.0
// @iconURL       https://github.com/andrewcartwright1/ffz-hide-purchase-options/blob/main/src/resources/icons/favicon32x32.ico?raw=true
// @icon64URL     https://github.com/andrewcartwright1/ffz-hide-purchase-options/blob/main/src/resources/icons/favicon64x64.ico?raw=true
// @updateURL     https://github.com/andrewcartwright1/ffz-hide-purchase-options/raw/main/dist/ffz-hide-purchase-options.user.js
// @downloadURL   https://github.com/andrewcartwright1/ffz-hide-purchase-options/raw/main/dist/ffz-hide-purchase-options.user.js
// @supportURL    https://github.com/andrewcartwright1/ffz-hide-purchase-options/issues
// @description   Unofficial FFZ addon giving options to remove purchases from twitch
// @author        Dynamite Andy - dynamiteandy@gmail.com
// @include       http://twitch.tv/*
// @include       https://twitch.tv/*
// @include       http://*.twitch.tv/*
// @include       https://*.twitch.tv/*
// @include       http://*.ext-twitch.tv/*
// @include       https://*.ext-twitch.tv/*
// @exclude       http://api.twitch.tv/*
// @exclude       https://api.twitch.tv/*
// @run-at        document-start
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// @grant         GM_addStyle
// @grant         GM_addValueChangeListener
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/globals/constants.ts
var __setFunctionName = (undefined && undefined.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d;
const settingPrefix = 'addon.hide_purchase_options';
class Constants {
}
Constants.InIframe = window.location.host !== 'www.twitch.tv';
Constants.IsExtension = window.location.host.endsWith('ext-twitch.tv');
Constants.Styles = (_a = class {
    },
    __setFunctionName(_a, "Styles"),
    _a.Root = 'ffz-hide-purchase-options',
    _a.Base = 'ffz-h-p-hide',
    _a.GiftASub = 'hide-gift-a-sub',
    _a.ManageYourSub = 'hide-manage-your-sub',
    _a.Bits = 'hide-bits',
    _a.Subscribe = 'hide-subscribe',
    _a.Resubscribe = 'hide-resubscribe',
    _a.ContinueSub = 'hide-continue-sub',
    _a.UpdateSub = 'hide-update-sub',
    _a.CompletePurchase = 'hide-complete-purchase',
    _a.Subtember = 'hide-subtember',
    _a.Turbo = 'hide-turbo',
    _a.HypeChat = 'hide-hype-chat',
    _a.Charity = 'hide-charity',
    _a.Extensions = (_b = class {
        },
        __setFunctionName(_b, "Extensions"),
        _b.EmotesShowcase = 'hide-emotes-showcase',
        _b.LatestFollowers = 'hide-latest-followers',
        _b),
    _a);
Constants.Settings = (_c = class {
    },
    __setFunctionName(_c, "Settings"),
    _c.prefix = `${settingPrefix}.support-panel`,
    _c.GiftASub = `${_c.prefix}.gift_a_sub`,
    _c.ManageYourSub = `${_c.prefix}.go_above_and_beyond`,
    _c.Bits = `${_c.prefix}.bits`,
    _c.ContinueSub = `${_c.prefix}.continue_sub`,
    _c.UpdateSub = `${_c.prefix}.update_sub`,
    _c.Subscribe = `${_c.prefix}.subscribe`,
    _c.Resubscribe = `${_c.prefix}.resubscribe`,
    _c.CompletePurchase = `${_c.prefix}.complete_purchase`,
    _c.Subtember = `${_c.prefix}.subtember`,
    _c.Turbo = `${_c.prefix}.turbo`,
    _c.HypeChat = `${_c.prefix}.hype_chat`,
    _c.Charity = `${_c.prefix}.charity`,
    _c.Extensions = (_d = class {
        },
        __setFunctionName(_d, "Extensions"),
        _d.prefix = `${settingPrefix}.support-panel.extensions`,
        _d.Text = `${_d.prefix}.text`,
        _d.EmotesShowcase = `${_d.prefix}.emotes_showcase`,
        _d.LatestFollowers = `${_d.prefix}.latest_followers`,
        _d),
    _c);

;// CONCATENATED MODULE: ./src/globals/config.ts
/* harmony default export */ const config = ({
    get: (setting) => {
        return GM_getValue(setting, true);
    },
    set: (setting, value) => {
        GM_setValue(setting, value);
    }
});

;// CONCATENATED MODULE: ./src/globals/index.ts



;// CONCATENATED MODULE: ./src/helpers/wait.ts
const until = async (f, timeoutMs = 10000) => {
    return new Promise((resolve) => {
        const timeWas = new Date();
        const wait = setInterval(() => {
            if (f()) {
                clearInterval(wait);
                resolve(true);
            }
            else if (+new Date() - +timeWas > timeoutMs) {
                clearInterval(wait);
                resolve(false);
            }
        }, 20);
    });
};

;// CONCATENATED MODULE: ./src/utilities/promise-util.ts
const promisify = (fn) => () => new Promise((resolve) => fn((callbackArgs) => resolve(callbackArgs)));
const allConcurrently = async (name, arr, max = 3) => {
    if (arr.length === 0) {
        return Promise.resolve([]);
    }
    let index = 0;
    const results = [];
    const execThread = async () => {
        while (index < arr.length) {
            const curIndex = index++;
            const task = arr[curIndex].task.constructor.name === 'Function' ? promisify(arr[curIndex].task) : arr[curIndex].task;
            results[curIndex] = await task();
        }
    };
    const threads = [];
    for (let thread = 0; thread < max; thread++) {
        threads.push(execThread());
    }
    await Promise.all(threads);
    return results;
};

;// CONCATENATED MODULE: ./src/components/pub-sub.ts
function PubSub() {
    const handlers = {};
    return {
        publish: (event, msg) => {
            (handlers[event] ?? []).forEach((h) => h(msg));
        },
        subscribe: (event, callback) => {
            const list = handlers[event] ?? [];
            list.push(callback);
            handlers[event] = list;
            return callback;
        },
        unsubscribe: (event, callback) => {
            let list = handlers[event] ?? [];
            list = list.filter((h) => h !== callback);
            handlers[event] = list;
        }
    };
}
/* harmony default export */ const pub_sub = (PubSub());

;// CONCATENATED MODULE: ./src/components/index.ts


;// CONCATENATED MODULE: ./src/models/setting.ts


class Setting {
    constructor(settingId, styleClass, tampermonkeySetting = false, settingFn = null) {
        this.applyClass = () => {
            const value = config.get(this.settingId);
            this.setClass(value, !value, false);
        };
        this.settingId = settingId;
        this.styleClass = styleClass;
        this.tampermonkeySetting = tampermonkeySetting;
        this.settingFunction = settingFn;
    }
    listen() {
        pub_sub.subscribe('styles:reapply', this.applyClass);
        if (Constants.InIframe && this.tampermonkeySetting) {
            GM_addValueChangeListener(this.settingId, (_key, oldValue, newValue) => this.setClass(newValue, oldValue, false));
        }
        else if (!Constants.InIframe) {
            unsafeWindow.ffz.addons.settings.getChanges(this.settingId, this.setClass.bind(this));
            unsafeWindow.ffz.on('chat:room-add', this.applyClass);
            unsafeWindow.ffz.on('chat:room-remove', this.applyClass);
        }
        this.applyClass();
    }
    setClass(newValue, _oldValue, updateGMValue = true) {
        if (this.tampermonkeySetting && updateGMValue) {
            config.set(this.settingId, newValue);
        }
        if (newValue) {
            document.body.classList.add(this.styleClass);
        }
        else {
            document.body.classList.remove(this.styleClass);
        }
        if (this.settingFunction) {
            this.settingFunction(newValue);
        }
    }
}

;// CONCATENATED MODULE: ./src/models/index.ts


;// CONCATENATED MODULE: ./src/features/bits.ts


/* harmony default export */ const bits = (() => {
    const setting = new Setting(Constants.Settings.Bits, Constants.Styles.Bits);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/charity.ts



/* harmony default export */ const charity = (async () => {
    if (!Constants.InIframe) {
        await until(() => unsafeWindow.ffz?.site?.elemental._observer === null);
    }
    const toggleCharityButton = (value) => {
        let currentNode = null;
        for (const element of [
            ...document.querySelectorAll('[data-target="channel-header-right"] [data-a-target="tw-core-button-label-text"]')
        ]) {
            if (element.textContent.trim() === 'Donate to Charity') {
                currentNode = element;
                break;
            }
        }
        const charityButton = currentNode?.closest('button')?.parentElement;
        const charityHeading = document.querySelector('[data-test-selector="chat-room-component-layout"] [aria-label="Charity details"]');
        if (value) {
            charityButton?.classList?.add(Constants.Styles.Base);
            charityHeading?.classList?.add(Constants.Styles.Base);
            charityHeading?.previousElementSibling?.classList?.add(Constants.Styles.Base);
        }
        else {
            charityButton?.classList?.remove(Constants.Styles.Base);
            charityHeading?.classList?.remove(Constants.Styles.Base);
            charityHeading?.previousElementSibling?.classList?.remove(Constants.Styles.Base);
        }
    };
    const setting = new Setting(Constants.Settings.Charity, Constants.Styles.Charity, false, toggleCharityButton);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/complete-purchase.ts


/* harmony default export */ const complete_purchase = (async () => {
    const setting = new Setting(Constants.Settings.CompletePurchase, Constants.Styles.CompletePurchase);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/continue-sub.ts


/* harmony default export */ const continue_sub = (async () => {
    const setting = new Setting(Constants.Settings.ContinueSub, Constants.Styles.ContinueSub);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/gift.ts


/* harmony default export */ const gift = (async () => {
    const setting = new Setting(Constants.Settings.GiftASub, Constants.Styles.GiftASub);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/hype-chat.ts



/* harmony default export */ const hype_chat = (async () => {
    if (!Constants.InIframe) {
        await until(() => unsafeWindow.ffz?.site?.elemental._observer === null);
    }
    const togglePostHypeChatButton = (value) => {
        const button = document.querySelector('button[aria-label="Post a Hype Chat"]');
        if (value) {
            button?.parentElement?.parentElement?.classList[value ? 'add' : 'remove'](Constants.Styles.Base);
        }
        else {
            button?.parentElement?.parentElement?.classList.remove(Constants.Styles.Base);
        }
    };
    const setting = new Setting(Constants.Settings.HypeChat, Constants.Styles.HypeChat, false, togglePostHypeChatButton);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/manage-your-sub.ts


/* harmony default export */ const manage_your_sub = (async () => {
    const setting = new Setting(Constants.Settings.ManageYourSub, Constants.Styles.ManageYourSub);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/resubscribe.ts


/* harmony default export */ const resubscribe = (async () => {
    const setting = new Setting(Constants.Settings.Resubscribe, Constants.Styles.Resubscribe);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/settings-menu.ts

const menuPath = 'Add-Ons > Hide Purchase Options';
const defaultPath = `${menuPath} >> Purchase Options`;
const extensionsPath = `${menuPath} >> Extensions`;
const addAddonUIOption = () => {
    unsafeWindow.ffz.addons.settings.addUI('add_ons.hide_purchase_options', {
        path: defaultPath,
        component: 'container'
    });
};
const addOptions = () => {
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
const addExtensions = () => {
    unsafeWindow.ffz.addons.settings.add(Constants.Settings.Extensions.EmotesShowcase, {
        default: true,
        ui: {
            path: extensionsPath,
            title: 'Hide "Emotes Showcase"',
            description: 'Hides payment options on the Emotes Showcase extension',
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
};
/* harmony default export */ const settings_menu = (async () => {
    if (Constants.IsExtension) {
        return;
    }
    addAddonUIOption();
    addOptions();
    addExtensions();
});

;// CONCATENATED MODULE: ./src/scss/index.scss

        const styles = `body.ffz-hide-purchase-options .ffz-h-p-hide{display:none !important}body.ffz-hide-purchase-options.hide-bits button[aria-label=Bits],body.ffz-hide-purchase-options.hide-bits button[data-test-selector=get-bits-button],body.ffz-hide-purchase-options.hide-bits button[data-a-target=top-nav-get-bits-button],body.ffz-hide-purchase-options.hide-bits button[data-a-target=bits-purchase-button-100],body.ffz-hide-purchase-options.hide-bits button[data-a-target=bits-purchase-button-500],body.ffz-hide-purchase-options.hide-bits button[data-a-target=bits-purchase-button-1500],body.ffz-hide-purchase-options.hide-bits button[data-a-target=bits-purchase-button-5000],body.ffz-hide-purchase-options.hide-bits button[data-a-target=bits-purchase-button-10000],body.ffz-hide-purchase-options.hide-bits button[data-a-target=bits-purchase-button-25000],body.ffz-hide-purchase-options.hide-bits a[data-test-selector=test_selector_buy_bits_button]{display:none !important}body.ffz-hide-purchase-options.hide-manage-your-sub button[data-a-target=spm-complete-purchase-button]{display:none !important}body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub"],body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub - 7 Days Remaining"],body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub - 6 Days Remaining"],body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub - 5 Days Remaining"],body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub - 4 Days Remaining"],body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub - 3 Days Remaining"],body.ffz-hide-purchase-options.hide-continue-sub button[aria-label="Continue Sub: 25% off"],body.ffz-hide-purchase-options.hide-continue-sub button[data-test-selector=PaidUpgradeButton]{display:none !important}body.ffz-hide-purchase-options.hide-emotes-showcase a[title=Subscribe],body.ffz-hide-purchase-options.hide-emotes-showcase a[title="Subscribe for"]{display:none !important}body.ffz-hide-purchase-options.hide-emotes-showcase button#overlaysub{display:none !important}body.ffz-hide-purchase-options.hide-latest-followers[data-active=recent] #recent-panel .btn.buy{display:none !important}body.ffz-hide-purchase-options.hide-gift-a-sub button[aria-label="Gift a Sub"],body.ffz-hide-purchase-options.hide-gift-a-sub button[data-test-selector=gift-subscribe-button],body.ffz-hide-purchase-options.hide-gift-a-sub button[data-test-selector=take-the-leaderboard-prompt-button]{display:none !important}body.ffz-hide-purchase-options.hide-hype-chat button[aria-label="Hype Chat"]{display:none !important}body.ffz-hide-purchase-options.hide-manage-your-sub button[aria-label="Manage Your Sub: 25% off"],body.ffz-hide-purchase-options.hide-manage-your-sub button[aria-label="Manage Your Sub"]{display:none !important}body.ffz-hide-purchase-options.hide-resubscribe button[aria-label="Resubscribe: 25% off"],body.ffz-hide-purchase-options.hide-resubscribe button[aria-label=Resubscribe]{display:none !important}body.ffz-hide-purchase-options.hide-subscribe button[aria-label="Subscribe: 25% off"],body.ffz-hide-purchase-options.hide-subscribe button[aria-label=Subscribe]{display:none !important}body.ffz-hide-purchase-options.hide-subtember .subtember-gradient{display:none !important}body.ffz-hide-purchase-options.hide-update-sub button[aria-label="Update Subscription"]{display:none !important}`;
        /* harmony default export */ const scss = (styles);
    
;// CONCATENATED MODULE: ./src/features/styles.ts



const applyClass = () => document.body.classList.add(Constants.Styles.Root);
const listen = () => {
    pub_sub.subscribe('styles:reapply', applyClass);
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const targetElement = mutation.target;
                if (!targetElement.classList.contains('ffz-hide-purchase-options')) {
                    pub_sub.publish('styles:reapply');
                }
            }
        });
    });
    observer.observe(document.body, {
        attributes: true
    });
};
/* harmony default export */ const features_styles = (async () => {
    applyClass();
    GM_addStyle(scss);
    listen();
});

;// CONCATENATED MODULE: ./src/features/subscribe.ts


/* harmony default export */ const subscribe = (async () => {
    const setting = new Setting(Constants.Settings.Subscribe, Constants.Styles.Subscribe);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/subtember.ts


/* harmony default export */ const subtember = (async () => {
    const setting = new Setting(Constants.Settings.Subtember, Constants.Styles.Subtember);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/turbo.ts



/* harmony default export */ const turbo = (async () => {
    if (!Constants.InIframe) {
        await until(() => document.querySelector('nav .ffz-top-nav') !== null);
    }
    const toggleTurboButton = (value) => {
        let currentNode = null;
        for (const element of [
            ...document.querySelectorAll('[data-a-target="top-nav-container"] [data-a-target="tw-core-button-label-text"]')
        ]) {
            if (element.textContent.trim() === 'Get Ad-Free') {
                currentNode = element;
                break;
            }
        }
        while (currentNode) {
            if (currentNode.nextElementSibling?.classList?.contains('ffz-top-nav')) {
                if (value) {
                    currentNode.classList?.add(Constants.Styles.Base);
                }
                else {
                    currentNode.classList?.remove(Constants.Styles.Base);
                }
                break;
            }
            currentNode = currentNode.parentElement;
        }
    };
    const setting = new Setting(Constants.Settings.Turbo, Constants.Styles.Turbo, false, toggleTurboButton);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/update-sub.ts


/* harmony default export */ const update_sub = (async () => {
    const setting = new Setting(Constants.Settings.UpdateSub, Constants.Styles.UpdateSub);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/index.ts















;// CONCATENATED MODULE: ./src/features/extensions/emotes-showcase.ts


/* harmony default export */ const emotes_showcase = (async () => {
    const setting = new Setting(Constants.Settings.Extensions.EmotesShowcase, Constants.Styles.Extensions.EmotesShowcase, true);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/extensions/latest-followers.ts


/* harmony default export */ const latest_followers = (async () => {
    const setting = new Setting(Constants.Settings.Extensions.LatestFollowers, Constants.Styles.Extensions.LatestFollowers, true);
    setting.listen();
});

;// CONCATENATED MODULE: ./src/features/extensions/index.ts



;// CONCATENATED MODULE: ./src/index.ts





(async () => {
    const consoleHeading = Constants.IsExtension
        ? '[hide-purchase-options (Extension)]'
        : '[hide-purchase-options (Twitch)]';
    await until(() => !Constants.InIframe
        ? unsafeWindow.ffz?.addons?.loaded === true && unsafeWindow.ffz?.on !== undefined
        : document.readyState === 'complete');
    console.debug(`${consoleHeading} - Applying`);
    allConcurrently('Features', [
        { name: 'feature:settings-menu', task: settings_menu },
        { name: 'feature:styles', task: features_styles },
        { name: 'feature:bits', task: bits },
        { name: 'feature:complete-purchase', task: complete_purchase },
        { name: 'feature:continue-sub', task: continue_sub },
        { name: 'feature:gift', task: gift },
        { name: 'feature:manage-your-sub', task: manage_your_sub },
        { name: 'feature:resubscribe', task: resubscribe },
        { name: 'feature:subscribe', task: subscribe },
        { name: 'feature:subtember', task: subtember },
        { name: 'feature:update-sub', task: update_sub }
    ], 4);
    allConcurrently('Feature Extensions', [
        { name: 'feature-extension:emotes-showcase', task: emotes_showcase },
        { name: 'feature-extension:latest-followers', task: latest_followers }
    ], 4);
    allConcurrently('Dynamic Features', [
        { name: 'dynamic-feature:charity', task: charity },
        { name: 'dynamic-feature:hype-chat', task: hype_chat },
        { name: 'dynamic-feature:turbo', task: turbo }
    ], 4);
    console.debug(`${consoleHeading} - Finished`);
})();

/******/ })()
;