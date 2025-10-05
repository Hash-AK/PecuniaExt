function onCreated() {
    if (browser.runtime.lastError){
        console.log(`Error: ${browser.runtime.lastError}`);
    } else{
        console.log("Item created with success");
    }
}

browser.contextMenus.create(
    {
        id: "webpage-currency-selection",
        title: "Send to PecuniaEXT",
        contexts: ["selection"],
    },
    onCreated,
);

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId){
        case "webpage-currency-selection":
            console.log(info.selectionText);
            const regex = /([0-9.,]+)\s*([a-zA-Z]{3})|([a-zA-Z]{3})\s*([0-9.,]+)/;
            const match = info.selectionText.match(regex);

            if (match){
                const amountReged = match[1] || match[4];
                const currencyStr = match[2] || match[3];
                const amount = amountReged.replace(/,/g, '');
                let toStore = {
                    value: amount,
                    currency: currencyStr,  
                    };
                browser.storage.local.set(toStore);
            }

            
            break;
    }
});