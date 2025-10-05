
function onCreated() {
    if (browser.runtime.lastError){
        console.log(`Error: ${browser.runtime.lastError}`);
    } else{
        console.log("Item created with success");
    }
}
// create the different context submenus
browser.contextMenus.create(
    {
        id: "webpage-value-selection",
        title: "Send value as input to PecuniaExt",
        contexts: ["selection"],
    },
    onCreated,
);
browser.contextMenus.create(
    {
        id: "webpage-currency-as-input-selection",
        title: "Send currency sign as input to PecuniaExt",
        contexts: ["selection"],
    },
    onCreated,
);
browser.contextMenus.create(
    {
        id: "webpage-currency-as-output-selection",
        title: "Send currency sign as output to PecuniaExt",
        contexts: ["selection"],
    },
    onCreated,
);
browser.contextMenus.create(
    {
        id: "webpage-currency-and-value-selection",
        title: "Send value and currency as input to PecuniaExt",
        contexts: ["selection"],
    },
    onCreated,
);


// listener for contetx menu click
browser.contextMenus.onClicked.addListener((info, tab) => {
    let regex;
    let match;
    switch (info.menuItemId){
        case "webpage-currency-and-value-selection":
            console.log(info.selectionText);
            // regex to catch number folowed by any whitespace (or none) followed by 3 letters OR 3 nubmers followed by any whitespaces (or none) followed by numbers
            regex = /([0-9.,]+)\s*([a-zA-Z]{3})|([a-zA-Z]{3})\s*([0-9.,]+)/;
            match = info.selectionText.match(regex);
            // test if the regex was found

            if (match){
                //get the correct value for each
                const amountReged = match[1] || match[4];
                const currencyStr = match[2] || match[3];
                const amount = amountReged.replace(/,/g, '');
                let toStore = {
                    // store the keys in the browser.local.storage
                    context_value: amount,
                    context_currency_input: currencyStr.toUpperCase(),  
                    };
                browser.storage.local.set(toStore);
            }

            
            break;

        case "webpage-value-selection":
           console.log(info.selectionText);
           regex = /[\d,.]+/
           match = info.selectionText.match(regex);

           if (match){
            const amountReged = match[0]
            const amount = amountReged.replace(/,/g, '');
            let toStore = {
                context_value: amount,
            };
            browser.storage.local.set(toStore);

           }
           break;
         
        case "webpage-currency-as-input-selection":
            console.log(info.selectionText);
            regex = /[a-zA-Z]{3}/;
            match = info.selectionText.match(regex);
            if (match){
                const currencyStr = match[0]
                let toStore = {
                    context_currency_input: currencyStr.toUpperCase(),
            };
            browser.storage.local.set(toStore);
            }
            break;
        
        case "webpage-currency-as-output-selection":
            console.log(info.selectionText);
            regex = /[a-zA-Z]{3}/;
            match = info.selectionText.match(regex);
            if (match){
                const currencyStr = match[0]
                let toStore = {
                    context_currency_output: currencyStr.toUpperCase(),

                };
                browser.storage.local.set(toStore);
            }
            break;

        
    }
});