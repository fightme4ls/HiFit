import express from 'express'
import path from 'path'
import { getUsers, getUser, createUser, validatetUser} from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.static(path.join('C:/Users/N7233/Documents/GitHub/HiFitRepo/public'), { 'extensions': ['html', 'js'] }));
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/create.html'));
});

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.post('/login.html', (req, res) => {
    res.redirect('/home.html');
});



app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
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