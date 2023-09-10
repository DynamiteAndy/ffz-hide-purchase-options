import { Metadata } from 'userscript-metadata-webpack-plugin';
import { author, url, description, version, bugs } from '../package.json';

export default {
  name: {
    $: 'FFZ Hide Purchase Options'
  },
  namespace: 'dynamite-andy',
  version: version,
  iconURL: `${url}/blob/main/src/resources/icons/favicon32x32.ico?raw=true`,
  icon64URL: `${url}/blob/main/src/resources/icons/favicon64x64.ico?raw=true`,
  updateURL: `${url}/raw/main/dist/`,
  downloadURL: `${url}/raw/main/dist/`,
  supportURL: bugs.url,
  description: description,
  author: author,
  include: [
    'http://twitch.tv/*',
    'https://twitch.tv/*',
    'http://*.twitch.tv/*',
    'https://*.twitch.tv/*',
    'http://*.ext-twitch.tv/*',
    'https://*.ext-twitch.tv/*'
  ],
  exclude: ['http://api.twitch.tv/*', 'https://api.twitch.tv/*'],
  match: [],
  'run-at': 'document-start',
  grant: ['GM_getValue', 'GM_setValue', 'GM_deleteValue', 'GM_addStyle', 'GM_addValueChangeListener'],
  require: []
} as Metadata;
