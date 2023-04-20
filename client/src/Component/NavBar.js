import React, { useEffect, useState } from 'react'
import logo from '../Assets/Images/SkillFinderLogo.png'
import '../Assets/Styles/NavBar.css'
import { useLocation, Link } from 'react-router-dom';

function NavBar(){
  const currentLocation = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(currentLocation.pathname);
  },[currentLocation.pathname])

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <Link to='/' className="navbar-brand">
              <img className='logo' src={logo} alt='SkillFinder Logo' />
          </Link>
          <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content" id="navbarSupportedContent">
            <div className="navbar-nav">
              <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/'? 'active': '')}
                    to='/'>Home</Link>
              <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/AboutUs'? 'active': '')}
                    to='/AboutUs'>About Us</Link>
              <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/ContactUs'? 'active': '')}
                    to='/ContactUs'>Contact Us</Link>
              <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/Login'? 'active': '')}
                    to='/Login'>Login</Link>
              <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/Register'? 'active': '')}
                    to='/Register'>Register</Link>
            </div>
          </div>
      </nav>
    )
}

export default NavBar