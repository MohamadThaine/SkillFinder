const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const register = require('./api/post/register');
const login = require('./api/post/login');
const addCategory = require('./api/post/addCategory');
const verifyEmail = require('./api/put/verifyAccount')
const approve = require('./api/put/approve');
const uploadProfilePicture = require('./api/put/uploadProfilePicture');
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
const deleteFiles = require('./utils/deleteFiles');
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const apprenticeshipPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `public/ApprenticeshipPicture/${req.params.ID}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const OwnerPicturesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `public/OwnerPictures/${req.params.ID}`;
    fs.mkdirSync(folderPath, { recursive: true });
    const fileExtension = file.originalname.split('.').pop();
    deleteFiles(folderPath, `${req.params.ID}.${fileExtension}`);
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${req.params.ID}.${fileExtension}`)
  }
})

const OwnerCVStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `public/OwnerCVs/${req.headers.username}`;
    fs.mkdirSync(folderPath, { recursive: true });
    const fileExtension = file.originalname.split('.').pop();
    deleteFiles(folderPath, `${req.headers.username}.${fileExtension}`);
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${req.headers.username}.${fileExtension}`)
  }
})


const uploadAppImgs = multer({ storage: apprenticeshipPictureStorage }).array('file')

const uploadOwnerImgs = multer({
  limits: { fieldSize: 1024 * 1024 * 5 },
  storage: OwnerPicturesStorage
}).single('file');

const uploadOwnerCV = multer({
  limits: { fieldSize: 1024 * 1024 * 5 },
  storage: OwnerCVStorage
}).single('file');

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});



app.post('/register', uploadOwnerCV ,register);
app.post('/login', login);
app.post('/addCategory', addCategory);
app.post('/checkEmail', resetPassword.checkEmail);
app.put('/verify-email', verifyEmail);
app.put('/approve/apprenticeship/:id', approve.approveApprenticeship);
app.put('/approve/owner/:id', approve.approveOwner);
app.put('/resetPassword', resetPassword.resetPassword)
app.put('/editCategory/:id', require('./api/put/editCategory'));
app.put('/uploadProfilePicture/:ID', uploadOwnerImgs, uploadProfilePicture);
app.get('/apprenticeship/:id', getApprinticeshipInfo);
app.get('/apprenticeship-pics/:id', getApprenticeshipPics);
app.get('/apprenticeships/:isApproved', getAllApprenticeship);
app.get('/categories', getAllCategories);
app.get('/users/:isApproved', getAllUsers);
app.delete('/deleteApprenticeship/:id', deleteApprenticeship);
app.delete('/rejectOwner/:id', rejectOwner);
app.delete('/deactiveUser/:id', deactiveUser);
app.delete('/deleteCategory/:id', deleteCatogry);
