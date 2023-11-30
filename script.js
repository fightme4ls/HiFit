var goal = "";
var output = "";
var length = "";
var reps = "";
var lifts = "";
var sets = "";
var other = "";
var text = "";

function getFormValues(){
  goal = document.querySelector('#dropdown').value;
  length = document.getElementById('length').value;
  reps = document.getElementById('reps').value;
  lifts = document.getElementById('lifts').value;
  sets = document.getElementById('sets').value;
  other = document.getElementById('other').value;
  console.log(goal);
  updateGoal();
}

function updateGoal(){
  document.getElementById("weightGoal").innerHTML = "Your Weight Goal: " + goal;
} 