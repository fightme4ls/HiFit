var goal, runDate, weightDate, weightLength, runLength, currentWeight, distance, time, place, runNotes, weightNotes, username = "";

function showWorkoutForms(){
  fetch('/api/exercise')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

  
}
function showVideos(){
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    goal = data.goal;
    let videos
    if(goal == "Weightlifting"){
      videos = ["cuh5HsU7WQQ?si=5-VJZ4icUg3ZMJTt", "aui0gg_Zstc?si=YChOOZaFjqHcnCA2","h63JTsVdntw?si=2qCpKhG_FNrgrfPJ","__7abSf4D7Q?si=-3zpE3CR3r_WHFuM","1bP5AvsRex4?si=xxjypihQCL96Q584","qkzKd2Pk-5I?si=OaQRC9mQSz6RGz9x"]
    }else if (goal == "Running"){
      videos = ["E_qbMtUp8ck?si=WXA0nfpU2UIooSTe", "dKUZ_yqZiEc?si=L7NpFIRPp11zZA2X", "-Ot-dP1xST4?si=Kg_vkQbSJ1aaO61h", "6KBBPOlyMWw?si=SkSLHsTVAk0J4aYu", "XWXRfxhi4U8?si=8jXYkOELpOvvleg6", "RC1lrx1IhLw?si=po4tmz9dXWnNpnLU"];
    }
    var numOfVideos = 4;
    const randomNumArr = getRandomNumArr(videos.length-1);
    for (let i = 0; i < numOfVideos; i++) {
      var iframe = document.createElement("iframe");
      var iframeHTML = `<iframe id='videos' className='move' title='YouTube video player' src= "https://www.youtube.com/embed/${videos[randomNumArr[i]]}" height = '60%'' width = '49%'></iframe>`; 
      document.getElementById("videos").innerHTML += iframeHTML;
    }
  });
}

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
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    currentWeight = data.weight;
    targetWeight = data.target_weight;

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

    if(currentWeight>targetWeight){
      barWidth.style.width = ((targetWeight/currentWeight)*99 + "%");
    } else {
      barWidth.style.width = ((currentWeight/targetWeight)*99 + "%");
    }
  });
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

function getLiftFormValues(){
  liftDate = document.getElementById('liftDate').value;
  didSquat = document.getElementById('lift1').checked;
  didBench = document.getElementById('lift2').checked;
  didPullups = document.getElementById('lift3').checked;
  didDeadlift = document.getElementById('lift4').checked;
  didLegPress = document.getElementById('lift5').checked;
  console.log(liftDate);
  console.log(didSquat);
  console.log(didBench);
  console.log(didPullups);
  console.log(didDeadlift);
  console.log(didLegPress);
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
    input.name = 'exercise'; // Set the name attribute for the first input
    input1.type = 'text';
    input1.name = 'sets'; // Set the name attribute for the second input
    input2.type = 'text';
    input2.name = 'reps'; // Set the name attribute for the third input
    input3.type = 'text';
    input3.name = 'weight'; // Set the name attribute for the fourth input

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

const getRandomNumArr = (max) => {
  const numArr = [];
  while (numArr.length < max) {
      const randNum = Math.floor(Math.random() * max);
          if (numArr.indexOf(randNum) === -1) {
              numArr.push(randNum)
          }
      }
      console.log(numArr);
  return numArr;
}
