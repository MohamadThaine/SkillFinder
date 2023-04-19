import React, { useState } from 'react'
import logo from '../Assets/Images/SkillFinderLogo.png'
import '../Assets/Styles/NavBar.css'
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar(){
  const currentLocation = useLocation();
  const [currentPage, setCurrentPage] = useState(currentLocation.pathname);
  const navigate = useNavigate();
  const changePage = (page) => {
    setCurrentPage(page);
    navigate(page);
  }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <a className="navbar-brand" href="#">
              <img className='logo' src={logo} alt='SkillFinder Logo' />
          </a>
          <div className="collapse navbar-collapse justify-content">
            <div className="navbar-nav">
              <a className={"nav-item nav-link pages-buttons " + (currentPage === '/'? 'active': '')}
                  onClick={() => changePage('/')}>Home</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === '/AboutUs'? 'active': '')}
                  onClick={() => changePage('/AboutUs')}>About Us</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === '/ContactUs'? 'active': '')}
                 onClick={() => changePage('/ContactUs')}>Contact Us</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === '/Login'? 'active': '')}
                 onClick={() => changePage('/Login')}>Login</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === '/Register'? 'active': '')}
                 onClick={() => changePage('/Register')}>Register</a>
            </div>
          </div>
      </nav>
    )
}

export default NavBar