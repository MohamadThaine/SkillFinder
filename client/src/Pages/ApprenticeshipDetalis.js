import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Assets/Styles/Apprenticeship.css'
import defalutMalePic from '../Assets/Images/defaultMalePic.svg';
import clockIcon from '../Assets/Images/clock-icon.svg';
import locationIcon from '../Assets/Images/location-icon.svg';
import calender from '../Assets/Images/calender.svg';
import calenderCheck from '../Assets/Images/calender-check.svg';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Typography } from '@mui/material';
import arrowRight from '../Assets/Images/arrow-right-solid.svg';
import arrowLeft from '../Assets/Images/arrow-left-solid.svg';
import HtmlContent from '../Component/HtmlContent';
import htmlToDraft from 'html-to-draftjs';
import EnrollToApprenticeship from '../Component/EnrollToApprenticeship';
import ContactOwner from '../Component/ContactOwner';
import ApprenticeshipReviews from '../Component/ApprenticeshipReviews';
import ApprenticeshipContent from '../Component/ApprenticeshipContent';
import AddContent from '../Component/AddContent';
import SignFreeTrail from '../Component/SignFreeTrail';

function ApprenticeshipDetalis({ setSnackBarInfo, socket }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [apprenticeshipMainInfo, setApprenticeshipMainInfo] = useState({});
    const [student, setStudent] = useState();
    const [isApproved, setIsApproved] = useState(false);
    const { ID } = useParams();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [overview, setOverview] = useState('');
    const [overviewText, setOverviewText] = useState('');
    const [duration, setDuration] = useState('');
    const [learningMethod, setLearningMethod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reviewsList, setReviewsList] = useState([]);
    const [freeTrail, setFreeTrail] = useState('');
    const [freeTrailStudent, setFreeTrailStudent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorPic, setAuthorPic] = useState();
    const [authorID, setAuthorID] = useState('');
    const [entrolledStudents, setEntrolledStudents] = useState('');
    const [enrolledStudentsList, setEnrolledStudentsList] = useState([]);
    const [openPictureModal, setOpenPictureModal] = useState(false);
    const [openReadMore, setOpenReadMore] = useState(false);
    const [owner, setOwner] = useState({ name: authorName, picture: authorPic, id: authorID });
    const [pictures, setPictures] = useState([]);
    const [mainPicture, setMainPicture] = useState('');
    const [address, setAddress] = useState({});
    const [simulation, setSimulation] = useState();
    const [openAddress, setOpenAddress] = useState(false);
    const [openEnroll, setOpenEnroll] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [openReviews, setOpenReviews] = useState(false);
    const [openFreeTrail, setOpenFreeTrail] = useState(false);
    const [resources, setResources] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [enrollText, setEnrollText] = useState(windowWidth > 768 ? 'Enroll Now' : 'Enroll');
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeship/` + ID + `/${user === null ? 'guest' : user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    navigate('/PageNotFound');
                    return;
                }
                if (data.apprenticeship.isApproved === 0 && data.author.ID !== user.id) {
                    navigate('/PageNotFound');
                    return;
                }
                if (user !== null) setStudent(data.student);
                setIsApproved(data.apprenticeship.isApproved);
                setName(data.apprenticeship.Name);
                setCategory(data.category.Name);
                if (data.apprenticeship.Price === 0) setPrice('Free');
                else setPrice('$' + data.apprenticeship.Price);
                setOverview(data.apprenticeship.Description);
                setOverviewText(htmlToDraft(data.apprenticeship.Description).contentBlocks.map(block => block.text).join(' '));
                setDuration(data.apprenticeship.Duration + ' ' + data.apprenticeship.DurationType);
                if (data.apprenticeship.LearningMethod === 1) setLearningMethod('Online');
                else if (data.apprenticeship.LearningMethod === 2) setLearningMethod('OnSite');
                else setLearningMethod('Online & OnSite');
                setStartDate(new Date(data.apprenticeship.Start_Date).toLocaleDateString());
                setEndDate(new Date(data.apprenticeship.End_Date).toLocaleDateString());
                setFreeTrail(data.apprenticeship.FreeTrial);
                setFreeTrailStudent(data.FreeTrailStudent);
                setAuthorName(data.author.Name);
                if (data.authorPic != null) setAuthorPic(data.authorPic);
                else setAuthorPic(defalutMalePic);
                setAuthorID(data.author.ID);
                if (data.enrolledStudents.enrolledStudentsCount != "0") setEntrolledStudents(data.enrolledStudents.enrolledStudentsCount);
                else setEntrolledStudents(0);
                setOwner({ name: data.author.Name, picture: data.authorPic, id: data.author.ID });
                setApprenticeshipMainInfo({
                    ID: data.apprenticeship.ID,
                    name: data.apprenticeship.Name,
                    freeTrailDuration: data.apprenticeship.FreeTrial,
                });
                setAddress(data.address);
                setReviewsList(data.reviews);
                setEnrolledStudentsList(data.enrolledStudentsList);
                setSimulation(data.simulation);
            })
    }, [ID])

    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/apprenticeship-pics/` + ID)
            .then(res => res.json())
            .then(data => {
                setPictures(data);
                setMainPicture(data[0])
            })
    }, [ID])

    const handleModal = (setOpened, opened) => {
        setOpened(!opened);
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setEnrollText(window.innerWidth > 768 ? 'Enroll Now' : 'Enroll')
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <>
            {isApproved === 0 && authorID === user.id && <div className='container-fluid not-approved-app'>
                <div className='row'>
                    <Typography variant='h5' className='col ms-3 p-2 not-approved-text'>Your apprenticeship is not approved yet this is just a demo!</Typography>
                </div>
            </div>}
            <div className='container-fluid app-img'>
                <img src={mainPicture} alt='Apprenticeship' className='full-width-image' />
                <div className='author'>
                    <img src={authorPic} alt='Author' className='author-img' />
                    <h5>{authorName}</h5>
                </div>
                <div className='row app-main-info text-center'>
                    <h4 className='col m-2'>{name}</h4>
                    <h4 className='col m-2'>{category}</h4>
                    <h4 className='col m-2'>{price}</h4>
                    <div className='col m-2'>
                        <h4>Participants</h4>
                        <h4>{entrolledStudents}</h4>
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
                            <div className='info-part' onClick={() => {
                                learningMethod !== 'Online' ? setOpenAddress(true) : setOpenAddress(false);
                            }}
                                style={{ cursor: learningMethod !== 'Online' ? 'pointer' : 'auto' }}
                            >
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
                        {windowWidth > 580 && <div className='row overview-info p-5'>
                            <HtmlContent htmlContent={overview.slice(0, 2500)} />
                            {overviewText.length > 1000 && <Button variant="outlined" color="primary"
                                onClick={() => handleModal(setOpenReadMore, openReadMore)}>
                                Read More
                            </Button>}
                        </div>}
                        {windowWidth < 580 && <div className='row overview-info p-5'>
                            <Button variant="outlined" color="primary" onClick={() => handleModal(setOpenReadMore, openReadMore)}>
                                Read More
                            </Button>
                        </div>}
                    </div>
                    <div className='col'>
                        <div className='row mt-5'>
                            <div className='row app-btn-container'>
                                {student === undefined && <button className='app-btn' onClick={() => handleModal(setOpenEnroll, openEnroll)}>{enrollText}</button>}
                                {student && student.isApproved === 0 && <button className='app-btn' disabled>Request Sent</button>}
                                {student && student.isApproved === 1 && <button className='app-btn' disabled>Enrolled</button>}
                                <button className='app-btn' onClick={() => handleModal(setOpenReviews, openReviews)}>Reviews</button>
                            </div>
                            <div className='row app-btn-container'>
                                <button className='app-btn' onClick={() => handleModal(setOpenPictureModal, openPictureModal)}>Picture</button>
                                <button className='app-btn' onClick={() => handleModal(setOpenContact, openContact)}>Contact</button>
                            </div>
                            <div className='row app-btn-container'>
                                {freeTrail > 0 && !student && <button className='app-btn' onClick={() => setOpenFreeTrail(true)}>Free Trail</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openReadMore && <ReadMoreModal open={openReadMore} handleClose={() => handleModal(setOpenReadMore, openReadMore)} overview={overview} />}
            {openPictureModal && <PicturesModal open={openPictureModal} handleClose={() => handleModal(setOpenPictureModal, openPictureModal)} pictures={pictures} />}
            {openAddress && <Address open={openAddress} handleClose={() => handleModal(setOpenAddress, openAddress)} address={address} />}
            {openEnroll && <EnrollToApprenticeship open={openEnroll} handleClose={() => handleModal(setOpenEnroll, openEnroll)} appID={ID} owner={owner} setSnackBarInfo={setSnackBarInfo} setStudent={setStudent} />}
            {openContact && <ContactOwner open={openContact} handleClose={() => handleModal(setOpenContact, openContact)} owner={owner} setSnackBarInfo={setSnackBarInfo} />}
            {openReviews && <ApprenticeshipReviews open={openReviews} handleClose={() => handleModal(setOpenReviews, openReviews)} apprenticeship={apprenticeshipMainInfo} owner={owner} setSnackBarInfo={setSnackBarInfo}
                reviewsList={reviewsList} setReviewsList={setReviewsList} windowWidth={windowWidth} student={student} />}
            {openFreeTrail && <SignFreeTrail open={openFreeTrail} handleClose={() => handleModal(setOpenFreeTrail, openFreeTrail)} setSnackBarInfo={setSnackBarInfo} app={apprenticeshipMainInfo} owner={owner} freeTrailStudent={freeTrailStudent} />}
            {((student && student.isApproved === 1) || (user && authorID === user.id) || (freeTrailStudent)) && <ApprenticeshipContent app={apprenticeshipMainInfo} setSnackBarInfo={setSnackBarInfo} 
            setResources={setResources} resources={resources} socket={socket} simulation={simulation} />}
            {user && authorID === user.id && isApproved && <AddContent setSnackBarInfo={setSnackBarInfo} appID={ID} appName={name} setResourceList={setResources} socket={socket} enrolledStudents={enrolledStudentsList} freeTrail={freeTrail} />}
            
        </>
    )
}

const PicturesModal = ({ handleClose, open, pictures }) => {
    const [mainPicture, setMainPicture] = useState(pictures[0]);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        setMainPicture(pictures[0]);
    }, [pictures])

    const PicturesRow = () => {
        return (
            <div className='pics-row mt-5'>
                {pictures.map((picture, index) => {
                    return (
                        <img src={picture} alt='Picture' className={'img-thumbnail ' + (mainPicture === picture ? 'selectedPic' : '')} key={index} onClick={() => changeMainPicute(picture)} />
                    )
                })}
            </div>
        )
    }

    const goLeft = () => {
        let index = pictures.indexOf(mainPicture);
        if (index == 0) setMainPicture(pictures[pictures.length - 1]);
        else setMainPicture(pictures[index - 1]);
    }

    const goRight = () => {
        let index = pictures.indexOf(mainPicture);
        if (index == pictures.length - 1) setMainPicture(pictures[0]);
        else setMainPicture(pictures[index + 1]);
    }

    const handleTouchStart = event => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchMove = event => {
        touchEndX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const touchDistance = touchEndX.current - touchStartX.current;
        if (touchDistance > 50) {
            goLeft();
        } else if (touchDistance < -50) {
            goRight();
        }
    };

    const changeMainPicute = (picture) => {
        setMainPicture(picture);
    }

    const fadeImg = (e) => {
        const img = e.currentTarget;
        img.className = 'main-pic fade-img';
        setTimeout(() => {
            img.className = 'main-pic';
        } , 1000);
    }

    if (pictures.length === 0) return null;

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className='center-modal container-fluid'>
                <div className='main-pic-con'
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}>
                    <img src={arrowLeft} alt='Arrow Left' className='arrow' onClick={goLeft} />
                    <img className='main-pic' src={mainPicture} alt='Main Picture' onLoad={fadeImg} />
                    <img src={arrowRight} alt='Arrow Right' className='arrow' onClick={goRight} />
                </div>
                <PicturesRow />
            </Box>
        </Modal>
    )
}

const ReadMoreModal = ({ handleClose, open, overview }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className='center-modal container' sx={{ background: 'white' }}>
                <HtmlContent htmlContent={overview} />
                <div className='text-center'>
                    <Button variant="outlined" color="primary" onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

const Address = ({ open, handleClose, address }) => {
    return (
        <>
            {address && <Modal open={open} onClose={handleClose}>
                <Box className='center-modal' sx={{ background: 'white', width: '40rem' }}>
                    <Typography variant='h5' className='text-center mb-2'>Address</Typography>
                    <Typography variant='h6' className='text-center mb-3'>City: {address.City}</Typography>
                    <Typography variant='h6' className='text-center mb-3'>Street Number: {address.Street_NO}</Typography>
                    <Typography variant='h6' className='text-center mb-3'>Street Name: {address.Street_Name}</Typography>
                    <Typography variant='h6' className='text-center mb-3'>Description</Typography>
                    <textarea className='form-control mb-2' rows='5' value={address.Description} readOnly />
                    <div className='text-center'>
                        <Button variant="outlined" color="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>}
        </>
    )
}



export default ApprenticeshipDetalis;