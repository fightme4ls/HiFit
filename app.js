import express from 'express'
import path from 'path'
import { createUser, validateUser, getUserWeight, getTargetWeight} from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
let userData = {};

app.use(express.static(path.join(__dirname, 'public'), { 'extensions': ['html', 'js'] }));

app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/home', (req, res) => {
  const filePath = path.join(__dirname, 'public/home.html');
  res.sendFile(filePath);
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/create.html'));
});

app.post('/login.html', async (req, res) => {
  const username = req.body.loginUsername;
  const password = req.body.loginPassword;
  const valid = await validateUser(username, password);
  const currentWeight = await getUserWeight(username);
  const target_weight = await getTargetWeight(username);
  userData = {
    name: username,
    password: password,
    weight: currentWeight,
    targetWeight: target_weight,
    // Add more data as needed
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