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
  const { email, password } = req.body;
  console.log('New user trying to register:', email, password);

  /* Empty password or email safety mechanism */
  if (!email || !password) {
    res.status(400).send();
    console.log('New user tried to register with empty email or password');
    return;
  }

  /* Checking if email already exists in database */
  const sqlCheck = 'SELECT * FROM users WHERE email = ?';
  databaseConnection.query(sqlCheck, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking email in the database:', checkErr);
      res.status(500).send();
      return;
    }

    /* If there are rows in the result the email already exists */
    if (checkResult.length > 0) {
      console.log('New user email is already taken', email);
      res.status(409).send();
      return;
    }

    /* Proceed with user registration if we got to this point */
    const sqlInsert = 'INSERT INTO users (email, password) VALUES (?, ?)';
    databaseConnection.query(sqlInsert, [email, password], (err, result) => {
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
