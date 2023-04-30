import './App.css';
import Home from './Pages/Home';
import NavBar from './Component/NavBar';
import Footer from "./Component/Footer";
import { Routes, Route } from 'react-router-dom';
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Search from './Pages/Search';
import Apprenticeship from './Pages/Apprenticeship';
import PageNotFound from './Pages/PageNotFound';
import { useState, useEffect } from 'react';

function App() {

  const [user, setUser] = useState(null);
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  useEffect (() => {
    try
    {
      if(localStorage.getItem('user') != null){
        setUser(JSON.parse(localStorage.getItem('user')));
        setOtherUserInfo(JSON.parse(localStorage.getItem('otherInfo')));
      }  
    }catch(e){}
  }, []);

  const handleLogin = () => {
    setUser(JSON.parse(localStorage.getItem('user')));
    setOtherUserInfo(JSON.parse(localStorage.getItem('otherInfo')));
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('otherInfo');
    setUser(null);
    setOtherUserInfo(null);
  }

  return (
    <>
      <NavBar user={user} otherUserInfo={otherUserInfo} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Login" element={<Login handleLogin={handleLogin}/>} />
        <Route path="/Register" element={<Register />} />
        <Route path='/Search/:keyWords' element={<Search />} />
        <Route path='/Apprenticeship/:ID' element={<Apprenticeship />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
