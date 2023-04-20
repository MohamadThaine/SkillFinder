import React from 'react';
import useInput from '../Hooks/useInput'
import '../Assets/Styles/ContactUs.css'
function ContactUs(){
    const [name, nameInput] = useInput({className:'col defultInput contact-us-input', type:'text', placeholder:'Full Name'})
    const [email, emailInput] = useInput({className:'col ms-2 defultInput contact-us-input', type:'email', placeholder:'Email'})
    const [subject, subjectInput] = useInput({className:'row mt-4 defultInput contact-us-input', type:'text', placeholder:'Subject'})
    return(
     <>
        <div className="container-fluid about-us">
            <div className='row header'>
                <h1 className="text-center mt-5">CONTACT US</h1>
            </div> 
         </div>
        <div className='d-flex align-items-center justify-content-center mt-5'>
            <div className='d-flex flex-column contact-us-form mt-5 desc p-5'>
             <div className='row text-center'>
                <h2 className='mb-3'>Please fill all inputs</h2>
                {nameInput}
                {emailInput}
             </div>
             {subjectInput}
             <textarea className='row mt-4 defultInput contact-us-desc' placeholder='Description Here..' />
             <button className='row mt-4 contact-us-submit mx-auto'>
                Submit
             </button>
             <small className='form-text text-muted mt-3'>* We'll never share your info with anyone else!</small>
            </div> 
        </div>
     </>
    )
}

export default ContactUs