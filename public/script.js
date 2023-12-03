var goal, runDate, weightDate, weightLength, runLength, currentWeight, distance, time, place, runNotes, weightNotes = "";

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

function updateGoal(){
  document.getElementById("weightGoal").innerHTML = "Your Weight Goal: " + goal;
} 

function swapFormToWeight(){
  document.getElementById("weightInputs").style.display = 'block';
  document.getElementById("runInputs").style.display = "none";
  document.getElementById("placeholder").style.display = "none";
  document.getElementById("workoutPageButton").style.display = "block";
}

function swapFormToRun(){
  document.getElementById("runInputs").style.display = "block";
  document.getElementById("weightInputs").style.display = "none";
  document.getElementById("placeholder").style.display = "none";
  document.getElementById("workoutPageButton").style.display = "none";
}

function switchToCreateAccountPage() {
    window.location.href = "create.html";
}
function bypass() {
    window.location.href = "home.html";
}

function switchToLoginPage() {
    window.location.href = "login.html";
}


function getFormValues() {

    switchToLoginPage();
}

function switchToWorkoutPage() {
    window.location.href = "workout.html";
}