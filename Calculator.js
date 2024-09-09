const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'AC') {
      currentInput = '';
      previousInput = '';
      operator = '';
    } else if (value === '+/-') {
      currentInput = currentInput * -1;
    } else if (value === '%') {
      currentInput = currentInput / 100;
    } else if (value === '=' && operator && previousInput !== '' && currentInput !== '') {
      calculate();
    } else if (value === '.' && !currentInput.includes('.')) {
      currentInput += value;
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (operator && currentInput !== '') {
        calculate();
      }
      previousInput = currentInput;
      currentInput = '';
      operator = value;
    } else if (value !== '') {
      currentInput += value;
    }
    
    if (value !== '=') {
      display.value = previousInput + operator + currentInput;
    }
  });
});

function calculate() {
  let result;

 
  if (operator === '/' && currentInput === '0') {
    display.value = 'Error: Division by zero';
    currentInput = '';
    return;
  }

  try {

    result = eval(previousInput + operator + currentInput);
  } catch (error) {

    display.value = 'Error: Invalid expression';
    currentInput = '';
    return;
  }


  if (!isFinite(result)) {
    display.value = 'Error: Overflow or underflow';
    currentInput = '';
    return;
  }


  currentInput = result.toString();
  previousInput = '';
  operator = '';


  display.value = currentInput;
}
