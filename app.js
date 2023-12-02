import express from 'express'
import path from 'path'
import fs from 'fs'
import { createUser, validateUser} from './database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const actualUsername = "";

app.use(express.static(path.join(__dirname, 'public'), { 'extensions': ['html', 'js'] }));

app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/home', (req, res) => {
  const isLoggedIn = true; 
  const filePath = path.join(__dirname, 'public/home.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const modifiedContent = data.replace('<p id="username" name="userHead">Alex Test</p>', '<p id="username" name="userHead">New Username</p>');
  });
  res.sendFile(filePath);
});

app.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/create.html'));
});

app.post('/login.html', async (req, res) => {
  actualUsername = req.body.loginUsername;
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});