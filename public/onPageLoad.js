// On page load, check for the username parameter and update the element

fetch('/api/user')
.then(response => response.json())
.then(data => {
  // Update the HTML content with the received data
  document.getElementById('usernameElement').innerHTML = `
    <p>Name: ${data.name}</p>
    <p>Password: ${data.password}</p>
    <p>Current Weight: ${data.weight}</p>
    <p>Target Weight: ${data.targetWeight}</p>
  `;

  var weightLeft = Math.abs(data.weight - data.targetWeight);
  if(data.weight > data.targetWeight){
      document.getElementById('progressBarNumber').innerHTML = `
      <p>${data.weight} => ${data.targetWeight}</p>
      <p>${weightLeft} lbs left to lose!</p>
      `;
  } else {
      document.getElementById('progressBarNumber').innerHTML = `
      <p>${data.weight} => ${data.targetWeight}</p>
      <p>${weightLeft} lbs left to gain!</p>
      `;
  }
  
  var barWidth = document.getElementById("healthBar");
  var currentWeight = data.weight;
  var targetWeight = data.targetWeight;
  //console.log(targetWeight)
  //console.log (currentWeight);
  if(currentWeight > targetWeight){
      barWidth.style.width = ((targetWeight/currentWeight)*100 + "%");
  } else {
      barWidth.style.width = ((currentWeight/targetWeight)*100 + "%");
  }
})
.catch(error => console.error('Error:', error));