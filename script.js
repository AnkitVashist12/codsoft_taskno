document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.button');
  
  let displayValue = '0';
  let pendingValue = null;
  let operator = null;
  
  buttons.forEach(button => {
      button.addEventListener('click', (e) => {
          const value = e.target.getAttribute('data-value');
          
          if (value === 'C') {
              displayValue = '0';
              pendingValue = null;
              operator = null;
          } else if (value === '=') {
              if (operator && pendingValue !== null) {
                  displayValue = calculate(pendingValue, parseFloat(displayValue), operator).toString();
                  pendingValue = null;
                  operator = null;
              }
          } else if (['+', '-', '*', '/'].includes(value)) {
              if (operator && pendingValue !== null) {
                  displayValue = calculate(pendingValue, parseFloat(displayValue), operator).toString();
              }
              pendingValue = parseFloat(displayValue);
              operator = value;
              displayValue = '0';
          } else {
              if (displayValue === '0') {
                  displayValue = value;
              } else {
                  displayValue += value;
              }
          }
          
          display.textContent = displayValue;
      });
  });

  function calculate(a, b, operator) {
      switch (operator) {
          case '+': return a + b;
          case '-': return a - b;
          case '*': return a * b;
          case '/': return a / b;
          default: return b;
      }
  }
});
