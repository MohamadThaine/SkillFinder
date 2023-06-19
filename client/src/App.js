import './App.css';
import Home from './Pages/Home';
import NavBar from './Component/NavBar';
import AdminNavBar from './Component/AdminNavBar';
import Footer from "./Component/Footer";
import { Routes, Route } from 'react-router-dom';
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Search from './Pages/Search';
import ApprenticeshipDetalis from './Pages/ApprenticeshipDetalis';
import PageNotFound from './Pages/PageNotFound';
import { useState, useEffect, useRef } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './Assets/Styles/Modal.css'
import AdminHome from './Pages/AdminHome';
import { useNavigate } from 'react-router-dom';
import AdminApprenticeshipList from './Pages/AdminApprenticeshipList';
import AdminApproveList from './Pages/AdminApproveList';
import AdminUserList from './Pages/AdminUserList';
import AdminCategoryEdit from './Pages/AdminCategoryEdit';
import { Alert, Snackbar } from '@mui/material';
import OwnerHome from './Pages/OwnerHome';
import Chats from './Component/Chats';
import './Assets/Styles/loader.css'
import Profile from './Pages/Profile';
import UserApprenticeships from './Pages/UserApprenticeships';
import { io } from "socket.io-client"

function App() {
  const navigate = useNavigate();
  const socket = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [otherUserInfo, setOtherUserInfo] = useState(JSON.parse(localStorage.getItem('otherInfo')));
  const [isAdmin, setIsAdmin] = useState(null);
  const [snackBarInfo, setSnackBarInfo] = useState({open: false, message: '', severity: 'info'});
  useEffect (() => {
    try
    {
      socket.current = io(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`, { transports: ['websocket'] });
      if(localStorage.getItem('user') !== null){
        setUser(JSON.parse(localStorage.getItem('user')));
        setOtherUserInfo(JSON.parse(localStorage.getItem('otherInfo')));
        socket.current.emit('join', JSON.parse(localStorage.getItem('user')).id);
        if(JSON.parse(localStorage.getItem('otherInfo')).isAdmin){
          setIsAdmin(true);
          navigate('/Admin');
        }
      }
    }catch(e){}
  }, []);

  const handleLogin = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
    setOtherUserInfo(JSON.parse(localStorage.getItem('otherInfo')));
    socket.current.emit('join', JSON.parse(localStorage.getItem('user')).id);
    if(JSON.parse(localStorage.getItem('otherInfo')).isAdmin){
      setIsAdmin(true);
      navigate('/Admin');
    }
    else if(JSON.parse(localStorage.getItem('otherInfo')).Major){
      navigate('/Owner');
    }
    else{
      if(JSON.parse(localStorage.getItem('otherInfo')).No_Of_Courses <= 0){
        navigate('/');
      }
      else{
        navigate('/MyApprenticeships');
      }
    }
    setSnackBarInfo({open: true, message: 'Login Successfully!', severity: 'success'});
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('otherInfo');
    localStorage.removeItem('token');
    setUser(null);
    setOtherUserInfo(null);
    setIsAdmin(false);
    navigate('/');
  }

  useEffect(() => {
    if(snackBarInfo.open === false) return;
    setTimeout(() => {
      setSnackBarInfo({open: false, message: '', severity: 'info'});
    }, 3000);
  }, [snackBarInfo]);

  return (
    <>
      {!isAdmin && <NavBar user={user} otherUserInfo={otherUserInfo} handleLogout={handleLogout} />}
      {isAdmin && <AdminNavBar isAdmin={isAdmin} handleLogout={handleLogout} />}
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackBarInfo.open}>
          <Alert severity={snackBarInfo.severity} sx={{ width: '100%' }}>
            {snackBarInfo.message}
          </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login handleLogin={handleLogin}/>} />
        <Route path="/Register" element={<Register setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/Search/:keyWords' element={<Search />} />
        <Route path='/Apprenticeship/:ID' element={<ApprenticeshipDetalis setSnackBarInfo={setSnackBarInfo}/>} />
        <Route path='/Owner' element={<OwnerHome user={user} ownerInfo={otherUserInfo} setOwnerInfo={setOtherUserInfo} setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/Profile' element={<Profile user={user} setUser={setUser} otherInfo={otherUserInfo} setOtherInfo={setOtherUserInfo} setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/MyApprenticeships' element={<UserApprenticeships user={user} />} />
        <Route path='/Admin/Apprenticeship' element={<AdminApprenticeshipList isAdmin={isAdmin} setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/Admin/Approve' element={<AdminApproveList isAdmin={isAdmin} setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/Admin/User' element={<AdminUserList isAdmin={isAdmin} setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/Admin/Edit' element={<AdminCategoryEdit isAdmin={isAdmin} setSnackBarInfo={setSnackBarInfo} />} />
        <Route path='/Admin' element={<AdminHome isAdmin={isAdmin} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {user && !isAdmin && <Chats socket={socket} />}
      <Footer />
    </>
  );
}

export default App;
