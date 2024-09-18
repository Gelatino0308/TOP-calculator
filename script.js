let firstNum = 0;
let secondNum = 0;
let operator = '';


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

const display = document.querySelector("#calc-screen");
const buttonClicked = document.querySelector("#calc-body");

buttonClicked.addEventListener("click", (e) => {
    
    const numberID = e.target.id;
    
    const numberList = {
        'zeroBtn': '0',
        'oneBtn': '1',
        'twoBtn': '2',
        'threeBtn': '3',
        'fourBtn': '4',
        'fiveBtn': '5',
        'sixBtn': '6',
        'sevenBtn': '7',
        'eightBtn': '8',
        'nineBtn': '9'
    }

    display.textContent = numberList[numberID];
});