import React from 'react';
import '../Assets/Styles/AdminNavBar.css'
import { Link } from 'react-router-dom';
import userIcon from '../Assets/Images/user-solid.svg';
import approveIcon from '../Assets/Images/check-solid.svg';
import addIcon from '../Assets/Images/plus-solid.svg';
import schoolIcom from '../Assets/Images/school-solid.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
function AdminNavBar({isAdmin, handleLogout}){

    const navigate = useNavigate();
    const currentPath = window.location.pathname;
    if(!isAdmin)
        navigate('/PageNotFound');

    return(
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light position-absolute admin-nav-bar">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span className="fs-4">Admin Dashboard</span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="/Admin/User" className={"nav-link " + (currentPath === '/Admin/User'? 'active': 'link-dark')}>
            <img src={userIcon} alt="user" className="admin-nav-bar-icons"/>
            Users
        </Link>
      </li>
      <li>
        <Link to="/Admin/Apprenticeship" className={"nav-link " + (currentPath === '/Admin/Apprenticeship'? 'active': 'link-dark')}>
            <img src={schoolIcom} alt="school" className="admin-nav-bar-icons"/>
            Apprenticeships
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/Admin/Approve" className={"nav-link " + (currentPath === '/Admin/Approve'? 'active': 'link-dark')}>
            <img src={approveIcon} alt="approve" className="admin-nav-bar-icons"/>
            Approve
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/Admin/Edit" className={"nav-link " + (currentPath === '/Admin/Edit'? 'active': 'link-dark')}>
            <img src={addIcon} alt="add" className="admin-nav-bar-icons"/>
            Edit Categories
        </Link>
      </li>
    </ul>
    <hr/>
    <li>
        <Button variant="contained" onClick={handleLogout} className='ms-5'>Logout</Button>
    </li>
  </div>
    )
}

export default AdminNavBar;