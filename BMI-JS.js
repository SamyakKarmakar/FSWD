function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value) / 100; 
  const weight = parseFloat(document.getElementById('weight').value);
 if (!height || !weight) {
    alert("Please enter valid height and weight!");
    return;
  }
const bmi = weight / (height * height);
  document.getElementById('result').innerHTML = `Your BMI is ${bmi.toFixed(1)}`;
 displayBMIStatus(bmi);
  movePointer(bmi);
}
function displayBMIStatus(bmi) {
  const statusElement = document.getElementById('status');
  let status = "";
  if (bmi < 18.5) {
    status = "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    status = "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    status = "Overweight";
  } else {
    status = "Obese";
  }
statusElement.innerHTML = `Status: ${status}`;
}
function movePointer(bmi) {
  const pointer = document.getElementById('pointer');
  let angle = 0;
  if (bmi < 18.5) {
    angle = -90;
  } else if (bmi >= 18.5 && bmi < 25) {
    angle = 0;
  } else if (bmi >= 25 && bmi < 30) {
    angle = 45;
  } else {
    angle = 90;
  }
pointer.style.transform = `rotate(${angle}deg) translateX(-50%)`;
}
