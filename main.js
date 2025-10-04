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
            let toStore = {
                value: info.selectionText,    
                };
            browser.storage.local.set(toStore);
            break;
    }
});