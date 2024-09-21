// ===== INITIALIZATIONS =====
let firstNum = null;
let secondNum = null;
let operator = null;
let value = null;
let resetScreen = true;
const maxDigits = 10;
const zeroDivisionMessage = "noob lol";
const isPositive = true;

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

function getSecondVal (currDisplayNum) {
    secondNum = currDisplayNum;
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

//executes corresponding code based on the clicked button's id or class
buttonClicked.addEventListener("click", (e) => {
    const buttonID = e.target.id;
    let currDisplayNum;

    //prevents string message from being parsed and returning NaN
    if (!(display.textContent === zeroDivisionMessage)) {
        currDisplayNum = parseFloat(display.textContent);
    }
    else {
        currDisplayNum = display.textContent;
    }
    
    // ===== CLICKS A NUMBER KEY =====
    if (e.target.classList.contains("numberKeys")) {
        if(resetScreen || display.textContent === '0') {
            display.textContent = '';
        }    
        value = numberList[buttonID];
        //limits the amount of numbers to be added on the screen
        if (display.textContent.length < maxDigits) {
            populateDisplay(value);   
        }
        resetScreen = false;
    }

    // ===== CLICKS AN ARITHMETIC KEY =====
    if(e.target.classList.contains("arithmeticKeys")) {
        if (!(typeof(currDisplayNum) === 'string')) {
            if (firstNum && secondNum === null) {
                getSecondVal(currDisplayNum);
                firstNum = value;
            }
            else {
                firstNum = currDisplayNum;
            }
        }

        operator = operatorList[buttonID];
        resetScreen = true;
    }

    // ===== CLICKS A MISCELLANEOUS KEY =====
    if (buttonID === 'equalsBtn' && firstNum !== null) {
        getSecondVal(currDisplayNum);
        resetValues();
    }

    if (buttonID === 'clearBtn') {
        display.textContent = '0';
        resetValues();
    }

    if (buttonID === 'decimalBtn') {
        //disable button after one click;
        if (!display.textContent.includes(".") && !resetScreen && 
            display.textContent.length < maxDigits) 
        {
            display.textContent += '.';
        }
    }

    if (buttonID === 'signBtn') {
        display.textContent = -currDisplayNum;
    }

    if (buttonID === 'percentBtn') {
        display.textContent = roundResult(currDisplayNum / 100);
    }

    if(buttonID === 'deleteBtn') {
        //deletes rightmost digit or decimal point
        currDisplayNum = display.textContent;
        display.textContent = currDisplayNum.slice(0, -1);
        //reset values if all of the numbers are deleted
        if (display.textContent.length <= 0) {
            display.textContent += 0;
            resetValues();
        }
    }
});
