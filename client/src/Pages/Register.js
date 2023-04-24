import { useState, useRef } from "react"
import useInput from '../Hooks/useInput'
import '../Assets/Styles/Register.css'
import { Link, useNavigate } from "react-router-dom";
import randomstring from 'randomstring';

export var Verify_Token = "";

function Register(){
    const [isOwner, setIsOwner] = useState(false);
    const [firstName, firstNameInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [lastName, lastNameInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [phoneNumber, phoneNumberInput] = useInput({type: 'tel', className: 'defultInput register-input'});
    const [birthDate, birthDateInput] = useInput({type: 'date', className: 'defultInput register-input'});
    const [otherInfo, otherInfoInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [username, usernameInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [email, emailInput] = useInput({type: 'email', className: 'defultInput register-input'});
    const [password, passwordInput] = useInput({type: 'password', className: 'defultInput register-input'});
    const [rePassword, rePasswordInput] = useInput({type: 'password', className: 'defultInput register-input'});
    const [fillInputClass, setFillInputClass] = useState('mt-2');
    const [gender, setGender] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const navigate = useNavigate();
    const statusRef = useRef();
    const validate = () => {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validPhone = /^[0-9]{10}$/.test(phoneNumber);
        const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
        if(firstName === '' || lastName === '' || phoneNumber === '' || birthDate === '' || otherInfo === '' || username === '' || email === '' || password === '' || rePassword === '', gender === ''){
            setFillInputClass('mt-2 shaking');
            setTimeout(() => {
                setFillInputClass('mt-2');
            }, [500])
            return false;
        }
        if(!validEmail){
            statusRef.current.innerHTML = 'Invalid email';
            statusRef.current.className = 'failed';
            return false;
        }
        if(!validPhone){
            statusRef.current.innerHTML = 'Invalid phone number';
            statusRef.current.className = 'failed';
            return false;
        }
        if(password !== rePassword){
            statusRef.current.innerHTML = 'Passwords do not match';
            statusRef.current.className = 'failed';
            return false;
        }
        if(age < 10){
            statusRef.current.innerHTML = 'You must be at least 10 years old';
            statusRef.current.className = 'failed';
            return false;
        }
        if(!acceptedTerms){
            statusRef.current.innerHTML = 'You must accept the terms';
            statusRef.current.className = 'failed';
            return false;
        }
        return true;
    }

    const register = async () => {
        if(!validate()) return;
        Verify_Token = randomstring.generate(20);
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
            Verify_Token
        }
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const res = await response.json();
        if(res.error){
            statusRef.current.innerHTML = res.error;
            statusRef.current.className = 'failed';
        }else{
            statusRef.current.innerHTML = 'Register success';
            statusRef.current.className = 'succesfull';
        }
    }

    return(
    <>
        <div className="container-fluid">
            <div className="row header">
                <h1 className="text-center mt-5">Register</h1>
            </div>
        </div>
        <div className="container desc mt-2 text-center pb-4">
            <h3 className="text-center mb-2">Would you like to register as?</h3>
            <div className="d-flex justify-content-center">
                <button className={"register-type-btn " + (!isOwner? 'type-active': '')} onClick={() => setIsOwner(false)}>
                    Apprentice
                </button>  
                <button className={"register-type-btn " + (isOwner? 'type-active': '')} onClick={() => setIsOwner(true)}>
                    Owner
                </button>
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
                    {otherInfoInput}
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
            <div className="row register-row mt-3">
                <div className="register-column d-flex">
                    <input type="checkbox" className="form-check-input" id="accept-check"
                        onChange={e => {
                            if(e.target.checked)
                                setAcceptedTerms(true);
                            else
                                setAcceptedTerms(false);
                        }}
                        value={acceptedTerms}/>
                    <label for="accept-check" className="ms-1 mb-auto">I agree to <Link>Terms of Use and Privacy Policy</Link></label>
                </div>
            </div>
            <h5 ref={statusRef}>    </h5>
            <button className="mt-2 row register-confirm-btn ms-auto me-auto" onClick={register}>Register</button>
        </div>
    </>  
    )
}

export default Register