import { useNavigate } from 'react-router-dom'
import '../Assets/Styles/AboutUs.css'
function AboutUs(){
    const navigate = useNavigate();
    return(
        <>
         <div className="container-fluid about-us">
            <div className='row header'>
                <h1 className="text-center mt-5">WHAT WE DO</h1>
            </div> 
         </div>
         <div className='container'>
         <div className="row mt-3 desc">
                <WhatWeDo />
                <div className='text-center mt-2'>
                    <button className='contact-us-btn'
                     onClick={() => navigate('/ContactUs')}>Contact Us!</button>
                </div>
                
            </div>
         </div>
        </>
    )
}

const WhatWeDo = () => {
    return(
        <>
        <p>Welcome to SkillFinder, an apprenticeship program that helps individuals develop the skills they need to excel in their chosen profession. We offer a range of apprenticeship programs across various industries, designed to provide hands-on experience, mentorship, and training to individuals looking to gain practical skills and knowledge.</p>
        <p>Our mission is to bridge the gap between education and industry by connecting aspiring professionals with experienced mentors and employers. We believe in a practical, hands-on approach to learning, which is why our programs are designed to give participants the opportunity to learn on-the-job while receiving guidance and support from their mentors.</p>
        <p>At SkillFinder, we understand that each individual has unique career aspirations and goals. That's why we offer a range of apprenticeship programs across various industries, including:</p>
        <ul>
            <li>Information technology</li>
            <li>Healthcare</li>
            <li>Construction</li>
            <li>Manufacturing</li>
            <li>Automotive</li>
        </ul>
        <p>Our programs vary in duration and level of expertise, and are tailored to meet the needs of individuals at various stages of their careers. Whether you're just starting out in your profession or looking to advance your skills, we have a program that can help you achieve your goals.</p>
        <p>As a SkillFinder apprentice, you will receive:</p>
        <ul>
            <li>On-the-job training and experience</li>
            <li>Mentorship from experienced professionals in your field</li>
            <li>Classroom instruction to supplement your hands-on learning</li>
            <li>Certification upon completion of the program</li>
            <li>Opportunities to network and connect with industry professionals</li>
        </ul>
        <p>We believe that apprenticeship is a valuable way for individuals to gain the skills and knowledge they need to succeed in their careers. If you're interested in learning more about our programs or applying to become a SkillFinder apprentice, please contact us today.</p>
        </>
    )
}

export default AboutUs;