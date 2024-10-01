// ===== INITIALIZATIONS =====
let firstNum = null;
let secondNum = null;
let operator = null;
let value = null;
let resetScreen = true;
const maxDigits = 10;
const zeroDivisionMessage = "noob lol";
const strDigits = "0123456789";
const strOperators = "+-*/";

// ===== DOM TARGET SELECTIONS =====
const display = document.querySelector("#calc-screen");
const buttonClicked = document.querySelector("#calc-body");

//objects to map IDs to corresponding values
const numberList = {
    'zeroBtn': 0,
    'oneBtn': 1,
    'twoBtn': 2,
    'threeBtn': 3,
    'fourBtn': 4,
    'fiveBtn': 5,
    'sixBtn': 6,
    'sevenBtn': 7,
    'eightBtn': 8,
    'nineBtn': 9
}

const operatorList = {
    'addBtn': '+',
    'subtractBtn': '-',
    'multiplyBtn': '*',
    'divideBtn': '/'
}

// ===== OPERATOR FUNCTIONS =====
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//maps chosen operator button to corresponding function
function operate(num1, num2, sign) {

    switch(sign) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

// ===== HELPER FUNCTIONS =====
function populateDisplay(displayVal) {
    //deals with zero division
    if (!(displayVal === Infinity)) {
        display.textContent += displayVal.toString();
    }
    else {
        display.textContent = zeroDivisionMessage;
        resetValues();
    }
}

function getSecondVal (currDisplayVal) {
    secondNum = currDisplayVal;
    value = operate(firstNum, secondNum, operator);
    //round the value properly
    let roundedValue = roundResult(value);
    //reset second value for continuous computation
    display.textContent = '';
    secondNum = null;
    resetScreen = false;
    populateDisplay(roundedValue);
}

function roundResult(num) {
    let numStr = num.toString();
    //extends values in scientific notation to long decimal form
    if (numStr.includes('e')) {
        numStr = num.toFixed(20); 
    }
    //get length of integer part to determine available decimal space 
    const numParts = numStr.split(".");
    const integerPart = numParts[0];
    //convert to scientific notation (3 significant figures)
    //for values with more than maxDigits
    if (integerPart.length > maxDigits) {
        return num.toExponential(3); 
    }

    return parseFloat(num.toFixed(maxDigits - integerPart.length));
}

function resetValues() {
    firstNum = null;
    secondNum = null;
    operator = null;
    value = null;
    resetScreen = true;
}

function checkZeroDivision () {
    return display.textContent === zeroDivisionMessage? true : false;
}

function parseDisplay () {
    //prevents string message from being parsed and returning NaN
    if (!checkZeroDivision()) {
        return parseFloat(display.textContent);
    }
    else {
        return display.textContent;
    }
}

// ===== CALCULATOR FUNCTIONS =====
function enterDigit (value) {
    if(resetScreen || display.textContent === '0') {
        display.textContent = '';
    }    
    //limits the amount of numbers to be added on the screen
    if (display.textContent.length < maxDigits) {
        populateDisplay(value);   
    }
    resetScreen = false;
}

function doArithmetic (currDisplayVal, operatorVal) {
    if (!(typeof(currDisplayVal) === 'string')) {
        if (firstNum && secondNum === null) {
            getSecondVal(currDisplayVal);
            firstNum = value;
        }
        else {
            firstNum = currDisplayVal;
        }
    }

    operator = operatorVal;
    resetScreen = true;
}

function resolveEqual (currDisplayVal) {
    if (firstNum !== null) {
        getSecondVal(currDisplayVal);
        resetValues();
    }
}

function resolveClear() {
    display.textContent = '0';
    resetValues();
}

function insertDecimal () {
    //disable button after one click;
    if (!display.textContent.includes(".") && !resetScreen && 
        display.textContent.length < maxDigits) 
    {
        display.textContent += '.';
    }
}

function removeLastChar () {
    //deletes rightmost digit or decimal point
    const currDisplay = display.textContent;
    if (!checkZeroDivision()) {
        display.textContent = currDisplay.slice(0, -1);
    }
    //reset values if all of the numbers are deleted
    if (display.textContent.length <= 0) {
        display.textContent += 0;
        resetValues();
    }
}

// ===== BUTTON EVENT LISTENER =====
//executes corresponding code based on the clicked button's id or class
buttonClicked.addEventListener("click", (e) => {

    const buttonID = e.target.id;
    let currDisplayVal = parseDisplay();
    
    //triggers when a number button is clicked
    if (e.target.classList.contains("numberKeys")) {
        value = numberList[buttonID]
        enterDigit(value);
    } 
    //triggers when an operator button is clicked
    else if(e.target.classList.contains("arithmeticKeys")) {
        doArithmetic(currDisplayVal, operatorList[buttonID]);
    } 
    //triggers when other miscellaneous buttons is clicked
    else if (buttonID === 'equalsBtn') {
        resolveEqual(currDisplayVal);
    } else if (buttonID === 'clearBtn') {
        resolveClear();
    } else if (buttonID === 'decimalBtn') {
        insertDecimal();
    } else if (buttonID === 'signBtn') {
        if (!checkZeroDivision()) {
            display.textContent = -currDisplayVal;
        }
    } else if (buttonID === 'percentBtn') {
        if (!checkZeroDivision()) {
            display.textContent = roundResult(currDisplayVal / 100);
        }
    } else if(buttonID === 'deleteBtn') {
        removeLastChar();
    }
});

// ===== KEYBOARD SUPPORT EVENT LISTENER =====
// executes corresponding code based on the keydown in keyboard
window.addEventListener("keydown", (event) => {

    const clickedKey = event.key;
    let currDisplayVal = parseDisplay();

    if (strDigits.includes(clickedKey)) {
        enterDigit(parseInt(clickedKey));
    } else if (strOperators.includes(clickedKey)) {
        doArithmetic(currDisplayVal, clickedKey);
    } else if (clickedKey === '=' || clickedKey === 'Enter') {
        resolveEqual(currDisplayVal);
    } else if (clickedKey === 'Escape' || clickedKey === 'Clear') {
        resolveClear();
    } else if (clickedKey === '.') {
        insertDecimal();
    } else if (clickedKey === 'ArrowUp') {
        if (!checkZeroDivision()) {
            display.textContent = -currDisplayVal;
        }
    } else if (clickedKey === '%') {
        if (!checkZeroDivision()) {
            display.textContent = roundResult(currDisplayVal / 100);
        }
    } else if (clickedKey === 'Backspace') {
        removeLastChar();
    }
});