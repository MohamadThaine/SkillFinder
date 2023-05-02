import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png'
import useInput from '../Hooks/useInput';
import { useState } from 'react';
import { Alert } from '@mui/material';

function VerifyEmail({email, verify_token, from}){
    const [verifyCode, verifyCodeInput] = useInput({type: 'text', placeholder: 'Enter Verify Code...', className: 'defultInput row me-auto ms-auto mt-3 verify-input'});
    const [alert, setAlert] = useState({message:'', severity:'', needed:false});
    const navigate = useNavigate();
    const verifyEmail = async () => {
        if(verify_token !== verifyCode){
            setAlert({message:'Verify code is incorrect!', severity:'error', needed:true});
            return;
        }
        const data = {email};
        const response = await fetch('http://localhost:5000/verify-email', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if(res.status === 'success'){
            setAlert({message:'Your email is verified!', severity:'success', needed:true});
            if(from === 'register'){
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
            else{
                setTimeout(() => {
                    document.querySelector('.verify-email-box').classList.remove('verify-email-box-to-left');
                    document.querySelector('.login-box').classList.remove('login-box-to-left');
                }, 1000);
                setTimeout(() => {
                    document.getElementById('login-btn').click();
                }, 1200);
            }
        }
}

    return(
        <div className="desc pb-5 pe-5 ps-5 transtion-boxes verify-email-box">
            <img src={Logo} className="row me-auto ms-auto mb-auto login-img" alt='login' />
            <h4 className='mb-2 text-center'>Check your email</h4>
            <h5 className='text-center'>Your Email is</h5>
            <h5 className='mb-2 mt-2 text-center'>{email}</h5>
            {verifyCodeInput}
            {alert.needed && <Alert severity={alert.severity}>{alert.message}</Alert>}
            <button className='defultButton row me-auto ms-auto mt-3 login-button' onClick={verifyEmail}>Verify</button>
        </div>
    )
}

export default VerifyEmail;