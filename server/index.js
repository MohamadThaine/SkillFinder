const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const socket = require('socket.io')
const register = require('./api/post/register');
const login = require('./api/post/login');
const addCategory = require('./api/post/addCategory');
const addApprenticeship = require('./api/post/addApprenticeship');
const addAddress = require('./api/post/addAddress');
const verifyEmail = require('./api/put/verifyAccount')
const approve = require('./api/put/approve');
const uploadProfilePicture = require('./api/put/uploadProfilePicture');
const getApprinticeshipInfo = require('./api/get/getApprenticeshipInfo');
const getApprenticeshipPics = require('./api/get/getApprenticeshipPics');
const getAllApprenticeship = require('./api/get/getAllApprenticeship');
const getAllUsers = require('./api/get/getAllUsers');
const getAllCategories = require('./api/get/getAllCategories');
const getAddresses = require('./api/get/getAddress');
const resetPassword = require('./api/post/resetPassword');
const deleteApprenticeship = require('./api/delete/deleteApprenticeship');
const rejectOwner = require('./api/delete/rejectOwner');
const deactiveUser = require('./api/delete/deactiveUser');
const deleteCatogry = require('./api/delete/deleteCategory');
const deleteFiles = require('./utils/deleteFiles');
const deleteFile = require('./utils/deleteFile');
const sendEnrollRequest = require('./api/post/sendEnrollRequest');
const getEnrollRequests = require('./api/get/getEnrollRequests');
const editApprenticeship = require('./api/put/editApprenticeship');
const acceptEnrollRequest = require('./api/put/acceptEnrollRequest');
const editCategory = require('./api/put/editCategory');
const rejectEnrollRequest = require('./api/put/rejectEnrollRequest');
const updateUserData = require('./api/put/updateUserData');
const checkUniqueEmail = require('./api/get/checkUniqueEmail');
const checkuniquePhone = require('./api/get/checkuUniqePhone');
const updateUserPassword = require('./api/put/updateUserPassword');
const searchApprenticeships = require('./api/get/searchApprenticeships');
const addReview = require('./api/post/addReview');
const createChat = require('./api/post/createChat');
const getChats = require('./api/get/getChats');
const getMessages = require('./api/get/getMessages');
const sendMessage = require('./api/post/sendMessage');
const getUserApprenticeships = require('./api/get/getUserApprenticeships');
const getAnnouncements = require('./api/get/getAnnouncements');
const addAnnouncement = require('./api/post/addAnnouncement');
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

const ApprenticeshipPictureStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `public/ApprinticeshipPictures/${req.headers.foldername}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    deleteFile(`public/ApprinticeshipPictures/${req.headers.foldername}`, file.originalname);
    cb(null, file.originalname);
  }
});

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
    if (req.headers.isowner === 'false') return cb(null, null);
    const folderPath = `public/OwnerCVs/${req.headers.verifytoken}`;
    fs.mkdirSync(folderPath, { recursive: true });
    const fileExtension = file.originalname.split('.').pop();
    deleteFiles(folderPath, `${req.headers.username}.${fileExtension}`);
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    if (req.headers.isowner === 'false') return cb(null, null);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${req.headers.verifytoken}.${fileExtension}`)
  }
})


const uploadAppImgs = multer({
  limits: { fieldSize: 1024 * 1024 * 5 },
  storage: ApprenticeshipPictureStorage
}).array('pictures')

const uploadOwnerImgs = multer({
  limits: { fieldSize: 1024 * 1024 * 5 },
  storage: OwnerPicturesStorage
}).single('file');

const uploadOwnerCV = multer({
  limits: { fieldSize: 1024 * 1024 * 5 },
  storage: OwnerCVStorage
}).single('file');

const server = app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});

const io = socket(server, {
  cors: {
    origin: '*',
    credential:true
  }
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  socket.on('join', (userID) => {
    onlineUsers.set(userID, socket.id);
    console.log(onlineUsers);
  });

  socket.on('disconnect', () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });

  socket.on('sendMessage', (message) => {
    const reciverID = message.Receiver_ID;
    const reciverSocketID = onlineUsers.get(reciverID);
    if (reciverSocketID) {
      socket.to(reciverSocketID).emit('reciveMessage', message);
    }
  });

});



app.post('/register', uploadOwnerCV, register);
app.post('/login', login);
app.post('/addCategory', addCategory);
app.post('/checkEmail', resetPassword.checkEmail);
app.post('/addApprenticeship', uploadAppImgs, addApprenticeship);
app.post('/addAddress', addAddress);
app.post('/sendEnrollRequest', sendEnrollRequest);
app.post('/addReview', addReview);
app.post('/createChat', createChat);
app.post('/sendMessage', sendMessage);
app.post('/addAnnouncement', addAnnouncement);
app.put('/verify-email', verifyEmail);
app.put('/approve/apprenticeship/:id', approve.approveApprenticeship);
app.put('/approve/owner/:id', approve.approveOwner);
app.put('/resetPassword', resetPassword.resetPassword)
app.put('/editCategory/:id', editCategory);
app.put('/uploadProfilePicture/:ID', uploadOwnerImgs, uploadProfilePicture);
app.put('/editApprenticeship/:id', uploadAppImgs, editApprenticeship);
app.put('/acceptRequest/:id/:appID', acceptEnrollRequest);
app.put('/rejectRequest/:id/:appID', rejectEnrollRequest);
app.put('/updateUser/:id', updateUserData)
app.put('/updateUserPassword/:id', updateUserPassword)
app.get('/apprenticeship/:id/:userID', getApprinticeshipInfo);
app.get('/apprenticeship-pics/:id', getApprenticeshipPics);
app.get('/apprenticeships/:isApproved/:id', getAllApprenticeship);
app.get('/categories', getAllCategories);
app.get('/users/:isApproved', getAllUsers);
app.get('/addresses/:id', getAddresses);
app.get('/enrollRequests/:apprenticeshipId/:userID/:isApproved', getEnrollRequests);
app.get('/checkUniqueEmail/:Email', checkUniqueEmail);
app.get('/checkUniquePhone/:Phone_Number', checkuniquePhone);
app.get('/searchApprenticeships/:search', searchApprenticeships);
app.get('/getChats/:id/:isOwner', getChats);
app.get('/getMessages/:userID/:chatID', getMessages);
app.get('/getUserApprenticeships/:id', getUserApprenticeships);
app.get('/getAnnouncements/:id', getAnnouncements);
app.delete('/deleteApprenticeship/:id', deleteApprenticeship);
app.delete('/rejectOwner/:id', rejectOwner);
app.delete('/deactiveUser/:id', deactiveUser);
app.delete('/deleteCategory/:id', deleteCatogry);
