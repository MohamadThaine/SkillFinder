import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Modal, Rating, Typography } from "@mui/material";
import { lightGreen, orange } from '@mui/material/colors';
import defalutMalePic from '../Assets/Images/defaultMalePic.svg';
import defalutFemalePic from '../Assets/Images/defaultFemalePic.svg';
import '../Assets/Styles/ApprenticeshipReviews.css';

const ApprenticeshipReviews = ({ open, handleClose, apprenticeship, reviewsList, setReviewsList, setSnackBarInfo, owner, windowWidth, student }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        if (reviewsList.length > 0) {
            let sum = 0;
            reviewsList.forEach(review => {
                sum += review.Rating_Value;
            })
            setAverageRating(sum / reviewsList.length);
        }
        if (reviewsList.length > 0 && student) {
            setHasReviewed(reviewsList.some(review => review.Apprentice_ID === user.id));
        }
    }, [reviewsList])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const validateReview = () => {
        if (rating === 0) {
            setSnackBarInfo({ severity: 'error', message: 'Please select a rating', open: true });
            return false;
        }
        if (review.length < 10) {
            setSnackBarInfo({ severity: 'error', message: 'Please enter a review of at least 10 characters', open: true });
            return false;
        }
        return true;
    }

    const handleAddReview = async () => {
        if (!validateReview()) return;
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/addReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token')
            },
            body: JSON.stringify({
                userID: user.id,
                appID: apprenticeship.ID,
                rating: rating,
                content: review,
                Name: user.Name,
                Gender: user.Gender
            })
        }).then(res => res.json()).then(data => {
            if (data.error) {
                setSnackBarInfo({ severity: 'error', message: 'error while adding review try again later', open: true });
            } else {
                setSnackBarInfo({ severity: 'success', message: 'Review added successfully', open: true });
                setReviewsList([...reviewsList, data]);
                setReview('');
                setRating(0);
                setHasReviewed(true);
            }
        }).catch(err => {
            console.log(err);
            setSnackBarInfo({ severity: 'error', message: err.error, open: true });
        })
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={'center-modal container review-modal ' + (windowWidth > 990 ? '' : 'scroll-review-mobile')} sx={{ background: 'white' }}>
                <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className='close-review bi bi-x' viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M.146 0a.5.5 0 0 1 .708 0L8 7.293 15.146.146a.5.5 0 1 1 .708.708L8.707
                    8l6.147 6.146a.5.5 0 0 1-.708.708L8 8.707l-6.146
                    6.147a.5.5 0 0 1-.708-.708L7.293 8 .146
                    1.854A.5.5 0 0 1 .146
                    0z" />
                </svg>
                <h1 className='text-center'>Reviews</h1>
                <div className='reviews-info'>
                    <div className='app-reviews-info row m-auto border-bottom'>
                        <div className={'app-reviews-info-chart mb-3 ' + (windowWidth > 990 ? 'col-5' : 'col-12')}>
                            <h1 className='text-center'>{averageRating}</h1>
                            <div className='chart-row'>
                                <Typography variant='body1'>5 Stars</Typography>
                                <LinearProgress variant="determinate" color='success' value={reviewsList.filter(review => review.Rating_Value === 5).length / reviewsList.length * 100} />
                            </div>
                            <div className='chart-row'>
                                <Typography variant='body1'>4 Stars</Typography>
                                <LinearProgress variant="determinate" color="inherit" sx={{ color: lightGreen[500] }} value={(reviewsList.filter(review => 4 <= review.Rating_Value && review.Rating_Value < 5).length / reviewsList.length) * 100} />
                            </div>
                            <div className='chart-row'>
                                <Typography variant='body1'>3 Stars</Typography>
                                <LinearProgress variant="determinate" color="inherit" sx={{ color: orange[300] }} value={reviewsList.filter(review => 3 <= review.Rating_Value && review.Rating_Value < 4).length / reviewsList.length * 100} />
                            </div>
                            <div className='chart-row'>
                                <Typography variant='body1'>2 Stars</Typography>
                                <LinearProgress variant="determinate" color='warning' value={reviewsList.filter(review => 2 <= review.Rating_Value && review.Rating_Value < 3).length / reviewsList.length * 100} />
                            </div>
                            <div className='chart-row'>
                                <Typography variant='body1'>1 Stars</Typography>
                                <LinearProgress variant="determinate" color='error' value={reviewsList.filter(review => 1 <= review.Rating_Value && review.Rating_Value < 2).length / reviewsList.length * 100} />
                            </div>
                        </div>
                        <div className={'app-owner-info col ' + (windowWidth > 990 ? 'text-center ms-5' : 'text-center mt-3')}>
                            <h3>{apprenticeship.name}</h3>
                            <h4>{owner.name}</h4>
                        </div>
                    </div>
                    <div className='app-reviews-list row'>
                        {user && student && student.isApproved === 1  && <div className={'add-review mt-4 text-center ' + (windowWidth > 990 ? 'col-3 ms-2' : 'col-12')}>
                            <div className='rating'>
                                <Rating value={rating} precision={0.5} onChange={(event, newValue) => {
                                    setRating(newValue);
                                }} />
                            </div>
                            <textarea className='form-control mb-2 mt-2' placeholder='Write your review here...' onChange={(e) => setReview(e.target.value)} />
                            <Button variant='contained' onClick={handleAddReview}>
                                Submit
                            </Button>
                        </div>}
                        <div className={'reviews-list mt-4 ' + (windowWidth > 990 ? 'row col ms-4' : 'col-12')}>
                            {reviewsList.length > 0 ? reviewsList.map(review => <Review key={review.ID} review={review} windowWidth={windowWidth} />) : <h3 className='text-center'>No Reviews Yet</h3>}
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

const Review = ({ review, windowWidth }) => {
    const [date, setDate] = useState(new Date(review.Date).toLocaleDateString());
    return (
        <div className={'review ' + (windowWidth > 990 ? 'col-6 m-auto mb-4' : 'col')}>
            <div className='review-info d-flex align-items-center mb-4'>
                <img src={review.Gender === 'Male' ? defalutMalePic : defalutFemalePic} alt='default' className='review-pic ms-2 me-3' />
                <div>
                    <h5 className='me-3'>{review.Name}</h5>
                    <small>{date}</small>
                </div>
                <Rating value={review.Rating_Value} precision={0.5} readOnly className='mb-2' />
            </div>
            <textarea className='form-control' readOnly value={review.Content} />
        </div>
    );
};

export default ApprenticeshipReviews;

