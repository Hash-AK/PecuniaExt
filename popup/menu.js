document.addEventListener("DOMContentLoaded", function() {
    const inputCurrencyValueElement = document.getElementById("input-currency-value");
    let inputValue
    const inputCurrencyElement = document.getElementById("input-currency-select");
    let inputCurrency
    const outputCurrencyElement = document.getElementById("output-currency-select")
    let outputCurrency
    let rate
    function updateConversion(){
      inputValue = inputCurrencyValueElement.value;
      inputCurrency = inputCurrencyElement.value;
      outputCurrency = outputCurrencyElement.value;
      document.getElementById("output-currency-value").innerHTML = inputValue * rate
      console.log(inputValue);
      console.log(inputCurrency);
      console.log(API_KEY)
    }
    inputCurrencyValueElement.addEventListener("input", updateConversion);
    inputCurrencyElement.addEventListener("change", updateConversion)
    outputCurrencyElement.addEventListener("change", updateConversion)




});
