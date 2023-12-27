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

  var tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  var tableDiv = document.getElementById("table");
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

    var remainingAmount = loanAmount;
    for (let i = 1; i <= loanTerm; i++) {
      var newRow = tableBody.insertRow();
      var monthCell = newRow.insertCell(0);
      var loanAmountCell = newRow.insertCell(1);
      var interestCell = newRow.insertCell(2);
      var principalCell = newRow.insertCell(3);
      var remainingCell = newRow.insertCell(4);
      var EMI = newRow.insertCell(5);

      var interestPayment = remainingAmount * monthlyInterestRate;
      var principalPayment = emi - interestPayment;
      EMI.innerHTML = emi.toFixed(2);
      monthCell.innerHTML = i;
      loanAmountCell.innerHTML = "₹ " + remainingAmount.toFixed(0);
      interestCell.innerHTML = "₹ " + interestPayment.toFixed(0);
      principalCell.innerHTML = "₹ " + principalPayment.toFixed(0);
      remainingCell.innerHTML =
        "₹ " + (remainingAmount - principalPayment).toFixed(0);

      remainingAmount = remainingAmount - principalPayment;
    }
  }

  if (tableDiv.style.display === "none") {
    tableDiv.style.display = "block";
  } else {
    tableDiv.style.display = "none";
  }

  var xValues = ["AMOUNT", "INTEREST_RATE"];
  var yValues = [loanAmount, interestRate];
  var barColors = ["#b91d47", "#00aba9"];

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
  });
}
