import Logo from '../Assets/Images/SkillFinderLogoNoTitle.png';
import { Link } from 'react-router-dom';
function ResetPassword(){
    const openLogin = () => {
        document.querySelector('.reset-password-box').classList.remove('reset-password-box-to-left');
        document.querySelector('.login-box').classList.remove('login-box-to-left');
    }
    return(
        <div className="desc pb-5 pe-5 ps-5 transtion-boxes reset-password-box">
            <img src={Logo} className="row me-auto ms-auto mb-auto login-img" alt='login' />
            <h4 className='mb-2 text-center'>Reset Your Password</h4>
            <div className='row email-verify-row'>
                <input type='text' placeholder='Enter Email...' className='defultInput me-auto ms-auto mt-3 login-input'/>
                <span className='verify-email'>| Verify</span>
            </div>
            <input type='text' placeholder='Enter Verify Code...' className='defultInput row me-auto ms-auto mt-3 login-input' disabled/>
            <p className='mt-2'>Remembered Password? <span onClick={openLogin} className='login-reset-password'>Go Back To Login</span></p>
            <button className='defultButton row me-auto ms-auto mt-3 login-button'>Reset Password</button>
        </div>
    )
}

export default ResetPassword;