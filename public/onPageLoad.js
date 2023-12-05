// On page load, check for the username parameter and update the element

fetch('/api/weight')
.then(response => response.json())
.then(data => {
  // Update the HTML content with the received data
  document.getElementById('usernameElement').innerHTML = `
    <p>Target Weight: ${data.targetWeight}</p>
  `;
  var weightLeft = Math.abs(data.weight - data.targetWeight);
  if(data.weight > data.targetWeight){
      document.getElementById('progressBarNumber').innerHTML = `
      <p>${data.weight} => ${data.targetWeight} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${weightLeft} lbs left to lose!</p>
      `;
  } else if(data.weight == parseInt(data.targetWeight)){
    document.getElementById('progressBarNumber').innerHTML = `You have reached your goal! Congrats &#x1F604;`;
  } else {
      document.getElementById('progressBarNumber').innerHTML = `
      <p>${data.weight} => ${data.targetWeight} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ${weightLeft} lbs left to gain!</p>
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