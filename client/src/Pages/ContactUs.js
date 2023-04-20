import React, { useEffect, useRef, useState } from 'react';
import useInput from '../Hooks/useInput'
import { browserName, browserVersion } from "react-device-detect";
import emailjs from '@emailjs/browser';
import '../Assets/Styles/ContactUs.css'

function ContactUs(){
    const [name, nameInput] = useInput({className:'col defultInput contact-us-input', type:'text', placeholder:'Full Name'})
    const [email, emailInput] = useInput({className:'col ms-2 defultInput contact-us-input', type:'email', placeholder:'Email'})
    const [subject, subjectInput] = useInput({className:'row mt-4 defultInput contact-us-input', type:'text', placeholder:'Subject'})
    const statusRef = useRef();
    const [headerClass, setHeaderClass] = useState('mb-3');
    const [description, setDescription] = useState('');
    var EmailJsTemplateParams = {
        from_name: name,
        Title: subject,
        Browser_Name: browserName,
        BrowserVersion: browserVersion,
        Email: email,
        Description: description
    };
    

    const sendReport = () => {
        const validEmailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(subject === '' || description === '' || email === '' || name === ''){
            setHeaderClass('mb-3 shaking');
            setTimeout(() => {
                setHeaderClass('mb-3');
            }, [500])
            return;
        }

        if(!email.match(validEmailRegex)){
            statusRef.current.innerText = 'Email is not valid!';
            statusRef.current.className = 'text-center mt-3 failedReport';
            setTimeout(() => {
                statusRef.current.className = 'text-center mt-3 failedReport';
            },[500])
            return;
        }

        emailjs.send(process.env.React_APP_EmailJsServiceID , process.env.React_APP_EmailJsTemplateID , EmailJsTemplateParams ,  process.env.React_APP_EmailJs_API_KEY)
        .then(() => {
            statusRef.current.innerText = 'Report has been sent we will content you by email within 48 hours';
            statusRef.current.className = 'text-center mt-3 succesfullReport';
        }).catch((error) => {
            statusRef.current.innerText = 'Report has not been sent error code:' + error.code;
            statusRef.current.className = 'text-center mt-3 failedReport';
        })
    }

    onkeyup = (key) => {
        if(key.which == 13){
            sendReport();
        }
    }

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
                <h2 className={headerClass}>Please fill all inputs</h2>
                {nameInput}
                {emailInput}
             </div>
             {subjectInput}
             <textarea className='row mt-4 defultInput contact-us-desc' placeholder='Description Here..' value={description}
                        onChange={(e) => setDescription(e.target.value)} />
             <button className='row mt-4 contact-us-submit mx-auto'
                     onClick={sendReport}>
                Submit
             </button>
             <p className='text-center mt-3' ref={statusRef}></p>
             <small className='form-text text-muted mt-1'>* We'll never share your info with anyone else!</small>
             
            </div> 
        </div>
     </>
    )
}

export default ContactUs