import React from 'react';
import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import { Link } from 'react-router-dom';
import '../Assets/Styles/Login.css'


function Login(){
    return(
        <>
         <div className="containter-fluid header mb-3">
            <h1 className="text-center mt-5">Login</h1>
         </div>
        <div className="desc mt-auto mb-auto pb-5 pe-5 ps-5">
            <img src={Logo} alt='login' className='row me-auto ms-auto mb-auto login-img'/>
            <h4 className='mb-2 text-center'>Welcome to SkillFinder</h4>
            <input type='text' placeholder='Enter Username...' className='defultInput row me-auto ms-auto mt-3 login-input'/>
            <input type='password' placeholder='Enter Password...' className='defultInput row me-auto ms-auto mt-4 login-input'/>
            <p className='mt-2'>Forgot password? <Link>Reset Password</Link></p>
            <button className='defultButton row me-auto ms-auto mt-3 login-button'>Login</button>
        </div>
        </>
    )
}

export default Login