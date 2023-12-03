var goal, runDate, weightDate, weightLength, runLength, currentWeight, distance, time, place, runNotes, weightNotes, username = "";

function getRunFormValues(){
    runDate = document.getElementById('runDate').value;
    runLength = document.getElementById('runLength').value;
    distance = document.getElementById('distance').value;
    time = document.getElementById('time').value;
    place = document.getElementById('place').value;
    runNotes = document.getElementById('runNotes').value;
    console.log(runDate);
    console.log(runLength);
    console.log(distance);
    console.log(time);
    console.log(place);
    console.log(runNotes);
}

function moveBar() {
  var barWidth = document.getElementById("healthBar");
  var currentWeight = 140;
  var targetWeight = 150;
  console.log (currentWeight);
  if(currentWeight>targetWeight){
    barWidth.style.width = ((targetWeight/currentWeight)*100 + "%");
  } else {
    barWidth.style.width = ((currentWeight/targetWeight)*100 + "%");
  }
}

function getWeightFormValues(){
  weightDate = document.getElementById('weightDate').value;
  weightLength = document.getElementById('weightLength').value;
  currentWeight = document.getElementById('currentWeight').value;
  weightNotes = document.getElementById('weightNotes').value;
  console.log(weightDate);
  console.log(weightLength);
  console.log(currentWeight);
  console.log(weightNotes);
}

function storeUsername(){
  username = document.getElementById('loginUsername').value;
  localStorage.setItem('username', username);
  console.log(username);
}

function updateGoal(){
  document.getElementById("weightGoal").innerHTML = "Your Weight Goal: " + goal;
} 

function swapFormToWeight(){
  document.getElementById("weightInputs").style.display = 'block';
  document.getElementById("runInputs").style.display = "none";
  document.getElementById("placeholder").style.display = "none";
}

function swapFormToRun(){
  document.getElementById("runInputs").style.display = "block";
  document.getElementById("weightInputs").style.display = "none";
  document.getElementById("placeholder").style.display = "none";
}