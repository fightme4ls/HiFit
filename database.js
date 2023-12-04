import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '35.236.74.142',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'hifit'
}).promise();

export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM hifit.users");
    return rows;
}

export async function getUser(email) {
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    return rows;
}

export async function getUserID(email) {
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    if(rows.length > 0) {
        const user = rows[0];
        const storedID = user.userID; 
        return storedID;
    } 
}

export async function getGoal(email){
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    if(rows.length > 0) {
        const user = rows[0];
        return user.goal_type;
    } else {
        return false;
    }
}

export async function validateUser(email, password) {
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    if(rows.length > 0) {
        const user = rows[0];
        const storedPassword = user.password; 
        return (storedPassword == password);
    } else {
        return false;
    }
}
 
export async function getUserWeight(email){
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    if(rows.length > 0) {
        const user = rows[0];
        return user.weight;
    } else {
        return false;
    }
}

export async function getTargetWeight(email){
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    if(rows.length > 0) {
        const user = rows[0];
        return user.target_weight;
    } else {
        return false;
    }
}

export async function createUser(username, email, password, currentWeight, targetWeight, targetDate, goal) {
    try{
        await pool.query('INSERT INTO hifit.users (username, email, password, weight, target_weight, target_date, goal_type)' 
        + ' VALUES (?, ?, ?, ?, ?, ?, ?)',[username, email, password, currentWeight, targetWeight, targetDate, goal]);
        console.log("Stored properly!")
        return "Stored Successfully!";
    } catch (error) {
        // Handle errors if needed
        console.error('Error creating user:', error);
        throw error; 
    }
}

export async function createRunningForm(userID, runDate, runLength, distance, time, place, runNotes) {
    try{
        await pool.query('INSERT INTO hifit.running_log (userID, exercise_date, length, distance, time, location, notes)' 
        + ' VALUES (?, ?, ?, ?, ?, ?, ?)',[userID, runDate, runLength, distance, time, place, runNotes]);
        return "Stored Successfully!";
    } catch (error) {
        // Handle errors if needed
        console.error('Error creating user:', error);
        throw error; 
    }
}

export async function createExerciseForm(userID, exercise, set, rep, weight, date) {
    try{
        await pool.query('INSERT INTO hifit.exercise_log (userID, exerciseName, sets, reps, weight, exercise_date)' 
        + ' VALUES (?, ?, ?, ?, ?, ?)',[userID, exercise, set, rep, weight, date]);
        return "Stored Successfully!";
    } catch (error) {
        // Handle errors if needed
        console.error('Error creating user:', error);
        throw error; 
    }
}

