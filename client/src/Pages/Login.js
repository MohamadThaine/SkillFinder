import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import '../Assets/Styles/Login.css'
import ResetPassword from '../Component/ResetPassword';
import VerifyEmail from '../Component/VerifyEmail';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { TextField } from '@mui/material';

function Login({ handleLogin }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') != null) {
            navigate('/');
        }
    }, [])
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [verifyToken, setVerifyToken] = useState('');
    const statusRef = useRef();
    const [alert, setAlert] = useState({ message: '', severity: '', needed: false });
    const openResetPassword = () => {
        document.querySelector('.reset-password-box').classList.add('reset-password-box-to-left');
        document.querySelector('.login-box').classList.add('login-box-to-left');
    }

    const login = async () => {
        const body = {
            username,
            password
        }
        const respone = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const res = await respone.json();
        if (res.error) {
            setAlert({ message: res.error, severity: 'error', needed: true });
        }
        else {
            if (res.admin) {
                setAlert({ message: 'Login Successfully!', severity: 'success', needed: true });
                localStorage.setItem('user', JSON.stringify(res.admin));
                localStorage.setItem('otherInfo', JSON.stringify({ isAdmin: true }));
                localStorage.setItem('token', res.token);
                handleLogin();
                return;
            }
            if (res.user.Verify_Status == 0) {
                setAlert({ message: 'Please verify your email first!', severity: 'warning', needed: true });
                setEmail(res.user.Email);
                setVerifyToken(res.user.Verify_Token);
                sendEmailVerifying(res);
                document.querySelector('.verify-email-box').classList.add('verify-email-box-to-left');
                document.querySelector('.login-box').classList.add('login-box-to-left');
                return;

            }
            else if (res.user.Deactivated == 1) {
                setAlert({ message: 'Your account is deactivated!', severity: 'warning', needed: true });
                return;
            }
            else if (res.user.User_Type == 2) {
                if (res.owner.isApproved == 0) {
                    setAlert({ message: 'Your account is not approved yet!', severity: 'warning', needed: true });
                    return;
                }
            }
            setAlert({ message: 'Login Successfully!', severity: 'success', needed: true });
            if (res.owner) {
                localStorage.setItem('otherInfo', JSON.stringify(res.owner));
            }
            else {
                localStorage.setItem('otherInfo', JSON.stringify(res.apprentice));
            }
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
            handleLogin();
        }
    }

    const sendEmailVerifying = async (res) => {
        const EmailJsTemplateParams = {
            to_name: res.user.Name,
            email: res.user.Email,
            code: res.user.Verify_Token
        }
        emailjs.send(process.env.React_APP_EmailJsServiceID, process.env.React_APP_EmailJsVerifyEmailTemplateID, EmailJsTemplateParams, process.env.React_APP_EmailJs_API_KEY);
    }

    onkeyup = (e) => {
        if (e.keyCode === 13) {
            login();
        }
    }

    return (
        <>
            <div className="containter-fluid header mb-3">
                <h1 className="text-center mt-5">Login</h1>
            </div>
            <div className='login-page-boxes'>
                <div className="desc pb-5 pe-5 ps-5 transtion-boxes login-box">
                    <img src={Logo} alt='login' className='row me-auto ms-auto mb-auto login-img' />
                    <h4 className='mb-2 text-center'>Welcome to SkillFinder</h4>
                    <div className='d-flex flex-column'>
                        <TextField label="Username" variant="outlined" className='login-input mt-4 mb-3' value={username} onChange={e => setUsername(e.target.value)} />
                        <TextField label="Password" variant="outlined" className='login-input mt-4 mb-4' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
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