import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Carpenters from '../Assets/Images/CarpentersExample.png';
import '../Assets/Styles/Apprenticeship.css'
import defalutMalePic from '../Assets/Images/defaultMalePic.svg';
import RatingIcon from '../Assets/Images/RatingIcon.svg';
import clockIcon from '../Assets/Images/clock-icon.svg';
import locationIcon from '../Assets/Images/location-icon.svg';
import calender from '../Assets/Images/calender.svg';
import calenderCheck from '../Assets/Images/calender-check.svg';
import { useNavigate } from 'react-router-dom';
import { Box, Modal } from '@mui/material';
import arrowRight from '../Assets/Images/arrow-right-solid.svg';
import arrowLeft from '../Assets/Images/arrow-left-solid.svg';

function ApprenticeshipDetalis(){
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
    const [openPictureModal, setOpenPictureModal] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeship/` + ID)
        .then(res => res.json())
        .then(data => {
            if(data.error){
                navigate('/PageNotFound');
                return;
            }
            setName(data.apprenticeship.Name);
            setCategory(data.category.Name);
            if(data.apprenticeship.Price === 0) setPrice('Free');
            else setPrice('$' + data.apprenticeship.Price);
            setOverview(data.apprenticeship.Description);
            setDuration(data.apprenticeship.Duration + ' Months');
            if(data.apprenticeship.LearningMethod === 1) setLearningMethod('Online');
            else if(data.apprenticeship.LearningMethod === 2) setLearningMethod('OnSite');
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

    const imgStyle = {
        backgroundImage: `url(${Carpenters})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const handleModal = (setOpened, opened) => {
        setOpened(!opened);
    }

    return(
        <>
            <div className='container-fluid app-img' style={imgStyle}>
                <div className='author'>
                    <img src={authorPic} alt='Author' className='author-img' />
                    <div className='author-info'>
                        <h5>{authorName}</h5>
                    </div>
                </div>
            </div>
            <div className='container-fluid p-5'>
                <div className='row'>
                    <div className='overview'>
                        <div className='row'>
                            <div className='info-part'>
                                <img src={clockIcon} alt='Clock Icon' />
                                <div>
                                    <h5>Duration</h5>
                                    <p>{duration}</p>
                                </div>
                            </div>
                            <div className='info-part'>
                                <img src={locationIcon} alt='Location Icon' />
                                <div>
                                    <h5>Location</h5>
                                    <p>{learningMethod}</p>
                                </div>
                            </div>
                            <div className='info-part'>
                                <img src={calender} alt='Calender Icon' />
                                <div>
                                    <h5>Start Date</h5>
                                    <p>{startDate}</p>
                                </div>
                            </div>
                            <div className='info-part'>
                                <img src={calenderCheck} alt='Calender Check Icon' />
                                <div>
                                    <h5>End Date</h5>
                                    <p>{endDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className='row overview-info p-5'>
                        <p>Graphic design is the art and practice of combining text, images, and other visual elements to create visually appealing and effective communication materials. It is a creative field that involves the use of typography, photography, illustration, color theory, and layout to convey a message or tell a story visually.</p>
                        <p>Graphic designers work in a variety of media including print, digital, and interactive design. They may create logos, brochures, flyers, websites, social media graphics, packaging, book covers, and more. The goal of graphic design is to create visual communication that is not only aesthetically pleasing but also communicates a clear message to the audience.</p>
                        <p>Graphic design is the art and practice of combining text, images, and other visual elements to create visually illustration, color theory, and layout to convey a message or tell a story visually.</p>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row app-main-info me-auto ms-auto text-center mt-4'>
                            <h3 className='col'>{name}</h3>
                            <h3 className='col'>{category}</h3>
                            <h3 className='col'>{price}</h3>
                            <div className='col'>
                                <h3>Participants</h3>
                                <h3 className='text-center'>{entrolledStudents}</h3>
                            </div>
                        </div>
                        <div className='row mt-5'>
                            <div className='row app-btn-container'>
                                <button className='app-btn'>Enroll Now</button>
                                <button className='app-btn'>Reviews</button>
                            </div>
                            <div className='row app-btn-container'>
                                <button className='app-btn' onClick={() => handleModal(setOpenPictureModal, openPictureModal)}>Picture</button>
                                <button className='app-btn'>Contact</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PicturesModal open={openPictureModal} handleClose={() => handleModal(setOpenPictureModal, openPictureModal)} />
        </>
    )
}

const PicturesModal = ({handleClose, open, ID}) => {
    const [pictures, setPictures] = useState([]);
    const [mainPicture, setMainPicture] = useState();


    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeship-pics/` + 1)
        .then(res => res.json())
        .then(data => {
            setPictures(data);
            setMainPicture(data[0]);
            console.log(mainPicture)
        })
        
    }, [])

    const PicturesRow = () => {
        return(
            <div className='pics-row mt-5'>
                {pictures.map((picture, index) => {
                    return(
                        <img src={picture} alt='Picture' className={'img-thumbnail ' + (mainPicture === picture? 'selectedPic': '')} key={index} onClick={changeMainPicute} />
                    )
                })}
            </div>
        )
    }

    const goLeft = () => {
        let index = pictures.indexOf(mainPicture);
        if(index == 0) setMainPicture(pictures[pictures.length - 1]);
        else setMainPicture(pictures[index - 1]);
    }

    const goRight = () => {
        let index = pictures.indexOf(mainPicture);
        if(index == pictures.length - 1) setMainPicture(pictures[0]);
        else setMainPicture(pictures[index + 1]);
    }

    const changeMainPicute = (e) => {
        setMainPicture(e.target.src);
    }

    const fadeImg = (e) => {
        const img = e.currentTarget;
        img.className = 'main-pic fade-img';
        setTimeout(() => {
            img.className = 'main-pic';
        }
        , 1000);
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className='center-modal container-fluid'>
                <h2 className='text-center'>Apprenticeship Picture</h2>
                <div className='main-pic-con'>
                    <img src={arrowLeft} alt='Arrow Left' className='arrow' onClick={goLeft} />
                    <img className='main-pic' src={mainPicture} alt='Main Picture' onLoad={fadeImg} />
                    <img src={arrowRight} alt='Arrow Right' className='arrow' onClick={goRight} />
                </div>
                <PicturesRow />
            </Box>
        </Modal>
    )
}


export default ApprenticeshipDetalis;