const express = require('express');
const cors = require('cors');
const register = require('./api/post/register');
const login = require('./api/post/login');
const verifyEmail = require('./api/put/verifyAccount')
const app = express();

app.use(cors());
app.use(express.json());
app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
  });

app.post('/register', register);
app.post('/login', login);
app.put('/verify-email', verifyEmail);
