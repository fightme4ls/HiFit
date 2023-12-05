import express from 'express'
import path from 'path'
import { createUser, validateUser, getUserWeight, getTargetWeight, createRunningForm, getUserID, createExerciseForm, getGoal} from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { create } from 'domain';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
var authenticated = false;
let userData = {};

app.use(express.static(path.join(__dirname, 'public'), { 'extensions': ['html', 'js'] }));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/home.html', async (req, res) =>{
  const weightDate = req.body.weightDate;
  const weightLength = req.body.weightLength;
  const currentWeight = req.body.currentWeight;
  const weightNotes = req.body.weightNotes;

  const runDate = req.body.runDate;
  const runLength = req.body.runLength;
  const distance = req.body.distance; 
  const time = req.body.time; 
  const place = req.body.place; 
  const runNotes = req.body.runNotes;
  const userID = await getUserID(userData.name);

  await createRunningForm(userID, runDate, runLength, distance, time, place, runNotes);
  res.redirect('/home.html');
});

app.post('/login.html', async (req, res) => {
  const username = req.body.loginUsername;
  const password = req.body.loginPassword;
  const valid = await validateUser(username, password);
  const currentWeight = await getUserWeight(username);
  const target_weight = await getTargetWeight(username);
  const goal = await getGoal(username);
  userData = {
    name: username,
    password: password,
    weight: currentWeight,
    targetWeight: target_weight,
    goal: goal,
    // Add more data as needed
  };

  if(valid){
    authenticated = true; 
    res.redirect('/home.html');
  } else {
    res.send(`
    <script>
      alert('Invalid username or password');
      window.location.href = '/login.html'; </script>`);
  }
});


app.get('/api/user', (req, res) => {
  res.json(userData);
});

app.post('/workout.html', async(req, res) => {
  const exercises = Array.isArray(req.body.exercise) ? req.body.exercise : [req.body.exercise];
  const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
  const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
  const weights = Array.isArray(req.body.weight) ? req.body.weight : [req.body.weight];
  const date =  req.body.date;
  const userID = await getUserID(userData.name);
  // Assuming that all arrays have the same length, you can iterate over one of them
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const set = sets[i];
    const rep = reps[i];
    const weight = weights[i];
    if(exercise == "" || set == "" || rep == "" || weight == "" || date == ""){
      res.send(`
      <script>
        alert('You Did Not Input All Your Information, Try Again.');
        window.location.href = '/workout.html'; </script>`);
    } else {
      await createExerciseForm(userID, exercise, set, rep, weight, date);
    }
  }
  res.redirect('/home.html');
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
    await createUser(username,email,password,currentWeight,targetWeight,targetDate,goal);
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});