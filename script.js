var goal = "";
var length = "";
var reps = "";
var lifts = "";
var sets = "";
var other = "";

function getFormValues(){
  goal = document.getElementById('goal').value;
  length = document.getElementById('length').value;
  reps = document.getElementById('reps').value;
  lifts = document.getElementById('lifts').value;
  sets = document.getElementById('sets').value;
  other = document.getElementById('other').value;
  updateGoal();
}

function updateGoal(){
  document.getElementById("weightGoal").innerHTML = "Your Weight Goal: " + goal;
} 