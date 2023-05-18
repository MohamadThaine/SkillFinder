import { useState, useEffect } from "react"
import useInput from '../Hooks/useInput'
import '../Assets/Styles/Register.css'
import { Link, useNavigate } from "react-router-dom";
import randomstring from 'randomstring';
import VerifyEmail from "../Component/VerifyEmail";
import emailjs from '@emailjs/browser';
import { Alert, ToggleButton, ToggleButtonGroup } from "@mui/material";

function Register({ setSnackBarInfo }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            navigate('/');
        }
    }, [])
    const [isOwner, setIsOwner] = useState(false);
    const [firstName, firstNameInput] = useInput({ type: 'text', className: 'defultInput register-input form-control' });
    const [lastName, lastNameInput] = useInput({ type: 'text', className: 'defultInput register-input form-control' });
    const [phoneNumber, phoneNumberInput] = useInput({ type: 'tel', className: 'defultInput register-input form-control' });
    const [birthDate, birthDateInput] = useInput({ type: 'date', className: 'defultInput register-input form-control' });
    const [otherInfo, setOtherInfo] = useState('');
    const [username, usernameInput] = useInput({ type: 'text', className: 'defultInput register-input form-control' });
    const [email, emailInput] = useInput({ type: 'email', className: 'defultInput register-input form-control' });
    const [password, passwordInput] = useInput({ type: 'password', className: 'defultInput register-input form-control' });
    const [rePassword, rePasswordInput] = useInput({ type: 'password', className: 'defultInput register-input form-control' });
    const [fillInputClass, setFillInputClass] = useState('mt-2');
    const [gender, setGender] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [verifyToken, setVerifyToken] = useState(randomstring.generate(20));
    const [cv, setCV] = useState(null);
    const [alert, setAlert] = useState({ message: '', severity: '', needed: false });

    const validate = () => {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validPhone = /^[0-9]{10}$/.test(phoneNumber);
        const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
        if (firstName === '' || lastName === '' || phoneNumber === '' || otherInfo === '' || birthDate === '' || username === '' || email === '' || password === '' || rePassword === '', gender === '') {
            setFillInputClass('mt-2 shaking');
            setTimeout(() => {
                setFillInputClass('mt-2');
            }, [500])
            return false;
        }

        if(isOwner && !cv){
            setAlert({ message: 'You must upload your CV', severity: 'error', needed: true });
            return false;
        }

        if(password.length < 8){
            setAlert({ message: 'Password must be at least 8 characters', severity: 'error', needed: true });
            return false;
        }

        if (!validEmail) {
            setAlert({ message: 'Invalid email', severity: 'error', needed: true });
            return false;
        }
        if (!validPhone) {
            setAlert({ message: 'Invalid phone number', severity: 'error', needed: true });
            return false;
        }
        if (password !== rePassword) {
            setAlert({ message: 'Passwords do not match', severity: 'error', needed: true });
            return false;
        }
        if (age < 10) {
            setAlert({ message: 'You must be at least 10 years old', severity: 'error', needed: true });
            return false;
        }
        if (!acceptedTerms) {
            setAlert({ message: 'You must accept the terms and conditions', severity: 'error', needed: true });
            return false;
        }
        return true;
    }

    const register = async () => {
        const registerData = new FormData();
        if (!validate()) return;
        const data = {
            firstName,
            lastName,
            phoneNumber,
            birthDate,
            otherInfo,
            username,
            email,
            password,
            gender,
            isOwner,
            verifyToken,
        }
        if (isOwner) {
            registerData.append('file', cv);
        }
        registerData.append('data', JSON.stringify(data));
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/register`, {
            headers: {
                'username': username
              },
            method: 'POST',
            body: registerData
        });
        const res = await response.json();
        if (res.error) {
            setAlert({ message: res.error, severity: 'error', needed: true });
        } else {
            setAlert({ message: 'Registered successfully', severity: 'success', needed: true });
            sendEmailVerifying(res)
            setTimeout(() => {
                document.querySelector('.verify-email-box').classList.add('verify-email-box-to-left');
                document.querySelector('.register-box').classList.add('register-box-to-left');
            }, [1000])
        }
    }

    const sendEmailVerifying = async (res) => {
        const EmailJsTemplateParams = {
            to_name: res.data.name,
            email: res.data.email,
            code: res.data.verifyToken
        }
        emailjs.send(process.env.React_APP_EmailJsServiceID, process.env.React_APP_EmailJsVerifyEmailTemplateID, EmailJsTemplateParams, process.env.React_APP_EmailJs_API_KEY);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row header">
                    <h1 className="text-center mt-5">Register</h1>
                </div>
            </div>
            <div className="register-page-boxes d-flex flex-column">
                <div className="register-box transtion-boxes">
                    <div className="container desc mt-2 text-center pb-4">
                        <h3 className="text-center mb-2 mt-3">Would you like to register as?</h3>
                        <div className="d-flex justify-content-center mt-3">
                            <ToggleButtonGroup type="radio" name="options">
                                <ToggleButton className="register-toggle-button" onClick={() => {
                                    setIsOwner(false);
                                    setOtherInfo('');
                                }} selected={!isOwner}>Apprentice</ToggleButton>
                                <ToggleButton className="register-toggle-button" onClick={() => {
                                    setIsOwner(true);
                                    setOtherInfo('');
                                }} selected={isOwner}>Owner</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    <div className="container desc p-3 mt-5 text-center">
                        <h3 className={fillInputClass}>Please fill all inputs</h3>
                        <div className="row register-row mt-3">
                            <div className="d-flex flex-column register-column">
                                <span>First Name</span>
                                {firstNameInput}
                            </div>
                            <div className="d-flex flex-column register-column">
                                <span>Last Name</span>
                                {lastNameInput}
                            </div>
                        </div>
                        <div className="row register-row">
                            <div className="register-column d-flex flex-column">
                                <span>Phone Number</span>
                                {phoneNumberInput}
                            </div>
                            <div className="register-column d-flex flex-column">
                                <span>Birth Date</span>
                                {birthDateInput}
                            </div>
                        </div>
                        <div className="row register-row">
                            <div className="register-column d-flex flex-column">
                                <span>
                                    {isOwner ? "Major" : "Study level"}
                                </span>
                                {isOwner && <input type="text" className="form-control defultInput register-input" value={otherInfo} onChange={(e) => setOtherInfo(e.target.value)} />}
                                {!isOwner && <select class="form-control defultInput register-input" value={otherInfo} onChange={e => setOtherInfo(e.target.value)} >
                                    <option>Choose...</option>
                                    <option>None</option>
                                    <option>Elementary School</option>
                                    <option>Middle School</option>
                                    <option>High School</option>
                                    <option>University</option>
                                </select>}
                            </div>
                            <div className="register-column d-flex flex-column gender-column">
                                <span>Gender</span>
                                <div>
                                    <input type="radio" className="form-check-input" id="male-radio" name="Gender"
                                        onChange={() => setGender('Male')} />
                                    <label for="male-radio" className="ms-1">Male</label>
                                    <input className="ms-3 form-check-input" type="radio" id="female-radio" name="Gender"
                                        onChange={() => setGender('Female')} />
                                    <label for="female-radio" className="ms-1">Female</label>
                                </div>
                            </div>
                        </div>
                        <div className="row register-row">
                            <div className="register-column d-flex flex-column">
                                <span>Username</span>
                                {usernameInput}
                            </div>
                            <div className="register-column d-flex flex-column">
                                <span>Email</span>
                                {emailInput}
                            </div>
                        </div>
                        <div className="row register-row">
                            <div className="register-column d-flex flex-column">
                                <span>Password</span>
                                {passwordInput}
                            </div>
                            <div className="register-column d-flex flex-column">
                                <span className="me-auto">Re-enter Password</span>
                                {rePasswordInput}
                            </div>
                        </div>
                        {isOwner && <div className="row register-row">
                            <div className="register-column d-flex flex-column">
                                <input type="file" className="form-control defultInput register-input"
                                 accept='text/plain, application/pdf, image/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                 onChange={e => {
                                    setCV(e.target.files[0]);
                                    setSnackBarInfo({ severity: 'success', message: 'CV uploaded successfully', open:true });
                                 }} />
                            </div>
                        </div>}
                        <div className="row register-row mt-3">
                            <div className="register-column d-flex">
                                <input type="checkbox" className="form-check-input" id="accept-check"
                                    onChange={e => {
                                        if (e.target.checked)
                                            setAcceptedTerms(true);
                                        else
                                            setAcceptedTerms(false);
                                    }}
                                    value={acceptedTerms} />
                                <label for="accept-check" className="ms-1 mb-auto">I agree to <Link>Terms of Use and Privacy Policy</Link></label>
                            </div>
                        </div>
                        {alert.needed && <Alert severity={alert.severity}> {alert.message} </Alert>}
                        <button className="mt-2 row register-confirm-btn ms-auto me-auto" onClick={register}>Register</button>
                    </div>
                </div>
                <VerifyEmail email={email} verify_token={verifyToken} from='register' />
            </div>

        </>
    )
}

export default Register