# PecuniaExt

A simple currency conversion browser extension.
Made for siege.hackclub.com  
I made this extension because I was tired of always seeing foreign monney and having to convert them (hint : im lazy), so I decided to make this extension.  
It is my first real experience with JS so the code is probably very messy.

![demo video](https://hc-cdn.hel1.your-objectstorage.com/s/v3/f1749825d7fb18a7db04156714350a4a05739932_2025-10-05_19-14-00.mp4)

**Please Note** : This extension is currently configured and made for Firefox (Manifest V2). To make it work on Chrom[e,ium]-based browser (Manifest v3), you would need to modify a few parameter. 
Also as it is not signed by Mozilla/Firefox it cannot be imported as a normal extension yet, just as a debug extension. 

**Please also note** that to use this extension, you need an [ExchangeRate-APi](https://www.exchangerate-api.com) API key. As mentionned in the [Instalaltion](#installation) section, you need to put it in the _popup/config.js_ file, so that the code can import it as a variable. **_ONLY_** put the API key string, not the API url endpoint
## Installation

1. Clone the repository : 
```bash
git clone https://github.com/Hash-AK/PecuniaExt
```
2. Create the popup/config.js file, and paste as it's content 
```js
const API_KEY = "{INSERT YOUR ExchangeRate-API FREE KEY HERE}"
```
3. Open your browser's debug extension management page (in firefox it is ```about:debugging#/runtime/this-firefox```)
4. Click "Load Temporary Add-on" and select the cloned repository directory.

## Usage

1. Click on the extension icon in your browser.
2. Enter the amount you want to convert in the input field.
3. Select the input and output currencies from their respective dropdown menu.
4. The converted amount will be displayed under the sepparator.  
5. Alternatively, you can select an amount on a webpage (either in the format [Number] [Currency], [Currency] [Number], [Number][Currency], etc), right click and select the appropriate option under 'PecuniaExt'. Then, click on the extension's icon, and the field Value and Input/Output Currency will be filled, depending on which context menu you used
## Features

- Simple to use popup menu to convert currency from a wide range of signs, thanks to [ExchangeRate-API](https://www.exchangerate-api.com)  
- 4 different context menu option to directly send selected currency/value/ from a webpage to the extension as input or output :
* Send value and currency as input
* Send value as input
* Send currency as input
* Send currency as output
So you don't even need to copy it and paste it in! Head over to [the testign section](#testing) to try it out.

## Technologies Used
For this extension, I used (for the first time) different javascript functions, like :
```javascript
fetch
await
browser.storage.local.[set,get,remove]
```

I used Gemini-CLI to help me debug, give me code suggestions and as an agent to periodically push my code to this github repo.

## Testing
You can select the value down here to text the context menu!  

20 CAD  
30USD  
3.5   USD  
AED3.5  
1,000 USD
