const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Choose a port that is not in use

const connection = mysql.createConnection({
  host: 'mysql.agh.edu.pl',
  user: 'brzanad1',
  password: '81A30YwLZ0givuSR',
  database: 'brzanad1',
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define your routes and other server logic here

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
