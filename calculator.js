let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operator = null;
let waitingForOperand = false;

function updateDisplay() {
  display.value = currentValue;
}

function appendNumber(num) {
  if (waitingForOperand) {
    currentValue = num;
    waitingForOperand = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  updateDisplay();
}

function appendDecimal() {
  if (waitingForOperand) {
    currentValue = '0.';
    waitingForOperand = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operator && !waitingForOperand) {
    calculate();
  }
  previousValue = currentValue;
  operator = op;
  waitingForOperand = true;
}

function calculate() {
  if (!operator || waitingForOperand) return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 'Error';
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  waitingForOperand = true;
  updateDisplay();
}

function clearDisplay() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  waitingForOperand = false;
  updateDisplay();
}

function toggleSign() {
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay();
}

function percentage() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    appendNumber(key);
  } else if (key === '.') {
    appendDecimal();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendOperator(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Escape' || key === 'c' || key === 'C') {
    clearDisplay();
  } else if (key === 'Backspace') {
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    updateDisplay();
  }
});
