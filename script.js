const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

let currentNumber = "0";
let previousNumber = "";
let operator = null;
let resetScreen = false;


// Update calculator display
function updateDisplay() {
    currentDisplay.textContent = currentNumber;
    previousDisplay.textContent = previousNumber + (operator ? ` ${operator}` : "");
}


// Add number
function appendNumber(number) {

    if (currentNumber === "0" || resetScreen) {
        currentNumber = number;
        resetScreen = false;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


// Add decimal
function addDecimal() {

    if (resetScreen) {
        currentNumber = "0";
        resetScreen = false;
    }

    if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}


// Choose operator
function chooseOperator(selectedOperator) {

    if (operator !== null && !resetScreen) {
        calculate();
    }

    previousNumber = currentNumber;
    operator = selectedOperator;
    resetScreen = true;

    updateDisplay();
}


// Calculate result
function calculate() {

    if (operator === null || previousNumber === "") {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = null;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    // Prevent ugly floating point results
    result = parseFloat(result.toFixed(10));

    currentNumber = result.toString();
    previousNumber = "";
    operator = null;
    resetScreen = true;

    updateDisplay();
}


// Clear calculator
function clearCalculator() {

    currentNumber = "0";
    previousNumber = "";
    operator = null;
    resetScreen = false;

    updateDisplay();
}


// Delete last digit
function deleteNumber() {

    if (resetScreen || currentNumber === "Error") {
        currentNumber = "0";
        resetScreen = false;
    } else if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = "0";
    }

    updateDisplay();
}


// Percentage
function percentage() {

    const number = parseFloat(currentNumber);

    if (isNaN(number)) {
        return;
    }

    currentNumber = (number / 100).toString();

    updateDisplay();
}


// Button clicks
document.querySelectorAll("[data-number]").forEach(button => {

    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
    });

});


document.querySelectorAll("[data-operator]").forEach(button => {

    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    });

});


document.querySelector('[data-action="decimal"]')
    .addEventListener("click", addDecimal);


document.querySelector('[data-action="equals"]')
    .addEventListener("click", calculate);


document.querySelector('[data-action="clear"]')
    .addEventListener("click", clearCalculator);


document.querySelector('[data-action="delete"]')
    .addEventListener("click", deleteNumber);


document.querySelector('[data-action="percent"]')
    .addEventListener("click", percentage);


// Keyboard support
document.addEventListener("keydown", (event) => {

    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    else if (event.key === ".") {
        addDecimal();
    }

    else if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperator(event.key);
    }

    else if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    else if (event.key === "Backspace") {
        deleteNumber();
    }

    else if (event.key === "Escape") {
        clearCalculator();
    }

    else if (event.key === "%") {
        percentage();
    }

});