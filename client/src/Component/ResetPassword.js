import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import { Link } from 'react-router-dom';
import useInput from '../Hooks/useInput';
import Randomstring from 'randomstring';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
function ResetPassword(){
    const [email, emailInput] = useInput({type:'email', placeholder:'Enter Email...', className:'defultInput me-auto ms-auto mt-3 login-input'});
    const [password, passwordInput] = useInput({type:'password', placeholder:'Enter Password...', className:'defultInput row me-auto ms-auto mt-4 login-input'});
    const [randomCode, setRandomCode] = useState(Randomstring.generate(6));
    const [askedForCode, setAskedForCode] = useState(false);
    const [verifyCode, verifyCodeInput] = useInput({type:'text', placeholder:'Enter Verify Code...', className:'defultInput row me-auto ms-auto mt-3 login-input', disabled:askedForCode? false:true});
    const [status, setStatus] = useState('');
    const [success, setSuccess] = useState(false);
    const openLogin = () => {
        document.querySelector('.reset-password-box').classList.remove('reset-password-box-to-left');
        document.querySelector('.login-box').classList.remove('login-box-to-left');
    }

    const sendCode = () => {
        const isValidEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(email == ''){
            setStatus('Please Enter Email');
            return;
        }
        if(!isValidEmail){
            setStatus('Please Enter Valid Email');
            return;
        }
        fetch('http://localhost:5000/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
            }).then((res) => {
            return res.json();
            }).then((data) => {
            if(data.error){
                setStatus('Email Not Found');
                return;
            }
            else{
                setStatus('');
            }
            }).catch((err) => {
                setStatus('Something Went Wrong');
                return;
        });
        if(status != '') return;
        const EmailJsTemplateParams = {
            to_name: 'SkillFinder User',
            email: email,
            code: randomCode
        }
        emailjs.send(process.env.React_APP_EmailJsServiceID , process.env.React_APP_EmailJsVerifyEmailTemplateID , EmailJsTemplateParams ,  process.env.React_APP_EmailJs_API_KEY)
        .then(() => {
            setAskedForCode(true);
            setStatus('Verify Code Sent To Your Email');
        }).catch((err) => {
            console.log(err);
        });
    }

    const checkVerifyCode = () => {
        alert(randomCode + ' ' + verifyCode);
        if(verifyCode == randomCode && askedForCode){
            setSuccess(true);
            setStatus('');
        }
        else if(!askedForCode){
            setStatus('Please Send Verify Code To Your Email');
            return;
        }
        else{
            setStatus('Wrong Verify Code');
            return;
        }
    }

    const resetPassword = () => {
        if(password == ''){
            setStatus('Please Enter Password');
            return;
        }
        fetch('http://localhost:5000/resetPassword', {
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
                setStatus('Something Went Wrong');
                return;
            }
            else{
                setStatus('Password Reset Successfully');
                setSuccess(false);
                setTimeout(() => {
                    document.querySelector('.reset-password-box').classList.remove('reset-password-box-to-left');
                    document.querySelector('.login-box').classList.remove('login-box-to-left');
                }, 1000);
            }
            }).catch((err) => {
                setStatus('Something Went Wrong');
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
            <p className='mt-2 text-center'>{status}</p>
            <button className='defultButton row me-auto ms-auto mt-3 login-button'
             onClick={() => {if(success) resetPassword(); else checkVerifyCode()}}>Reset Password</button>
        </div>
    )
}

export default ResetPassword;