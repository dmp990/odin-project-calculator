const display = document.querySelector(".display p");
const buttons = document.querySelectorAll(".button-array button");

let string = "";
let number1 = null;
let number2 = null;
let operator1 = null;
let operator2 = null;
let current_eval = null;

buttons.forEach((button) => {
  if (button.classList.contains("type-one-button")) {
    if (button.classList.contains("operator")) {
      button.addEventListener("click", (e) => {
        let value = e.target.textContent;
        if (operator1 == null) {
          operator1 = value;
        } else if (operator2 == null) {
          operator2 = value;
        } else {
          number1 = operate(operator1, number1, number2);
          number2 = string;
          operator1 = operator2;
          operator2 = value;
        }
        if (number1 == null) {
          number1 = string;
        } else {
          number2 = string;
          current_eval = number1 + number2;
        }
        string = "";
        populateDisplay(value);

        //console.log("Operator pressed. State:", getState());
      });
    } else {
      button.addEventListener("click", (e) => {
        let value = e.target.textContent;
        string += value;
        populateDisplay(string);
        //console.log("Other button pressed. State:", getState());
      });
    }
  } else if (button.classList.contains("equal-button")) {
    button.addEventListener("click", (e) => {
      if (operator2 == null) {
        let value = operate(operator1, number1, string);
        if (isNaN(value)) {
            populateDisplay("Error");
            return;
        }
        populateDisplay(value);
      } else {
        intermediary = operate(operator1, number1, number2);

        string = operate(operator2, intermediary, string);
        //console.log("Equal pressed. State:", getState());
        populateDisplay(string);
      }
      string = "";
      number1 = null;
      number2 = null;
      operator1 = null;
      operator2 = null;
    });
    
  } else if (button.classList.contains("ac-button")) {
    button.addEventListener("click", (e) => {
      //console.log("ac button presesd");
      string = "";
      number1 = null;
      number2 = null;
      operator1 = null;
      operator2 = null;
      populateDisplay(0);
      //console.log("ac pressed. State:", getState());
    });
  } else if (button.classList.contains("toggle-negation-button")) {
    button.addEventListener("click", (e) => {
      tmp =
        string === ""
          ? null
          : string[0] === "-"
          ? string.slice(1)
          : "-" + string;

      if (tmp != null) {
        string = tmp;
      }
      populateDisplay(tmp);
    });
  }
});

function populateDisplay(value) {
  display.innerText = value == null ? 0 : value;
}

function getState() {
  return `Op1: ${operator1} Op2: ${operator2}, n1: ${number1}, n2: ${number2}, str: ${string}`;
}

function add(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  //console.log("Adding: ", num1, " and ", num2, "to produce: ", num1 + num2);
  return num1 + num2;
}

function subtract(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  return num1 - num2;
}

function multiply(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  return Number.parseFloat(num1 * num2).toFixed(3);
}

function divide(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (num2 === 0) {
    return "eRrOr";
  }
  return Number.parseFloat(num1 / num2).toFixed(3);
}

function modulus(num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  return Number.parseFloat(num1 % num2).toFixed(3);
}

function operate(operator, number1, number2) {
  if (operator === "+") {
    return add(number1, number2);
  } else if (operator === "-") {
    return subtract(number1, number2);
  } else if (operator === "*") {
    return multiply(number1, number2);
  } else if (operator === "/") {
    return divide(number1, number2);
  } else if (operator === "%") {
    return modulus(number1, number2);
  }
}
