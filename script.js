let firstNum = null;
let secondNum = null;
let operator = null;
let value = null;
let resetScreen = true;
const maxDigits = 10;

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
            //deal with zero division error
            return divide(num1, num2);
    }
}

function populateDisplay(displayVal) {
    display.textContent += displayVal.toString();
}

function calculate (currDisplayNum) {
    secondNum = currDisplayNum;
    value = operate(firstNum, secondNum, operator);
    //round the value properly
    display.textContent = '';
    secondNum = null;
    resetScreen = false;
    populateDisplay(roundedValue);
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
    const currDisplayNum = parseFloat(display.textContent);

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
        if (firstNum) {
            if (secondNum === null) {

                calculate(currDisplayNum);
                firstNum = value;
            }
        }
        else {
            firstNum = currDisplayNum;
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
});
