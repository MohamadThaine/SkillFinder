import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import '../Assets/Styles/Login.css'
import ResetPassword from '../Component/ResetPassword';
import useInput from '../Hooks/useInput';
import VerifyEmail from '../Component/VerifyEmail';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

function Login({handleLogin}){
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('user') != null){
            navigate('/');
        }
    },[])

    const [username, usernameInput] = useInput({type:'text', placeholder:'Enter Username...', className:'defultInput row me-auto ms-auto mt-3 login-input'});
    const [password, passwordInput] = useInput({type:'password', placeholder:'Enter Password...', className:'defultInput row me-auto ms-auto mt-4 login-input'});
    const [email, setEmail] = useState('');
    const [verifyToken, setVerifyToken] = useState('');
    const statusRef = useRef();
    const [alert, setAlert] = useState({message:'', severity:'', needed:false});
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
            setAlert({message:res.error, severity:'error', needed:true});
        }
        else{
            if(res.user.Verify_Status == 0)
            {
                setAlert({message:'Please verify your email first!', severity:'warning', needed:true});
                setEmail(res[0].Email);
                setVerifyToken(res[0].Verify_Token);
                document.getElementById('verify-account-btn').addEventListener('click', () => {
                sendEmailVerifying(res);   
                document.querySelector('.verify-email-box').classList.add('verify-email-box-to-left');
                document.querySelector('.login-box').classList.add('login-box-to-left');
            })
            }
            else if(res.user.User_Type == 2){
                if(res.otherInfo.isApproved == 0){
                    setAlert({message:'Your account is not approved yet!', severity:'warning', needed:true});
                    return;
                }
            }
            else{
                setAlert({message:'Login Successfully!', severity:'success', needed:true});
                localStorage.setItem('user', JSON.stringify(res.user));
                localStorage.setItem('otherInfo', JSON.stringify(res.otherInfo));
                handleLogin();
            }
        }
    }

    const sendEmailVerifying = async (res) => {
        const EmailJsTemplateParams = {
            to_name: res[0].Name,
            email: res[0].Email,
            code: res[0].Verify_Token
        }
        emailjs.send(process.env.React_APP_EmailJsServiceID , process.env.React_APP_EmailJsVerifyEmailTemplateID , EmailJsTemplateParams ,  process.env.React_APP_EmailJs_API_KEY);
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
                {alert.needed && <Alert severity={alert.severity} >{alert.message}</Alert>}
                <button className='defultButton row me-auto ms-auto mt-3 login-button' id='login-btn' onClick={(login)}>Login</button>
            </div>
            <ResetPassword />
            <VerifyEmail email={email} verify_token={verifyToken} from='login' />
         </div>
         
        
        </>
    )
}

export default Login