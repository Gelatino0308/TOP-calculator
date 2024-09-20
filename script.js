let firstNum = null;
let secondNum = null;
let operator = null;
let value = null;
let resetScreen = true;
const maxDigits = 10;
const zeroDivisionMessage = "noob lol";
const isPositive = true;

const display = document.querySelector("#calc-screen");
const buttonClicked = document.querySelector("#calc-body");
const equalsBtn = document.querySelector("#equalsBtn");

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
    //deal with zero division
    if (!(displayVal === Infinity)) {
        display.textContent += displayVal.toString();
    }
    else {
        display.textContent = zeroDivisionMessage;
        resetValues();
    }
}

function calculate (currDisplayNum) {
    secondNum = currDisplayNum;
    value = operate(firstNum, secondNum, operator);
    //round the value properly
    let roundedValue = roundResult(value);
    display.textContent = '';
    secondNum = null;
    resetScreen = false;
    populateDisplay(roundedValue);
}

function roundResult(num) {

    let numStr = num.toString();
    
    if (numStr.includes('e')) {
        numStr = num.toFixed(20); 
    }

    const numParts = numStr.split(".");
    const integerPart = numParts[0];

    //convert to scientific notation for values with more than maxDigits
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


buttonClicked.addEventListener("click", (e) => {
    
    const buttonID = e.target.id;
    let currDisplayNum;

    //check if current display value is a number or a message
    if (!(display.textContent === zeroDivisionMessage)) {
        currDisplayNum = parseFloat(display.textContent);
    }
    else {
        currDisplayNum = display.textContent;
    }

    if (e.target.classList.contains("numberKeys")) {
        if(resetScreen || display.textContent === '0') {
            display.textContent = '';
        }    
        value = numberList[buttonID];
        //limit the amount of numbers to be added on the screen
        if (display.textContent.length < maxDigits) {
            populateDisplay(value);   
        }
        resetScreen = false;
    }

    if(e.target.classList.contains("arithmeticKeys")) {
        if (!(typeof(currDisplayNum) === 'string')) {
            if (firstNum) {
                if (secondNum === null) {
    
                    calculate(currDisplayNum);
                    firstNum = value;
                }
            }
            else {
                firstNum = currDisplayNum;
            }
        }

        operator = operatorList[buttonID];
        resetScreen = true;
    }

    if (buttonID === 'equalsBtn') {
        if (firstNum !== null) {
            calculate(currDisplayNum);
            resetValues();
        }
    }

    if (buttonID === 'clearBtn') {
        display.textContent = '0';
        resetValues();
    }

    if (buttonID === 'decimalBtn') {
        //disable button after one click;
        if (!display.textContent.includes(".") && !resetScreen) {
            display.textContent += '.';
        }
    }

    if (buttonID === 'signBtn') {
        display.textContent = -currDisplayNum;
    }

    if (buttonID === 'percentBtn') {
        display.textContent = roundResult(currDisplayNum / 100);
    }
});
