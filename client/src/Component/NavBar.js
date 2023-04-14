import React from 'react'
import logo from '../Assets/Images/SkillFinderLogo.png'
import '../Assets/Styles/NavBar.css'

function NavBar(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <a class="navbar-brand" href="#">
            <img className='logo' src={logo} />
        </a>
        <div class="collapse navbar-collapse justify-content">
          <div class="navbar-nav">
            <a class="nav-item nav-link pages-buttons active" href="#">Home</a>
            <a class="nav-item nav-link pages-buttons" href="#">About Us</a>
            <a class="nav-item nav-link pages-buttons" href="#">Contact Us</a>
            <a class="nav-item nav-link pages-buttons" href="#">Login</a>
            <a class="nav-item nav-link pages-buttons" href="#">Register</a>
          </div>
        </div>
      </nav>
    )
}

export default NavBar