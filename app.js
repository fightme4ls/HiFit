import express from 'express'
import path from 'path'
import { getUsers, getUser, createUser} from './database.js';

const app = express();

app.get('/', async (req, res) => {
  res.sendFile(path.join('C:/Users/N7233/Documents/GitHub/HiFitRepo//main.html'));
});


app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080, () => {
  console.log('Server is running on port 8080');
})


var goal, output, length, reps, lifts, sets, other, text = "";

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