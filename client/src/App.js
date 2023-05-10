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
import { useState, useEffect } from 'react';
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

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect (() => {
    try
    {
      if(localStorage.getItem('user') != null){
        setUser(JSON.parse(localStorage.getItem('user')));
        setOtherUserInfo(JSON.parse(localStorage.getItem('otherInfo')));
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
    if(JSON.parse(localStorage.getItem('otherInfo')).isAdmin){
      setIsAdmin(true);
      navigate('/Admin');
    }
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

  return (
    <>
      {!isAdmin && <NavBar user={user} otherUserInfo={otherUserInfo} handleLogout={handleLogout} />}
      {isAdmin && <AdminNavBar isAdmin={isAdmin} handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login handleLogin={handleLogin}/>} />
        <Route path="/Register" element={<Register />} />
        <Route path='/Search/:keyWords' element={<Search />} />
        <Route path='/Apprenticeship/:ID' element={<ApprenticeshipDetalis />} />
        <Route path='/Admin/Apprenticeship' element={<AdminApprenticeshipList isAdmin={isAdmin} />} />
        <Route path='/Admin/Approve' element={<AdminApproveList isAdmin={isAdmin} />} />
        <Route path='/Admin/User' element={<AdminUserList isAdmin={isAdmin} />} />
        <Route path='/Admin/Edit' element={<AdminCategoryEdit isAdmin={isAdmin} />} />
        <Route path='/Admin' element={<AdminHome isAdmin={isAdmin} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
