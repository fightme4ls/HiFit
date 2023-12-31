// On page load, check for the username parameter and update the element

fetch('/api/weight')
.then(response => response.json())
.then(data => {
  // Update the HTML content with the received data
  var weightLeft = Math.abs(data.weight - data.targetWeight);
  if(data.weight > parseInt(data.targetWeight)){
      document.getElementById('progressBarNumber').innerHTML = `
      <p>${data.weight}lbs => ${data.targetWeight}lbs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${weightLeft} lbs left to lose!</p>
      `;
  } else if(data.weight == parseInt(data.targetWeight)){
    document.getElementById('progressBarNumber').innerHTML = `You have reached your goal! Congrats &#x1F604;`;
  } else {
      document.getElementById('progressBarNumber').innerHTML = `
      <p>${data.weight}lbs => ${data.targetWeight}lbs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ${weightLeft} lbs left to gain!</p>
      `;
  }
  
  var barWidth = document.getElementById("healthBar");
  var currentWeight = data.weight;
  var targetWeight = data.targetWeight;
  if(currentWeight > parseInt(data.targetWeight)){
      barWidth.style.width = ((targetWeight/currentWeight)*99 + "%");
  } else {
      barWidth.style.width = ((currentWeight/targetWeight)*99 + "%");
  }
})
.catch(error => console.error('Error:', error));

fetch('/api/user')
.then(response => response.json())
.then(data => {
  document.getElementById('userInfo').innerHTML = `
  <h4>Welcome to HiFit, ${data.username} !</h4>
  <p>We're really excited to help you on your fitness journey. 🏋️</p>
`;
})
.catch(error => console.error('Error:', error));

function checkLogin(){
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    user = data.name;
    if(user == undefined){
      switchToLoginPage();
      window.alert("You attempted to traverse through the URL while not logged in.");
    } 
  });
}