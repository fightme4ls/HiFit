import express from 'express'
import path from 'path'
import { createUser, validateUser, getUserWeight, getTargetWeight, createRunningForm, getUsername,
  getUserID, createExerciseForm, getGoal, createWeightForm, getAllExerciseForms, getAllRunningForms} from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
let userData = {};
let weightData = {};
let exerciseForm = {};
let runningForm = {};


app.use(express.static(path.join(__dirname, 'public'), { 'extensions': ['html', 'js'] }));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/create.html', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/create.html'));
});
app.get('/home.html', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'));
});
app.get('/workout.html', async (req, res) => {
  console.log(req);
  res.sendFile(path.join(__dirname, 'public/workout.html'));
});
app.get('/past_workouts.html', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/past_workouts.html'));
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
  const targetWeight = await getTargetWeight(userData.name);
  if(weightDate == undefined && weightLength == undefined && currentWeight == undefined && weightNotes == undefined){
    if(runDate == "" || runLength == "" || distance == "" || time == "" || place == ""){
      res.send(`
      <script>
      alert('Did not input all the information.');
      window.location.href = '/home.html'; </script>`);
    } else {
      await createRunningForm(userID, runDate, runLength, distance, time, place, runNotes);
      runningForm = await getAllRunningForms(userID);
      res.redirect('/home.html');
    }
  } else {
    if(weightDate == "" || weightLength == "" || currentWeight == "" || weightNotes == ""){
      res.send(`
      <script>
      alert('Did not input all the information.');
      window.location.href = '/home.html'; </script>`);
    } else {
      await createWeightForm(userID, weightLength, weightDate, currentWeight, weightNotes);
      weightData = {
        weight: currentWeight,
        targetWeight: targetWeight,
      };
      res.redirect('/home.html');
    }
  }
});

app.post('/login.html', async (req, res) => {
  const name = req.body.loginUsername;
  const password = req.body.loginPassword;
  const valid = await validateUser(name, password);
  const currentWeight = await getUserWeight(name);
  const target_weight = await getTargetWeight(name);
  const goal = await getGoal(name);
  const userID = await getUserID(req.body.loginUsername);
  const userName = await getUsername(name);
  console.log(userID);
  runningForm = await getAllRunningForms(userID);
  exerciseForm = await getAllExerciseForms(userID);
  userData = {
    name: name,
    username: userName,
    password: password,
    weight: currentWeight,
    targetWeight: target_weight,
    goal: goal,
    // Add more data as needed
  };

  weightData = {
    weight: currentWeight,
    targetWeight: target_weight,
  };
  if(valid){
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

app.get('/api/weight', (req, res) => {
  res.json(weightData);
});

app.get('/api/exercise', (req, res) => {
  res.json(exerciseForm);
});

app.get('/api/running', (req, res) => {
  res.json(runningForm);
});

app.post('/workout.html', async(req, res) => {
  const exercises = Array.isArray(req.body.exercise) ? req.body.exercise : [req.body.exercise];
  const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
  const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
  const weights = Array.isArray(req.body.weight) ? req.body.weight : [req.body.weight];
  const date =  req.body.date;
  const userID = await getUserID(userData.name);
  var error = false;
  // Assuming that all arrays have the same length, you can iterate over one of them
  for (let i = 0; i < exercises.length; i++) {
    const exercise = exercises[i];
    const set = sets[i];
    const rep = reps[i];
    const weight = weights[i];
    if(exercise == "" || set == "" || rep == "" || weight == "" || date == ""){
      error = true;
      res.send(`
      <script>
        alert('You Did Not Input All Your Information, Try Again.');
        window.location.href = '/workout.html'; </script>`);
    } else {
      await createExerciseForm(userID, exercise, set, rep, weight, date);
    }
  }
  exerciseForm = await getAllExerciseForms(userID);
  if(error == false){
    res.redirect('/home.html');
  }
});


app.post('/create.html', async(req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.password2;
  const currentWeight = parseFloat(req.body.currentWeight);
  const targetWeight = parseFloat(req.body.targetWeight);
  const targetDate = req.body.targetDate;
  const goal = req.body.setGoal;
  if(username == "" || email == "" || password == "" || currentWeight == "" || targetWeight == "" || targetDate == ""){
    res.send(`
    <script>
      alert('You Did Not Input All Your Information, Try Again.');
      window.location.href = '/create.html'; </script>`);
  } else if(password != confirmPassword){
    res.send(`
    <script>
      alert('Your password and confirm password do not match');
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