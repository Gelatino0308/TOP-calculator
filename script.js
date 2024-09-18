let firstNum = null;
let secondNum = null;
let operator = null;
let value = null;

const display = document.querySelector("#calc-screen");
const buttonClicked = document.querySelector("#calc-body");

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

function operate(firstNum, secondNum, operator) {

    switch(operator) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
    }
}

function populateDisplay(displayVal) {
    display.textContent += displayVal.toString();
    firstNum === null || firstNum === 0? firstNum = value : secondNum = value;
}


buttonClicked.addEventListener("click", (e) => {
    
    const buttonID = e.target.id;

    if(firstNum === null || firstNum === 0) {
        display.textContent = '';
    }

    if (e.target.classList.contains("numberKeys")) {
        value = numberList[buttonID];
        populateDisplay(value);
    }

    if(e.target.classList.contains("arithmeticKeys")) {
        operator = operatorList[buttonID];
    }
});

