import React, { useState } from 'react'
import logo from '../Assets/Images/SkillFinderLogo.png'
import '../Assets/Styles/NavBar.css'

function NavBar(){
  const [currentPage, setCurrentPage] = useState('Home');
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <a className="navbar-brand" href="#">
              <img className='logo' src={logo} alt='SkillFinder Logo' />
          </a>
          <div className="collapse navbar-collapse justify-content">
            <div className="navbar-nav">
              <a className={"nav-item nav-link pages-buttons " + (currentPage === 'Home'? 'active': '')} href="#"
                  onClick={() => setCurrentPage('Home')}>Home</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === 'About'? 'active': '')} href="#"
                  onClick={() => setCurrentPage('About')}>About Us</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === 'Contact'? 'active': '')} href="#"
                 onClick={() => setCurrentPage('Contact')}>Contact Us</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === 'Login'? 'active': '')} href="#"
                 onClick={() => setCurrentPage('Login')}>Login</a>
              <a className={"nav-item nav-link pages-buttons " + (currentPage === 'Register'? 'active': '')} href="#"
                 onClick={() => setCurrentPage('Register')}>Register</a>
            </div>
          </div>
      </nav>
    )
}

export default NavBar