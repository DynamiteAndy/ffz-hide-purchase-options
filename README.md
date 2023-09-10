# [Unofficial Addon] FFZ - Hide Purchase Options 
This is a unofficial addon for FFZ, this addon requires both [FrankerFacez](https://www.frankerfacez.com/) and [Tampermonkey](https://www.tampermonkey.net/). 

## Installation
Requires: [FrankerFacez](https://www.frankerfacez.com/), [Tampermonkey](http://tampermonkey.net/)

1. Navigate to the dist folder,
2. Open `ffz-hide-purchase-options.min.user.js` (Minified version),
3. Click "Raw" and Tampermonkey will prompt script installation

![First Time Install](/src/resources/first-time-install.png?raw=true "First Time Install")

![New Settings](/src/resources/options.png?raw=true "New Settings")

# Developer Guide
Requires: [Node v18 or higher](https://nodejs.org/en/), [pNpm](https://pnpm.io/), [Tampermonkey](http://tampermonkey.net/) and a code editor such as [Visual Studio Code](https://code.visualstudio.com/) or any alternative.

## Developing
- `pnpm i`
- `pnpm start`

Install `ffz-hide-purchase-options.dev.user.js` from dist and add it to Tampermonkey, this will fetch the userscript from your local machine.
This requires Tampermonkey to be gave the "Allow access to file URLS" permission on chrome.

### Versioning
This should be done at the point of creating a release. Version the package.json, ensuring to comply with [semver](http://semver.org/) (MAJOR.MINOR.PATCH)

## Installation
Requires: [Tampermonkey](http://tampermonkey.net/)

1. Navigate to the dist folder,
2. Open `ffz-hide-purchase-options.min.user.js` (Minified version) or `ffz-hide-purchase-options.user.js` (non-minified version),
3. Click "Raw" and Tampermonkey will prompt script installation
