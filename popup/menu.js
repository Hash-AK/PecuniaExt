document.addEventListener("DOMContentLoaded", async function() {
    const inputCurrencyValueElement = document.getElementById("input-currency-value");
    let inputValue
    const inputCurrencyElement = document.getElementById("input-currency-select");
    let inputCurrency
    const outputCurrencyElement = document.getElementById("output-currency-select")
    let outputCurrency
    let rate
    let valueFromLocalStorageObj = await browser.storage.local.get("value");
    let valueFromLocalStorageData = valueFromLocalStorageObj.value;
    // document.getElementById("local-storage-output").innerHTML = valueFromLocalStorageData; not needed anymore for debug
    inputCurrencyValueElement.value = valueFromLocalStorageData
    browser.storage.local.remove("value");


    async function updateConversion(){
      inputValue = inputCurrencyValueElement.value;
      inputCurrency = inputCurrencyElement.value;
      outputCurrency = outputCurrencyElement.value;
      const response = await fetch('https://v6.exchangerate-api.com/v6/' + API_KEY + '/latest/' + inputCurrency)
      const data = await response.json();
      rate = data.conversion_rates[outputCurrency];
      document.getElementById("output-currency-value").innerHTML = inputValue * rate
      console.log('input value : ' + inputValue);
      console.log('input currency : ' + inputCurrency);
      console.log('output currency : ' + outputCurrency);
      console.log('API key : ' + API_KEY)
      console.log('rate : ' + rate)


    }
    inputCurrencyValueElement.addEventListener("input", updateConversion);
    inputCurrencyElement.addEventListener("change", updateConversion)
    outputCurrencyElement.addEventListener("change", updateConversion)


});
