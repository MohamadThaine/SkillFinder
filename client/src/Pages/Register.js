import { useState } from "react"
import '../Assets/Styles/Register.css'

function Register(){
    const [isOwner, setIsOwner] = useState('');
    return(
        <div className="container text-center mt-5">
            <h3>Would you like to Register as?</h3>
            
            <div className="row mt-5 d-flex justify-content-around">
                <div className="row">
                    <div className="d-flex flex-column register-column">
                        <p className="me-auto">First Name</p>    
                        <input className="defultInput register-input" type="text" />
                    
                    </div>
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Last Name</p>    
                        <input  className="defultInput register-input" type="text" />
                    
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Phone Number</p>    
                        <input className="defultInput register-input"  type="text" />
                    
                    </div>
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Birth Date</p>    
                        <input  className="defultInput register-input" type="date" />
                    
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Major</p>    
                        <input className="defultInput register-input"  type="text" />
                    
                    </div>
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Gender</p>    
                        <div className="me-auto">
                        <input  className="me-auto" type="radio" id="male-radio" name="Gender" />
                        <label for="male-radio" className="ms-1">Male</label>
                     
                        <input  className="me-auto ms-3" type="radio" id="female-radio" name="Gender" />
                        <label for="female-radio" className="ms-1">Female</label></div>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Username</p>    
                        <input className="defultInput register-input" type="text" />
                    
                    </div>
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Email</p>    
                        <input  className="defultInput register-input" type="email" />
                    
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Password</p>    
                        <input className="defultInput register-input" type="password" />
                    
                    </div>
                    <div className="col d-flex flex-column">
                        <p className="me-auto">Re-enter Password</p>    
                        <input  className="defultInput register-input" type="password" />
                    
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col d-flex">
                    <input type="checkbox" id="accept-check"/>
                    <label for="accept-check" className="ms-1">I agree to Terms of Use and Privacy Policy</label>
                    </div>
                </div>

                
                    <button className="row register-type-btn justify-content-center d-flex align-items-center ms-auto me-auto">Register</button>
                


            </div>

        </div>
    )
}

const RegisterForOwner = ({inputs}) => {
    return(
        <>
         Register For Owner 
        </>
    )
}

const RegisterForApprentice = ({inputs}) => {
    return(
        <>
         Register For Apprentice
        </>
    )
}

export default Register