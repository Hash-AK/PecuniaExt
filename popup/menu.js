document.addEventListener("DOMContentLoaded", async function() {
    // setup the necessary variable, html objects for the field and context menu
    const inputCurrencyValueElement = document.getElementById("input-currency-value");
    let inputValue
    const inputCurrencyElement = document.getElementById("input-currency-select");
    let inputCurrency
    const outputCurrencyElement = document.getElementById("output-currency-select")
    let outputCurrency
    let rate
    //let valueFromLocalStorageObj = await browser.storage.local.get("value");
    //let currencyFromLocalStorageObj = await browser.storage.local.get("currency");

    // fetch the data from local storage (if present) and setup necessary step to verify if it need to fillout the fields
    const storedData = await browser.storage.local.get(["context_value", "context_currency_input", "context_currency_output"]);
    let dataFound = false;
    let valueFromLocalStorageData = storedData.context_value;
    let inputCurrencyFromLocalStorage = storedData.context_currency_input;
    // document.getElementById("local-storage-output").innerHTML = valueFromLocalStorageData; not needed anymore for debug
    let outputCurrencyFromLocalStorage = storedData.context_currency_output;
    if (valueFromLocalStorageData){
      inputCurrencyValueElement.value = valueFromLocalStorageData;
      //browser.storage.local.remove("context_value");
      //updateConversion();
      dataFound = true;
    }
    if (inputCurrencyFromLocalStorage){
      inputCurrencyElement.value = inputCurrencyFromLocalStorage;
      //browser.storage.local.remove("context_currency_input")
      //updateConversion();
      dataFound = true;
    }

    if (outputCurrencyFromLocalStorage){
      outputCurrencyElement.value = outputCurrencyFromLocalStorage;
      //browser.storage.local.remove("context_currency_output")
      //updateConversion();
      dataFound = true;
    }
    // delete the keys from the storage, if needed
    if (dataFound) {
      await updateConversion();
      browser.storage.local.remove([
        "context_value",
        "context_currency_input",
        "context_currency_output"
      ]);
    }

    async function updateConversion(){
      // fetch the correct values
      inputValue = inputCurrencyValueElement.value;
      inputCurrency = inputCurrencyElement.value;
      outputCurrency = outputCurrencyElement.value;
      // manage the api call using the API_KEY variable from popup/config.js
      const response = await fetch('https://v6.exchangerate-api.com/v6/' + API_KEY + '/latest/' + inputCurrency)
      // parse the json from the api call
      const data = await response.json();
      rate = data.conversion_rates[outputCurrency];
      // replace the output <p> tag of the popup with the calculaed value
      document.getElementById("output-currency-value").innerHTML = inputValue * rate
      // debugging lines
      console.log('input value : ' + inputValue);
      console.log('input currency : ' + inputCurrency);
      console.log('output currency : ' + outputCurrency);
      console.log('API key : ' + API_KEY)
      console.log('rate : ' + rate)


    }
    // hook listeners to run the updateConversion() function when a value is entered/a field is changed
    inputCurrencyValueElement.addEventListener("input", updateConversion);
    inputCurrencyElement.addEventListener("change", updateConversion)
    outputCurrencyElement.addEventListener("change", updateConversion)


});
