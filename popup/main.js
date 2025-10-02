function onCreated() {
  if (browser.runtime.lastError){
    console.log(`Error: ${browser.runtime.lastError}`);

  }else{
    console.log("Item created successfully");
  }
}


function onRemoved() {
  console.log("item removed successfully")


}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.contextMenus.create({
  id: "log-selection",
  title: browser.i18n.getMessage("menuItemSelectionLogger"),
  contexts: ["selection"]
}, onCreated);

browser.contextMenus.create({
  id: "remove-me",
  title: browser.i18n.getMessage("menuItemRemoveMe"),
  contexts: ["all"]
}, onCreated);

browser.contextMenus.create({
  id: "separator-1",
  type: "separator",
  contexts: ["all"]
}, onCreated);

browser.contextMenus.create({
  id: "radio",
  type: "radio",
  title: browser.i18n.getMessage("menuItemRadio"),
  contexts: ['all'],
  checked: true
}, onCreated);

browser.contextMenus.create({
  id: "check-uncheck",
  type: "checkbox",
  title: browser.i18n.getMessage("menuItemUncheckMe"),
  contexts: ["all"],
  checked: true,
}, onCreated);

function updateCheckUncheck(checkedstate) {
  if (checkedstate) {
    browser.contextMenus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemUncheckMe"),
   });
  } else {
    browser.contextMenus.update("check-uncheck", {
      title: browser.i18n.getMessage("menuItemCheckMe"),
    });
  }
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId){
    case "log-selection":
      console.log(info.selectionText);
      break;
    case "remove-me":
      let removing = browser.contextMenus.remove(info.menuItemId);
      removing.then(onRemoved, onError);
      break;
    case "check-uncheck":
      updateCheckUncheck(info.checked);
      console.log("it is")
      break;
  }
})
