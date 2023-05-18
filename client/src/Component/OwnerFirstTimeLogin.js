import React, { useState } from 'react';
import '../Assets/Styles/OwnerFirstTimeLogin.css'
import defaultMalePic from '../Assets/Images/defaultMalePic.svg'
import defaultFemalePic from '../Assets/Images/defaultFemalePic.svg'
import logo from '../Assets/Images/SkillFinderLogoNoTitle.png'
import { Button } from '@mui/material';

const OwnerFirstTimeLogin = ({ user, ownerInfo, setOwnerInfo, setSnackBarInfo }) => {

    const [picture, setPicture] = useState(user.Gender === 'Male' ? defaultMalePic : defaultFemalePic);
    const [file, setFile] = useState(null);
    const [finshed, setFinshed] = useState(false);
    const uploadPicture = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.onchange = () => {
            const file = fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setFile(file);
                    setPicture(reader.result);
                    setSnackBarInfo({ open: true, message: 'Picture uploaded successfully!', severity: 'success' });
                };
            }
        };
    }

    const handleUpload = () => {

        if (picture === defaultMalePic || picture === defaultFemalePic) {
            setSnackBarInfo({ open: true, message: 'Please upload a picture!', severity: 'error' });
            return;
        };
        const pictureData = new FormData();
        pictureData.append('file', file);
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/uploadProfilePicture/${user.id}`, {
            method: 'PUT',
            headers: {
                contentType: 'multipart/form-data',
                authorization: localStorage.getItem('token'),
            },
            body: pictureData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setSnackBarInfo({ open: true, message: data.error, severity: 'error' });
                }
                else {
                    setSnackBarInfo({ open: true, message: 'Picture uploaded successfully!', severity: 'success' });
                    setFinshed(true);
                    setTimeout(() => {
                        const version = Date.now();
                        const picturePath = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/` + data.path + `?v=${version}`;
                        const updatedOwnerInfo = { ...ownerInfo, Picture: picturePath };
                        localStorage.setItem('otherInfo', JSON.stringify(updatedOwnerInfo));
                        setOwnerInfo(updatedOwnerInfo);
                    }, 1200);
                    }
             })
            .catch(err => {
                setSnackBarInfo({ open: true, message: err.message, severity: 'error' });
            });
    }



    return (
        <>
            {!finshed && <div className="desc mt-auto mb-auto ps-5 pe-5 pb-3 pt-2 text-center first-time-page">
                <img src={logo} alt='logo' className='first-time-img' />
                <h1>Welcome to <span className="text-primary">SkillFinder</span></h1>
                <h3 className="mt-3">Congrats on your approval</h3>
                <div className="row mt-5">
                    <div className='col desc border p-4 me-5 get-started mb-3 first-time-box'>
                        <h3>Get Started</h3>
                        <div className="d-flex align-items-center mt-3">
                            <small className='circle-number'>1</small>
                            <p className='mt-auto mb-auto ms-2'>Please read our Terms and Policies</p>
                        </div>
                        <div className="d-flex align-items-center mt-4">
                            <small className='circle-number'>2</small>
                            <p className='mt-auto mb-auto ms-2'>Add a picture of yourself/your organization</p>
                        </div>
                        <div className="d-flex align-items-center mt-4">
                            <small className='circle-number'>3</small>
                            <p className='mt-auto mb-auto ms-2'>Read our FAQ to learn how to use SkillFinder</p>
                        </div>
                    </div>
                    <div className='col desc mb-3 first-time-box'>
                        <img src={picture} alt='your picture' className='userPic ms-5 me-5 mt-3' />
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant='contained' className='mt-4 mb-3' onClick={uploadPicture}>Upload Picture</Button>
                        </div>
                    </div>
                </div>
                <Button variant='contained' className='mt-5' onClick={handleUpload}>Finish</Button>
            </div>}
            {finshed && <div className="desc mt-auto mb-auto ps-5 pe-5 pb-3 pt-2 text-center first-time-page">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" className='mt-4 check-mark-first-time'>
                    <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                    <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                </svg>
                <h3 className='mt-5'>Thanks For Joining Us!</h3>
                <p className='mt-3'>You can now start using SkillFinder</p>
            </div>}
        </>

    )
}

export default OwnerFirstTimeLogin;

