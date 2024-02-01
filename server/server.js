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
      /* Obtain user id */
      const userID = result.insertId;

      /* Send back user id */
      console.log('New user account created! userID:', userID);
      res.status(200).json({ userID });
    });
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('User trying to log in:', username, password);

  /* Sql query for logging in */
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  databaseConnection.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send();
      return;
    }

    /* If there is such username-password combination in database */
    if (result.length > 0) {
      /* Obtain userID */
      const userID = result[0].user_id;
      console.log('User:', username, 'logged in with ID:', userID);
      /* Send back userID */
      res.status(200).json({ userID });
    } else {
      console.log('User provided invalid password:', username);
      res.status(401).send();
    }
  });
});


app.get('/getTasks', (req, res) => {
  const userID = req.query.userID;
  console.log('User:', userID, 'is trying to fetch tasks');

  /* 'tasks' table with columns 'task_id', 'user_id', 'task_name', 'completed' */
  const sql = `SELECT * FROM tasks WHERE user_id = ?`;
  databaseConnection.query(sql, [userID], (error, results) => {
    if (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User:', userID, 'fetched tasks successfully');
      res.json(results);
    }
  });
});


app.post('/addTask', (req, res) => {
  const userID = req.query.userID;
  const { taskName, completed } = req.body;
  console.log('User:', userID, 'is trying to add new task');

  /* Insert new task into the 'tasks' table */
  const sql = 'INSERT INTO tasks (user_id, task_name, completed) VALUES (?, ?, ?)';
  const values = [userID, taskName, completed];
  databaseConnection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error adding task to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newTaskID = results.insertId;
      console.log('User:', userID, 'added new task:', newTaskID);
      res.status(200).json({ taskID: newTaskID, task_name: taskName, completed });
    }
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
