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
  //console.log (currentWeight);
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
  document.getElementById("workoutPageButton").style.display = "block";
}

function swapFormToRun(){
  document.getElementById("runInputs").style.display = "block";
  document.getElementById("weightInputs").style.display = "none";
  document.getElementById("placeholder").style.display = "none";
  document.getElementById("workoutPageButton").style.display = "none";
}

function resetForm(){
    document.getElementById("runInputs").style.display = "none";
    document.getElementById("weightInputs").style.display = "none";
    document.getElementById("placeholder").style.display = "block";
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

function addWorkout() {
    var table = document.getElementById("workoutTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var input = document.createElement('input');
    var input1 = document.createElement('input');
    var input2 = document.createElement('input');
    var input3 = document.createElement('input');
    input.type = 'text';
    input1.type = 'text';
    input2.type = 'text';
    input3.type = 'text';
    cell1.appendChild(input);
    cell2.appendChild(input1);
    cell3.appendChild(input2);
    cell4.appendChild(input3);
  }

  function removeWorkout() {
    var table = document.getElementById("workoutTable");
    if (table.rows.length > 1) {
      table.deleteRow(1);
    }
  }

  var date = "";
  function getInputs() {
    date = document.getElementById("date").value;
    console.log(date);
    var table = document.getElementById("workoutTable");
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      var exercise = cells[0].getElementsByTagName("input")[0].value;
      var sets = cells[1].getElementsByTagName("input")[0].value;
      var reps = cells[2].getElementsByTagName("input")[0].value;
      var weight = cells[3].getElementsByTagName("input")[0].value;
      console.log("Exercise: " + exercise + ", Sets: " + sets + ", Reps: " + reps + ", Weight: " + weight);
    }
  }