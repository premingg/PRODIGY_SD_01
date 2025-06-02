let isLightTheme = false;
let conversionHistory = [];
const MAX_HISTORY_LENGTH = 5; // Maximum number of history entries to keep

function convertTemperature() {
  const temp = parseFloat(document.getElementById('temp').value);
  const unit = document.getElementById('unit').value;
  const resultDiv = document.getElementById('result');
  let output = "";

  if (isNaN(temp)) {
    resultDiv.innerHTML = "Please enter a valid number.";
    return;
  }

  let celsius, fahrenheit, kelvin;

  switch (unit) {
    case 'celsius':
      fahrenheit = (temp * 9/5) + 32;
      kelvin = temp + 273.15;
      output += `Fahrenheit: ${fahrenheit.toFixed(2)} °F<br>`;
      output += `Kelvin: ${kelvin.toFixed(2)} K`;
      break;
    case 'fahrenheit':
      celsius = (temp - 32) * 5/9;
      kelvin = celsius + 273.15;
      output += `Celsius: ${celsius.toFixed(2)} °C<br>`;
      output += `Kelvin: ${kelvin.toFixed(2)} K`;
      break;
    case 'kelvin':
      celsius = temp - 273.15;
      fahrenheit = (celsius * 9/5) + 32;
      output += `Celsius: ${celsius.toFixed(2)} °C<br>`;
      output += `Fahrenheit: ${fahrenheit.toFixed(2)} °F`;
      break;
  }

  resultDiv.innerHTML = "<strong>Results:</strong><br>" + output;
  updateHistory(temp, unit, output);
}

function updateHistory(temp, unit, output) {
  const historyDiv = document.getElementById('history');
  const historyEntry = `Converted ${temp}° ${unit.charAt(0).toUpperCase() + unit.slice(1)}: ${output}`;
  
  // Add new entry to the history
  conversionHistory.push(historyEntry);
  
  // Limit the history to the last 5 entries
  if (conversionHistory.length > MAX_HISTORY_LENGTH) {
    conversionHistory.shift(); // Remove the oldest entry
  }

  // Update the history display
  historyDiv.innerHTML = "<strong>History:</strong><br>" + conversionHistory.join("<br>");
}

function toggleTheme() {
  isLightTheme = !isLightTheme;
  document.body.classList.toggle('light', isLightTheme);
  document.querySelector('.container').classList.toggle('light', isLightTheme);
  document.querySelectorAll('button').forEach(button => {
    button.classList.toggle('light', isLightTheme);
  });
  document.querySelectorAll('.output, .history').forEach(div => {
    div.classList.toggle('light', isLightTheme);
  });

  // Update button text and icon to reflect the NEXT mode
  const themeBtn = document.getElementById('theme-toggle');
  if (isLightTheme) {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  }
}