import React from 'react';
import '../Assets/Styles/AdminNavBar.css'
import { Link } from 'react-router-dom';
import userIcon from '../Assets/Images/user-solid.svg';
import approveIcon from '../Assets/Images/check-solid.svg';
import addIcon from '../Assets/Images/plus-solid.svg';
import schoolIcom from '../Assets/Images/school-solid.svg';
import { useNavigate } from 'react-router-dom';
function AdminNavBar({isAdmin}){

    const navigate = useNavigate();

    if(!isAdmin)
        navigate('/PageNotFound');

    return(
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light position-absolute admin-nav-bar">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Admin Dashboard</span>
    </a>
    <hr/>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <Link to="/admin" class="nav-link active" aria-current="page">
            <img src={userIcon} alt="user" className="admin-nav-bar-icons"/>
            Users
        </Link>
      </li>
      <li>
        <Link to="/admin/app" class="nav-link link-dark">
            <img src={schoolIcom} alt="school" className="admin-nav-bar-icons"/>
            Apprenticeships
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/admin/approve" class="nav-link link-dark">
            <img src={approveIcon} alt="approve" className="admin-nav-bar-icons"/>
            Approve
        </Link>
      </li>
      <li class="nav-item">
        <Link to="/admin/add" class="nav-link link-dark">
            <img src={addIcon} alt="add" className="admin-nav-bar-icons"/>
            Add
        </Link>
      </li>
    </ul>
    <hr/>
    <li>
        <span>Logout</span>
    </li>
  </div>
    )
}

export default AdminNavBar;