const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
//const {use} = require("express/lib/router");

const app = express();
const port = 3000; // Choose a port that is not in use
app.use(cors());
app.use(bodyParser.json());

const databaseConnection = mysql.createConnection({
  host: 'mysql.agh.edu.pl',
  user: 'anitkauz',
  password: 'PqYpNrTXx2VzjxmB',
  database: 'anitkauz',
  port: 3306,
});

databaseConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log('New user trying to register:', username, password);

  /* Empty password or username safety mechanism */
  if (!username || !password) {
    res.status(400).send();
    console.log('New user tried to register with empty username or password');
    return;
  }

  /* Checking if username already exists in database */
  const sqlCheck = 'SELECT * FROM users WHERE username = ?';
  databaseConnection.query(sqlCheck, [username], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking username in the database:', checkErr);
      res.status(500).send();
      return;
    }

    /* If there are rows in the result the username already exists */
    if (checkResult.length > 0) {
      console.log('New user username is already taken:', username);
      res.status(409).send();
      return;
    }

    /* Proceed with user registration if we got to this point */
    const sqlInsert = 'INSERT INTO users (username, password) VALUES (?, ?)';
    databaseConnection.query(sqlInsert, [username, password], (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send();
        return;
      }
      console.log('New user account created!');
      res.status(200).send();
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  databaseConnection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Error logging in');
      return;
    }

    if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
