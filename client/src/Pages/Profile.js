import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defalutMalePic from '../Assets/Images/defaultMalePic.svg'
import defalutFemalePic from '../Assets/Images/defaultFemalePic.svg'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import '../Assets/Styles/Profile.css'
import ChangePassowrd from '../Component/ChangePassword';
import ChangeEmail from '../Component/ChangeEmail';
import { checkUniqueEmail, checkUniquePhone } from '../utils/uniqueValidator';


function Profile({ user, setUser, otherInfo, setOtherInfo, setSnackBarInfo }) {
    const [userCopy, setUserCopy] = useState(JSON.parse(localStorage.getItem('user')))
    const [otherInfoCopy, setOtherInfoCopy] = useState(JSON.parse(localStorage.getItem('otherInfo')))
    const [picture, setPicture] = useState(userCopy && otherInfo.Picture ? otherInfo.Picture : (userCopy && user.Gender === 'Male') ? defalutMalePic : defalutFemalePic)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [isEdtining, setIsEditing] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [verifyEmailOpen, setVerifyEmailOpen] = useState(false)
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/Login');
            setSnackBarInfo({ severity: 'error', message: 'Please login to continue', open: true })
        }
    }, [user])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    }, [])

    const handleValueChange = (e, valueName) => {
        const value = e.target.value;
        setUserCopy({ ...userCopy, [valueName]: value })
    }

    const handleChangePicture = () => {
        if(user.User_Type === 1) return;
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (!uploadPicture(file)) return;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setPicture(e.target.result);
                setOtherInfo({ ...otherInfo, Picture: e.target.result })
                localStorage.setItem('otherInfo', JSON.stringify({ ...otherInfo, Picture: e.target.result }))
            }
        }
    }

    const uploadPicture = async (picture) => {
        const pictureData = new FormData();
        pictureData.append('file', picture);
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/uploadProfilePicture/${user.id}`, {
            method: 'PUT',
            headers: {
                contentType: 'multipart/form-data',
                authorization: localStorage.getItem('token'),
            },
            body: pictureData
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    setSnackBarInfo({ open: true, message: data.error, severity: 'error' });
                    return false;
                }
                else {
                    setSnackBarInfo({ open: true, message: 'Picture uploaded successfully!', severity: 'success' });
                    return false;
                }
            })
            .catch(err => {
                setSnackBarInfo({ open: true, message: err.message, severity: 'error' });
                return false;
            });
        return true;
    }

    const compareData = () => (
        userCopy.Name !== user.Name ||
        userCopy.Email !== user.Email ||
        userCopy.Phone_Number !== user.Phone_Number ||
        (user.User_Type === 2 && otherInfoCopy.Major !== otherInfo.Major) ||
        (user.User_Type === 1 && otherInfoCopy.Study_Level !== otherInfo.Study_Level)
    );

    const verifyData = () => {
        if (!userCopy.Name || !userCopy.Email || !userCopy.Phone_Number) {
            setSnackBarInfo({ open: true, message: 'Please fill all the required fields!', severity: 'error' });
            return false;
        }
        const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!validEmail.test(userCopy.Email)) {
            setSnackBarInfo({ open: true, message: 'Please enter a valid email!', severity: 'error' });
            return false;
        }
        const validPhone = /^\d{10}$/;
        if (!validPhone.test(userCopy.Phone_Number)) {
            setSnackBarInfo({ open: true, message: 'Please enter a valid phone number!', severity: 'error' });
            return false;
        }
        if (user.User_Type === 2 && otherInfoCopy.Major === '') {
            setSnackBarInfo({ open: true, message: 'Please fill a major!', severity: 'error' });
            return false;
        }
        if (user.User_Type === 1 && otherInfoCopy.Study_Level === '') {
            setSnackBarInfo({ open: true, message: 'Please fill a study level!', severity: 'error' });
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (isEmailVerified) {
            setIsEditing(false);
            setVerifyEmailOpen(false);
            handleSaveEdit();
            setSnackBarInfo({ open: true, message: 'Email changed successfully!', severity: 'success' });
        }
    }, [isEdtining, isEmailVerified])

    const handleSaveEdit = async () => {
        if (!verifyData()) return;
        if (!compareData()) {
            setIsEditing(false);
            return setSnackBarInfo({ open: true, message: 'No changes to save!', severity: 'warning' });
        };

        if(userCopy.Phone_Number !== user.Phone_Number){
            const isUnique = await checkUniquePhone(userCopy.Phone_Number);
            if (!isUnique) return setSnackBarInfo({ open: true, message: 'Phone number already exists!', severity: 'error' });
        }

        if (userCopy.Email !== user.Email && !isEmailVerified) {
            const isUnique = await checkUniqueEmail(userCopy.Email);
            if (!isUnique) return setSnackBarInfo({ open: true, message: 'Email already exists!', severity: 'error' });
            setVerifyEmailOpen(true);
            return;
        }
        const data = {
            user: userCopy,
            otherInfo: otherInfoCopy.Major ? otherInfoCopy.Major : otherInfoCopy.Study_Level ? otherInfoCopy.Study_Level : null
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/updateUser/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    setSnackBarInfo({ open: true, message: 'Error While saving changes please try again!', severity: 'error' });
                    return;
                }
                else {
                    setSnackBarInfo({ open: true, message: 'Profile updated successfully!', severity: 'success' });
                    setUser(userCopy);
                    localStorage.setItem('user', JSON.stringify(userCopy));
                    setOtherInfo(otherInfoCopy);
                    localStorage.setItem('otherInfo', JSON.stringify(otherInfoCopy));
                    setIsEditing(false);
                }
            })
            .catch(err => {
                setSnackBarInfo({ open: true, message: err.message, severity: 'error' });
            });
    }

    return (
        <>
            {user && <div className='container mt-auto mb-auto desc profile'>
                <div className='row'>
                    <div className={'profile-box ' + (windowWidth > 990 ? 'col-3 ms-3' : 'col-11 m-auto')}>
                        <div className='picture-img-box'>
                            <img src={picture} alt='avatar' className='profile-img mb-3' />
                            {user && userCopy.User_Type === 2 &&
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-camera change-owner-pic" viewBox="0 0 16 16" onClick={handleChangePicture}>
                                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                </svg>}
                        </div>
                        {user && <h4>{user.Name}</h4>}
                    </div>
                    <div className={windowWidth > 999 ? 'col-8' : 'col mt-2'}>
                        <div className='row'>
                            <h5 className={'text-center ' + (windowWidth > 999 ? 'col-9 ms-5' : 'col-12')}>Personal Details</h5>
                            <Button variant='outlined' className={'col ' + (windowWidth > 990 ? '' : 'ms-5 me-5')}
                                onClick={() => {
                                    if (isEdtining) {
                                        handleSaveEdit();
                                    }
                                    else {
                                        setIsEmailVerified(false);
                                        setIsEditing(true)
                                    }
                                }}>
                                {isEdtining ? 'Save Changes' : 'Edit Profile'}
                            </Button>
                        </div>
                        <div className={'row mt-3 ' + (windowWidth > 990 ? 'ms-5' : 'm-auto')}>
                            <TextField label='Name' variant='outlined' className='col mb-3' value={userCopy.Name} disabled={!isEdtining}
                                onChange={e => handleValueChange(e, 'Name')} />
                            <TextField label='Email' variant='outlined' className='col ms-3 mb-3' value={userCopy.Email} disabled={!isEdtining}
                                onChange={e => handleValueChange(e, 'Email')} />
                        </div>
                        <div className={'row mt-3 ' + (windowWidth > 990 ? 'ms-5' : 'm-auto')}>
                            <TextField label='Username' variant='outlined' className='col mb-3' value={userCopy.Username} disabled />
                            <TextField label='Phone Number' type='number' variant='outlined' className='col ms-3 mb-3' value={userCopy.Phone_Number} disabled={!isEdtining}
                                onChange={e => handleValueChange(e, 'Phone_Number')} />
                        </div>
                        <div className={'row mt-3 ' + (windowWidth > 990 ? 'ms-5' : 'm-auto')}>
                            <TextField label='Birth Date' type='date' variant='outlined' className='col mb-3' value={userCopy.Birth_Date} disabled />
                            <TextField label='Gender' variant='outlined' className='col ms-3 mb-3' value={userCopy.Gender} disabled />
                        </div>
                        <div className={'row mt-3 ' + (windowWidth > 990 ? 'ms-5' : 'm-auto')}>
                            {otherInfo && userCopy.User_Type === 2 && <TextField label='Major' variant='outlined' className='col mb-3' value={otherInfoCopy.Major} disabled={!isEdtining}
                                onChange={e => setOtherInfoCopy({ ...otherInfo, Major: e.target.value })} />}
                            {otherInfo && userCopy.User_Type === 1 &&
                                <FormControl className='col'>
                                    <InputLabel id='study_level_selector'>Study Level</InputLabel>
                                    <Select labelId='study_level_selector' label='Study Level' variant='outlined' value={otherInfoCopy.Study_Level} disabled={!isEdtining}
                                        onChange={e => setOtherInfoCopy({ ...otherInfo, Study_Level: e.target.value })}>
                                        <MenuItem value='None'>None</MenuItem>
                                        <MenuItem value='Elementary School1'>Elementary School</MenuItem>
                                        <MenuItem value='Middle School'>Middle School</MenuItem>
                                        <MenuItem value='High School'>High School</MenuItem>
                                        <MenuItem value='University'>University</MenuItem>
                                    </Select>
                                </FormControl>}
                            {otherInfo && userCopy.User_Type === 1 && <TextField label='Apprenticeships Taken' variant='outlined' className='col ms-3 mb-3' value={otherInfoCopy.No_Of_Courses} disabled />}
                        </div>
                        <div className={'row mt-3 ' + (windowWidth > 990 ? 'd-flex justify-content-center' : 'm-auto')}>
                            <TextField label='Password' type='Password' variant='outlined' className='col-5 mb-3 ms-5' value='***********' disabled />
                            <Button variant='outlined' className='col-3 ms-3 mb-3' onClick={() => setIsEditingPassword(!isEditingPassword)}>
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
                {isEditingPassword && <ChangePassowrd open={isEditingPassword} handleClose={() => setIsEditingPassword(false)} setSnackBarInfo={setSnackBarInfo} windowWidth={windowWidth} user={user} />}
                {verifyEmailOpen && <ChangeEmail open={verifyEmailOpen} handleClose={() => setVerifyEmailOpen(false)}
                    setSnackBarInfo={setSnackBarInfo} email={userCopy.Email} setVerfired={setIsEmailVerified}
                    setIsEditing={setIsEditing} oldData={user} setUserCopy={setUserCopy} />}
            </div>}
        </>

    )
}

export default Profile;