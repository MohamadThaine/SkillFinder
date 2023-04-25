import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import '../Assets/Styles/Login.css'
import ResetPassword from '../Component/ResetPassword';
import useInput from '../Hooks/useInput';
import VerifyEmail from '../Component/VerifyEmail';

function Login(){
    const [username, usernameInput] = useInput({type:'text', placeholder:'Enter Username...', className:'defultInput row me-auto ms-auto mt-3 login-input'});
    const [password, passwordInput] = useInput({type:'password', placeholder:'Enter Password...', className:'defultInput row me-auto ms-auto mt-4 login-input'});
    const [email, setEmail] = useState('');
    const [verifyToken, setVerifyToken] = useState('');
    const statusRef = useRef();
    const openResetPassword = () => {
        document.querySelector('.reset-password-box').classList.add('reset-password-box-to-left');
        document.querySelector('.login-box').classList.add('login-box-to-left');
    }
    
    const login = async () => {
        const body = {
            username,
            password
        }
        const respone = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const res = await respone.json();
        if(res.error){
            statusRef.current.innerHTML = 'Wrong username or password';
            statusRef.current.style.color = 'red';
        }
        else{
            if(res[0].Verify_Status == 0)
            {
                statusRef.current.style.color = '';
                statusRef.current.innerHTML = 'Please verify your account first! <span class="login-reset-password" id="verify-account-btn">Verify Account</span>';
                setEmail(res[0].Email);
                setVerifyToken(res[0].Verify_Token);
                document.getElementById('verify-account-btn').addEventListener('click', () => {
                document.querySelector('.verify-email-box').classList.add('verify-email-box-to-left');
                document.querySelector('.login-box').classList.add('login-box-to-left');
            })
            }
            else{
                statusRef.current.innerHTML = 'Login Success';
                statusRef.current.style.color = 'green';
                localStorage.setItem('user', JSON.stringify(res[0]));
            }
        }
    }
    
    onkeyup = (e) => {
        if(e.keyCode === 13){
            login();
        }
    }

    return(
        <>
         <div className="containter-fluid header mb-3">
            <h1 className="text-center mt-5">Login</h1>
         </div>
         <div className='login-page-boxes'>
            <div className="desc pb-5 pe-5 ps-5 transtion-boxes login-box">
                <img src={Logo} alt='login' className='row me-auto ms-auto mb-auto login-img'/>
                <h4 className='mb-2 text-center'>Welcome to SkillFinder</h4>
                {usernameInput}
                {passwordInput}
                <p className='mt-2'>Forgot password? <span onClick={openResetPassword} className='login-reset-password'>Reset Password</span></p>
                <p ref={statusRef} className='mt-1 text-center'></p>
                <button className='defultButton row me-auto ms-auto mt-3 login-button' id='login-btn' onClick={login}>Login</button>
            </div>
            <ResetPassword />
            <VerifyEmail email={email} verify_token={verifyToken} from='login' />
         </div>
         
        
        </>
    )
}

export default Login