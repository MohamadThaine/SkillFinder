import { useState } from "react"
import useInput from '../Hooks/useInput'
import '../Assets/Styles/Register.css'
import { Link } from "react-router-dom";

function Register(){
    const [isOwner, setIsOwner] = useState(false);
    const [firstName, firstNameInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [lastName, lastNameInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [phoneNumber, phoneNumberInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [birthDate, birthDateInput] = useInput({type: 'date', className: 'defultInput register-input'});
    const [otherInfo, otherInfoInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [username, usernameInput] = useInput({type: 'text', className: 'defultInput register-input'});
    const [email, emailInput] = useInput({type: 'email', className: 'defultInput register-input'});
    const [password, passwordInput] = useInput({type: 'password', className: 'defultInput register-input'});
    const [rePassword, rePasswordInput] = useInput({type: 'password', className: 'defultInput register-input'});

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
                <button className={"register-type-btn " + (isOwner? 'type-active': '')} onClick={() => setIsOwner(true)}>
                    Owner
                </button>
                <button className={"register-type-btn " + (!isOwner? 'type-active': '')} onClick={() => setIsOwner(false)}>
                    Apprentice
                </button>  
            </div>
        </div>
        <div className="container desc p-3 mt-5 text-center">
            <h3 className="text-center mt-3">Please fill all inputs</h3>
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
                        <input type="radio" className="form-check-input" id="male-radio" name="Gender" />
                        <label for="male-radio" className="ms-1">Male</label>
                        <input className="ms-3 form-check-input" type="radio" id="female-radio" name="Gender" />
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
                    <input type="checkbox" className="form-check-input" id="accept-check"/>
                    <label for="accept-check" className="ms-1 mb-auto">I agree to <Link>Terms of Use and Privacy Policy</Link></label>
                </div>
            </div>
            <button className="mt-2 row register-confirm-btn ms-auto me-auto">Register</button>
        </div>
    </>  
    )
}

export default Register