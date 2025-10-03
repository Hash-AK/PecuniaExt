document.addEventListener("DOMContentLoaded", function() {
    const inputCurrencyValueElement = document.getElementById("input-currency-value");
    let inputValue
    const inputCurrencyElement = document.getElementById("input-currency-select");
    let inputCurrency

    inputCurrencyValueElement.addEventListener("input", function() {
        inputValue = inputCurrencyValueElement.value;
        inputCurrency = inputCurrencyElement.value;
        console.log(inputValue);
        console.log(inputCurrency);
        document.getElementById("output-currency-value").innerHTML = inputValue * 1.3

    });

});
