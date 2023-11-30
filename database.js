import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password', 
    database: 'hifit'
}).promise()


export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM hifit.users");
    return rows;
}

export async function getUser(email) {
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    return rows;
}

export async function validatetUser(email, password) {
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE email = ?", [email]);
    if(rows.email == email && rows.password == password){
        return true;
    } else {
        return false;
    }
}

export async function createUser(username, password, email) {
    await pool.query('INSERT INTO hifit.users (username, password, email) VALUES (?, ?, ?)',[username, password, email]);
}

