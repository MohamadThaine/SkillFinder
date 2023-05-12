const express = require('express');
const cors = require('cors');
const register = require('./api/post/register');
const login = require('./api/post/login');
const addCategory = require('./api/post/addCategory');
const verifyEmail = require('./api/put/verifyAccount')
const approve = require('./api/put/approve');
const getApprinticeshipInfo = require('./api/get/getApprenticeshipInfo');
const getApprenticeshipPics = require('./api/get/getApprenticeshipPics');
const getAllApprenticeship = require('./api/get/getAllApprenticeship');
const getAllUsers = require('./api/get/getAllUsers');
const getAllCategories = require('./api/get/getAllCategories');
const resetPassword = require('./api/post/resetPassword');
const deleteApprenticeship = require('./api/delete/deleteApprenticeship');
const rejectOwner = require('./api/delete/rejectOwner');
const deactiveUser = require('./api/delete/deactiveUser');
const deleteCatogry = require('./api/delete/deleteCategory');
const app = express();

app.use(express.static('public'));



app.use(cors());
app.use(express.json());







app.listen(5000, () => {
    console.log(`Server is running on port 5000.`);
  });



app.post('/register', register);
app.post('/login' ,login);
app.post('/addCategory', addCategory);
app.post('/checkEmail', resetPassword.checkEmail);
app.put('/verify-email', verifyEmail);
app.put('/approve/apprenticeship/:id', approve.approveApprenticeship);
app.put('/approve/owner/:id', approve.approveOwner);
app.put('/resetPassword', resetPassword.resetPassword)
app.put('/editCategory/:id', require('./api/put/editCategory'));
app.get('/apprenticeship/:id', getApprinticeshipInfo);
app.get('/apprenticeship-pics/:id', getApprenticeshipPics);
app.get('/apprenticeships/:isApproved', getAllApprenticeship);
app.get('/categories', getAllCategories);
app.get('/users/:isApproved',getAllUsers);
app.delete('/deleteApprenticeship/:id', deleteApprenticeship);
app.delete('/rejectOwner/:id', rejectOwner);
app.delete('/deactiveUser/:id', deactiveUser);
app.delete('/deleteCategory/:id', deleteCatogry);
