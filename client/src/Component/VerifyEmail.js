import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png'
import useInput from '../Hooks/useInput';
import { useRef } from 'react';
function VerifyEmail({email, verify_token}){
    const [verifyCode, verifyCodeInput] = useInput({type: 'text', placeholder: 'Enter Verify Code...', className: 'defultInput row me-auto ms-auto mt-3 verify-input'});
    const statusRef = useRef();
    const navigate = useNavigate();
    const verifyEmail = async () => {
        if(verify_token !== verifyCode){
            alert(verify_token)
            statusRef.current.innerHTML = 'Verify code is incorrect';
            statusRef.current.style.color = 'red';
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
            statusRef.current.innerHTML = 'Verify code is correct\nRedirecting to login page...';
        statusRef.current.style.color = 'green';
        setTimeout(() => {
            navigate('/Login');
        }, 2000);
    }
}

    return(
        <div className="desc pb-5 pe-5 ps-5 transtion-boxes verify-email-box">
            <img src={Logo} className="row me-auto ms-auto mb-auto login-img" alt='login' />
            <h4 className='mb-2 text-center'>Check your email</h4>
            <h5 className='text-center'>Your Email is</h5>
            <h5 className='mb-2 mt-2 text-center'>{email}</h5>
            {verifyCodeInput}
            <p ref={statusRef} className='mt-2 text-center'></p>
            <button className='defultButton row me-auto ms-auto mt-3 login-button' onClick={verifyEmail}>Verify</button>
        </div>
    )
}

export default VerifyEmail;