import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import GraphicDesign from '../Assets/Images/GraphicDesignExample.png';
import '../Assets/Styles/Apprenticeship.css'
import defalutMalePic from '../Assets/Images/defaultMalePic.svg';
import RatingIcon from '../Assets/Images/RatingIcon.svg';
import { useNavigate } from 'react-router-dom';

function Apprenticeship(){
    const { ID } = useParams();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [overview, setOverview] = useState('');
    const [duration, setDuration] = useState('');
    const [learningMethod, setLearningMethod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rating, setRating] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorPic, setAuthorPic] = useState();
    const [authorID, setAuthorID] = useState('');
    const [entrolledStudents, setEntrolledStudents] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/apprenticeship/' + ID)
        .then(res => res.json())
        .then(data => {
            if(data.error){
                navigate('/PageNotFound');
            }
            setName(data.apprenticeship.Name);
            setCategory(data.category.Name);
            setPrice(data.apprenticeship.Price + '$');
            setOverview(data.apprenticeship.Description);
            setDuration(data.apprenticeship.Duration + 'Months');
            if(data.apprenticeship.LearningMethod === '1') setLearningMethod('Online');
            else if(data.apprenticeship.LearningMethod) setLearningMethod('OnSite');
            else setLearningMethod('Online & OnSite');
            setStartDate(new Date(data.apprenticeship.Start_Date).toLocaleDateString());
            setEndDate(new Date(data.apprenticeship.End_Date).toLocaleDateString());
            setAuthorName(data.author.Name);
            if(data.authorPic != null) setAuthorPic(data.author.Picture);
            else setAuthorPic(defalutMalePic);
            setAuthorID(data.author.ID);
            if(data.enrolledStudents.enrolledStudentsCount != "0") setEntrolledStudents(data.enrolledStudents.enrolledStudentsCount);
            else setEntrolledStudents(0);
        })
    }, [])
    return(
        <div className="container desc apprenticeship mt-auto mb-auto">
            <div className='row first-section-of-app'>
                <div className='col'>
                    <div className='author text-center mb-3 mt-2'>
                        <img className="author-img" src={authorPic} />
                        <div className="author-name ms-3">
                            <h5>Author Name</h5>
                            <h5>{authorName}</h5>
                        </div>
                    </div>
                    <div className="row ms-2 text-center">
                        <h3>Name</h3>
                        <h5>{name}</h5>
                    </div>
                    <div className="row ms-2 text-center mt-4">
                        <h3>Category</h3>
                        <h5>{category}</h5>
                    </div>
                    <div className="row ms-2 text-center mt-4">
                        <h3>Price</h3>
                        <h5>{price}</h5>
                    </div>
                </div>
                <img className="col app-img me-auto ms-auto" src={GraphicDesign} />
                
            </div>
            <div className='row second-section-of-app'>
                <div className='col'>
                    <div className="row ms-2 text-center mt-4">
                        <h3>Overview</h3>
                        </div>
                    <div className="row ms-2 text-center mt-4">
                        <p>Graphic design is the art and practice of combining text, images, and other visual elements to create visually appealing and effective communication materials. It is a creative field that involves the use of typography, photography, illustration, color theory, and layout to convey a message or tell a story visually.</p>
                        <p>Graphic designers work in a variety of media including print, digital, and interactive design. They may create logos, brochures, flyers, websites, social media graphics, packaging, book covers, and more. The goal of graphic design is to create visual communication that is not only aesthetically pleasing but also communicates a clear message to the audience.</p>
                        </div>

                </div>
                <div className='col'>
                    <div className="row ms-2 text-center mt-4">
                        <h3>Duration</h3>
                        <h5>{duration}</h5>
                    </div>
                    <div className="row ms-2 text-center mt-2">
                        <h3>Location</h3>
                        <h5>{learningMethod}</h5>
                    </div>
                    <div className="row ms-2 text-center mt-2">
                        <h3>Start Date</h3>
                        <h5>{startDate}</h5>
                    </div>
                    <div className="row ms-2 text-center mt-2">
                        <h3>End Date</h3>
                        <h5>{endDate}</h5>
                    </div>
                </div>
            </div>
            <div className='row third-section-of-app'>
                <div className='col text-center'>
                    <button className="btn btn-primary">Apply</button>
                </div>
                <div className='col text-center'>
                    <button className="btn btn-primary">Contact</button>
                </div>
                <div className='col text-center'>
                    <button className="btn btn-primary">Pictures</button>
                </div>
            </div>
            <div className='row forth-section-of-app'>
                <div className='entrolled-students'>
                        <div className='col text-center'>
                            <h6>Enrolled Students</h6>
                            <h6>{entrolledStudents}</h6>
                        </div>
                </div>
                <div className='review-section'>
                    <div className='col text-center'>
                        <h6>Reviews</h6>
                        <div className='rating-info-app'>
                            <img src={RatingIcon} className='rating-star'/>
                            <h6 className='ms-1'>4.5 (500)</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Apprenticeship;