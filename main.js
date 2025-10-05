
function onCreated() {
    if (browser.runtime.lastError){
        console.log(`Error: ${browser.runtime.lastError}`);
    } else{
        console.log("Item created with success");
    }
}
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



browser.contextMenus.onClicked.addListener((info, tab) => {
    let regex;
    let match;
    switch (info.menuItemId){
        case "webpage-currency-and-value-selection":
            console.log(info.selectionText);
            regex = /([0-9.,]+)\s*([a-zA-Z]{3})|([a-zA-Z]{3})\s*([0-9.,]+)/;
            match = info.selectionText.match(regex);

            if (match){
                const amountReged = match[1] || match[4];
                const currencyStr = match[2] || match[3];
                const amount = amountReged.replace(/,/g, '');
                let toStore = {
                    context_value: amount,
                    context_currency_input: currencyStr,  
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
        
    }
});