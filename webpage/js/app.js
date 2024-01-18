// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/my-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model('User', {
  email: String,
  password: String
});

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { newEmail, newPassword } = req.body;

  try {
    // new user in the database
    const newUser = new User({
      email: admin,
      password: admin
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
