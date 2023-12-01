import express from 'express'
import path from 'path'
import { createUser, validateUser} from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, 'public'), { 'extensions': ['html', 'js'] }));

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

app.post('/login.html', async (req, res) => {
  const username = req.body.loginUsername;
  const password = req.body.loginPassword;
  const valid = await validateUser(username, password);
  if(valid){
    res.redirect('/home.html');
  } else {
    res.send(`
    <script>
      alert('Invalid username or password');
      window.location.href = '/login.html'; </script>`);
  }
});

app.post('/create.html', async(req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const currentWeight = parseFloat(req.body.currentWeight);
  const targetWeight = parseFloat(req.body.targetWeight);
  const targetDate = req.body.targetDate;
  const goal = req.body.setGoal;
  if(username == "" || email == "" || password == "" || currentWeight == "" || targetWeight == "" || targetDate == ""){
    res.send(`
    <script>
      alert('You Did Not Input All Your Information, Try Again.');
      window.location.href = '/create.html'; </script>`);
  } else {
    const userCreation = await createUser(username,email,password,currentWeight,targetWeight,targetDate,goal);
    res.send(`
    <script>
      alert('Account Has Now Been Created, You may login!');
      window.location.href = '/login.html'; </script>`);
  }
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