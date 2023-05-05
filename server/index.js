const express = require('express');
const cors = require('cors');
const register = require('./api/post/register');
const login = require('./api/post/login');
const verifyEmail = require('./api/put/verifyAccount')
const getApprinticeshipInfo = require('./api/get/getApprenticeshipInfo');
const getApprenticeshipPics = require('./api/get/getApprenticeshipPics');
const resetPassword = require('./api/post/resetPassword');
const path = require('path');
const app = express();

app.use(express.static('public'));



app.use(cors());
app.use(express.json());







app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
  });

app.post('/register', register);
app.post('/login', login);
app.post('/checkEmail', resetPassword.checkEmail);
app.put('/verify-email', verifyEmail);
app.put('/resetPassword', resetPassword.resetPassword)
app.get('/apprenticeship/:id', getApprinticeshipInfo);
app.get('/apprenticeship-pics/:id', getApprenticeshipPics);
