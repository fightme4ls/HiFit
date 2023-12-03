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
        return "Stored Successfully!";
    } catch (error) {
        // Handle errors if needed
        console.error('Error creating user:', error);
        throw error; 
    }
}

