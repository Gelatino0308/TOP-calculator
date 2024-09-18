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

    switch(numberID) {
        case 'zeroBtn':
            display.textContent = '0';
            break;
        case 'oneBtn':
            display.textContent = '1';
            break;
        case 'twoBtn':
            display.textContent = '2';
            break;
        case 'threeBtn':
            display.textContent = '3';
            break;
        case 'fourBtn':
            display.textContent = '4';
            break;
        case 'fiveBtn':
            display.textContent = '5';
            break;
        case 'sixBtn':
            display.textContent = '6';
            break;
        case 'sevenBtn':
            display.textContent = '7';
            break;
        case 'eightBtn':
            display.textContent = '8';
            break;
        case 'nineBtn':
            display.textContent = '9';
            break;
    }
});