import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import { Link } from 'react-router-dom';
import useInput from '../Hooks/useInput';
import Randomstring from 'randomstring';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Alert } from '@mui/material';

function ResetPassword(){
    const [email, emailInput] = useInput({type:'email', placeholder:'Enter Email...', className:'defultInput me-auto ms-auto mt-3 login-input'});
    const [name, setName] = useState('');
    const [password, passwordInput] = useInput({type:'password', placeholder:'Enter Password...', className:'defultInput row me-auto ms-auto mt-4 login-input'});
    const [randomCode, setRandomCode] = useState(Randomstring.generate(6));
    const [askedForCode, setAskedForCode] = useState(false);
    const [verifyCode, verifyCodeInput] = useInput({type:'text', placeholder:'Enter Verify Code...', className:'defultInput row me-auto ms-auto mt-3 login-input', disabled:askedForCode? false:true});
    const [alert, setAlert] = useState({message:'', severity:'', needed:false});
    const [success, setSuccess] = useState(false);
    const openLogin = () => {
        document.querySelector('.reset-password-box').classList.remove('reset-password-box-to-left');
        document.querySelector('.login-box').classList.remove('login-box-to-left');
    }

    const sendCode = () => {
        const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(email == ''){
            setAlert({message:'Please Enter Email', severity:'error', needed:true});
            return;
        }
        if(!isValidEmail){
            setAlert({message:'Please Enter Valid Email', severity:'error', needed:true});
            return;
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/checkEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
            }).then((res) => {
            return res.json();
            }).then((data) => {
            if(data.error){
                setAlert({message:'Email Not Found', severity:'error', needed:true});
                return;
            }
            else{
                setName(data.name);
            }
            }).catch((err) => {
                setAlert({message:'Something Went Wrong', severity:'error', needed:true});
                return;
        });
        if(alert.message != '') return;
        const EmailJsTemplateParams = {
            to_name: name,
            email: email,
            code: randomCode
        }
        emailjs.send(process.env.React_APP_EmailJsServiceID , process.env.React_APP_EmailJsVerifyEmailTemplateID , EmailJsTemplateParams ,  process.env.React_APP_EmailJs_API_KEY)
        .then(() => {
            setAskedForCode(true);
            setAlert({message:'Verify Code Sent To Your Email', severity:'success', needed:true});
        }).catch((err) => {
            console.log(err);
        });
    }

    const checkVerifyCode = () => {
        if(verifyCode == randomCode && askedForCode){
            setSuccess(true);
            setAlert('');
        }
        else if(!askedForCode){
            setAlert({message:'Please Send Verify Code First', severity:'error', needed:true});
            return;
        }
        else{
            setAlert({message:'Wrong Verify Code', severity:'error', needed:true});
            return;
        }
    }

    const resetPassword = () => {
        if(password == ''){
            setAlert({message:'Please Enter Password', severity:'error', needed:true});
            return;
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/resetPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
            }).then((res) => {
            return res.json();
            }
            ).then((data) => {
            if(data.error){
                setAlert('Something Went Wrong');
                return;
            }
            else{
                setAlert({message:'Password Reset Successfully', severity:'success', needed:true});
                setSuccess(false);
                setTimeout(() => {
                    document.querySelector('.reset-password-box').classList.remove('reset-password-box-to-left');
                    document.querySelector('.login-box').classList.remove('login-box-to-left');
                }, 1000);
            }
            }).catch((err) => {
                setAlert({message:'Something Went Wrong', severity:'error', needed:true});
                return;
        });
    }

    return(
        <div className="desc pb-5 pe-5 ps-5 transtion-boxes reset-password-box">
            <img src={Logo} className="row me-auto ms-auto mb-auto login-img" alt='login' />
            <h4 className='mb-2 text-center'>Reset Your Password</h4>
            {!success && <div>
                <div className='row email-verify-row'>
                    {emailInput}
                    <span className='verify-email' onClick={sendCode}> | Verify</span>
                </div>
                {verifyCodeInput}
            </div>}
            {success && <div>
                {passwordInput}
            </div>}
            <p className='mt-2'>Remembered Password? <span onClick={openLogin} className='login-reset-password'>Go Back To Login</span></p>
            {alert.needed && <Alert severity={alert.severity} className='mt-2'>{alert.message}</Alert>}
            <button className='defultButton row me-auto ms-auto mt-3 login-button'
             onClick={() => {if(success) resetPassword(); else checkVerifyCode()}}>Reset Password</button>
        </div>
    )
}

export default ResetPassword;