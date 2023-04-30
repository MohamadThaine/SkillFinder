import React, { useEffect, useRef, useState } from 'react'
import logo from '../Assets/Images/SkillFinderLogo.png'
import searchIcon from '../Assets/Images/searchIcon.svg'
import '../Assets/Styles/NavBar.css'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import defalutMalePic from '../Assets/Images/defaultMalePic.svg';

function NavBar({user , otherUserInfo, handleLogout}){
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('');
  const [searchKeyWords, setSearchKeyWords] = useState('');
  const navRef = useRef();
  useEffect(() => {
    setCurrentPage(currentLocation.pathname);
    if(!currentLocation.pathname.startsWith('/Search')){
      setSearchKeyWords('');
    }
  },[currentLocation.pathname])

  const search = () => {
    if(searchKeyWords === '') return;
    const keyWords = searchKeyWords.replace(' ','%')
    navigate('/Search/' + keyWords)
}

  onkeyup = (e) => {
      if(e.which === 13){
          search();
      }
  }

    return(
     <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom" ref={navRef}>
          <Link to='/' className="navbar-brand brand-link">
              <img className='logo' src={logo} alt='SkillFinder Logo' />
          </Link>
          {user && <li className="nav-item dropdown user-menu">
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={defalutMalePic} className='nav-profile-pic'></img>
                    </a>
                    <ul className="dropdown-menu">
                      <Link to='/Profile' className="dropdown-item">Profile</Link>
                      <Link to='/MyApprenticeships' className="dropdown-item">My Apprenticeships</Link>
                      <span className="dropdown-item" onClick={handleLogout}>Logout</span>
                    </ul>
                  </li>}
          <button className="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title ms-4" id="offcanvasNavbarLabel">SkillFinder Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
              <input className={"defultInput nav-bar-search " + (currentPage=== '/'? 'hideSearch': '')}
                    type="text" placeholder="Search..." aria-label="Search"
                      value={searchKeyWords} onChange={e => setSearchKeyWords(e.target.value)}/>
              <button className={'nav-bar-search-btn ' + (currentPage=== '/'? 'hideSearch': '')} onClick={search}>
                <img src={searchIcon} />
              </button>
              <div className="navbar-nav ms-auto me-4 ">
                <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/'? 'active': '')}
                      to='/'>Home</Link>
                <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/AboutUs'? 'active': '')}
                      to='/AboutUs'>About Us</Link>
                <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/ContactUs'? 'active': '')}
                      to='/ContactUs'>Contact Us</Link>
                {!user && <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/Login'? 'active': '')}
                      to='/Login'>Login</Link>}
                {!user && <Link className={"nav-item nav-link pages-buttons " + (currentPage === '/Register'? 'active': '')}
                      to='/Register'>Register</Link>}
              </div>
          </div>
        </div>
      </nav>
      <ScrollToTop viewRef={navRef} />
      </>
    )
}

export default NavBar