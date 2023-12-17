function calculateEMI() {
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);
  var interestRate = parseFloat(document.getElementById("interestRate").value);
  var loanTerm = parseFloat(document.getElementById("loanTerm").value);
  var calculator_container = document.getElementById("calculator-container");
  var monthlyInterestRate = interestRate / (12 * 100);
  var denominator = Math.pow(1 + monthlyInterestRate, loanTerm) - 1;
  var powerFactor = Math.pow(1 + monthlyInterestRate, loanTerm);
  var emi = (loanAmount * monthlyInterestRate * powerFactor) / denominator;

  var resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "EMI: INR " + emi.toFixed(2) + " per month";

  if (
    isNaN(loanAmount) ||
    isNaN(interestRate) ||
    isNaN(loanTerm) ||
    loanAmount <= 0 ||
    interestRate <= 0 ||
    loanTerm <= 0
  ) {
    resultContainer.innerHTML = "Invalid Input";
    calculator_container.style.color = "red";
  } else {
    calculator_container.style.color = "black";
  }
}
s;
