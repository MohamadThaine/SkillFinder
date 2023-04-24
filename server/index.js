const express = require('express');
const cors = require('cors');
const register = require('./api/post/register');

const app = express();

app.use(cors());
app.use(express.json());
app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
  });

app.post('/register', register);
