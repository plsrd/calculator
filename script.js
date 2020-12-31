//single function buttons
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const positiveNegativeButton = document.querySelector('[data-plus-minus]');
//get all operator buttons
const operatorButtons = document.querySelectorAll('[data-operator]');
const numberButtons = document.querySelectorAll('[data-number]');
//operand text elements
const previousOperandTextElement = document.querySelector('[data-previous]');
const currentOperandTextElement = document.querySelector('[data-current');

let previousOperand = '';
let currentOperand = '';
let operation;

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (previousOperand != "Nice try, loser") {
    if (operation != undefined) {
    previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
      previousOperandTextElement.innerText = previousOperand;
    } 
  }
}

function del() {
  currentOperand = currentOperand.slice(0, -1);
}

function clear() {
  operation = undefined;
  previousOperand = '';
  currentOperand = '';
}

function positiveNegative() {
  currentOperand = parseFloat(currentOperand);
  if (currentOperand > 0) {
    currentOperand = `-${currentOperand.toString()}`;
  } else if (currentOperand < 0) {
    currentOperand = (currentOperand * -1);
    currentOperand = `${currentOperand.toString()}`;
  }
}

function appendInput(number) {
  if (number === '.' && currentOperand.includes('.')) return
  if (currentOperand.length < 9) {
    currentOperand += number.toString();
  }
}

function  getDisplayNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

function chooseOperator(operator){
  if (currentOperand === '') return
  if (previousOperand !== '') {
    compute(previousOperand[previousOperand.length-1]);
  }
  operation = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) { return }
  if (current === 0) {
    previousOperand = 'Nice try, loser!';
  } else {
      switch (operation) {
      case '+' :
        computation = prev + current;
      break;
      case '-' :
        computation = prev - current;
      break;
      case '÷' :
        computation = prev / current;
      break;
      case 'x' :
        computation = prev * current;
      break;
      default:
        return
    }
  currentOperand = computation.toString();
  previousOperand = '';
  }
  operation = undefined;

}

function inputKeyNumber(e) {
  appendInput(e);
  updateDisplay();
}

function inputKeyOperator(e) {
  chooseOperator(e);
  updateDisplay();
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    appendInput(button.innerText);
    updateDisplay();
  })
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    chooseOperator(button.innerText);
    updateDisplay();
  })
});

clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener('click', () => {
  del();
  updateDisplay();
});

positiveNegativeButton.addEventListener('click', () => {
  positiveNegative();
  updateDisplay();
});

equalsButton.addEventListener('click', () => {
  compute(previousOperand[previousOperand.length-1]);
  updateDisplay();
})

window.addEventListener('keydown', (e) => {
  switch(e.keyCode) {
    case 49 :
      inputKeyNumber(1);
      break;
    case 50 :
      inputKeyNumber(2);
      break;
    case 51 :
      inputKeyNumber(3);
      break;
    case 52 :
      inputKeyNumber(4);
      break;
    case 53 :
      inputKeyNumber(5);
      break;
    case 54 :
      inputKeyNumber(6);
      break;
    case 55 :
      inputKeyNumber(7);
      break;
    case 56 :
      inputKeyNumber(8);
      break;
    case 57 :
      inputKeyNumber(9);
      break;
    case 48 :
      inputKeyNumber(0);
      break;
    case 190 :
      inputKeyNumber('.');
      break;
    case 8 :
      del();
      updateDisplay();
      break;
    case 67 :
      clear();
      updateDisplay();
      break;
    case 191 :
      inputKeyOperator('÷');
      break;
    case 88 :
      inputKeyOperator('x');
      break;
    case 189 :
      inputKeyOperator('-');
      break;
    case 187 :
      inputKeyOperator('+');
      break;
    case 13 :
      compute(previousOperand[previousOperand.length-1]);
      updateDisplay();
      break;
    case 16 :
      positiveNegative();
      updateDisplay();
      break;
  }
})




