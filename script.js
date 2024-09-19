let firstNum = null;
let secondNum = null;
let operator = null;
let value = null;
let resetScreen = true;

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
    display.textContent += displayVal.toString();
}

function calculate (currDisplayNum) {
    secondNum = currDisplayNum;
    value = operate(firstNum, secondNum, operator);

    display.textContent = '';
    secondNum = null;
    resetScreen = false;
    populateDisplay(value);
}


buttonClicked.addEventListener("click", (e) => {
    
    const buttonID = e.target.id;
    let currDisplayNum = parseInt(display.textContent);

    if (e.target.classList.contains("numberKeys")) {

        if(resetScreen || display.textContent === '0') {
            display.textContent = '';
        }    

        value = numberList[buttonID];
        populateDisplay(value);
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
            firstNum = null;
        }
    }

    if (buttonID === 'clearBtn') {
        display.textContent = '0';
        firstNum = null;
        secondNum = null;
        operator = null;
        value = null;
        resetScreen = true;
    } 
});
