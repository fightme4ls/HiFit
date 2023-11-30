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

export async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM hifit.users WHERE userID = ?", [id]);
    return rows;
}

export async function createUser(username, password, email) {
    await pool.query('INSERT INTO hifit.users (username, password, email) VALUES (?, ?, ?)',[username, password, email]);
}

