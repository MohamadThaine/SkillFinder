import { useState } from "react"
import '../Assets/Styles/Register.css'

function Register(){
    const [isOwner, setIsOwner] = useState('');
    return(
        <div className="container text-center mt-5">
            <h3>Would you like to Register as?</h3>
            <div className="row mt-3 d-flex justify-content-center">
                <button className="col-md-5 register-type-btn" onClick={() => setIsOwner('true')}>
                    Owner
                </button>
                <button className="col-md-5 register-type-btn" onClick={() => setIsOwner('false')}>
                    Apprentice
                </button>
            </div>
            <div className="row mt-5">
                {isOwner == 'true' && <RegisterForOwner />}
                {isOwner == 'false' && <RegisterForApprentice />}
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