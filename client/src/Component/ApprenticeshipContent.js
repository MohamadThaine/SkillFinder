import React, { useEffect, useState } from 'react';
import '../Assets/Styles/ApprenticeshipContent.css'
import Announcements from './Announcements';
import Resource from './ContentComponents/Resource';
const ApprenticeshipContent = ({ app, setSnackBarInfo, resources, setResources, socket }) => {
    const [openAnnouncements, setOpenAnnouncements] = useState(false);
    useEffect(() => {
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getResources/${app.ID}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setResources(data.proccessedResources.reduce((r, a) => {
                        const date = a.Date_Of_Creation.split('T')[0];
                        const resource = { ...a, Date_Of_Creation: date };
                        r[date] = [...r[date] || [], resource];
                        return r;
                    }, {}));
                }
                else {
                    setSnackBarInfo({ severity: 'error', message: data.message, open: true });
                }
            })
            .catch(err => {
                console.log(err);
                setSnackBarInfo({ severity: 'error', message: 'Error while getting resources', open: true });
            });
    }, []);

    useEffect(() => {
        if (socket.current) {
            socket.current.on('reciveResource', (appID, resource) => {
                if (parseInt(appID) === app.ID) {
                    const date = resource.Date_Of_Creation.split('T')[0];
                    setResources(prevState => {
                        return {
                            ...prevState,
                            [date]: [...(prevState[date] || []), resource]
                        };
                    }
                    );
                }
            });
        }
    }, [socket.current]);



    return (
        <div className="border-top mb-3">
            <div className='mt-5 desc annoucments-container ms-5' onClick={() => setOpenAnnouncements(true)}>
                <div className='announcment-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-megaphone-fill" viewBox="0 0 16 16">
                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
                    </svg>
                </div>
                <h5 className='ms-3'>Announcements</h5>
            </div>
            {openAnnouncements && <Announcements app={app} open={openAnnouncements} handleClose={() => setOpenAnnouncements(false)} />}
            <div className='mt-5 resources-container ms-5'>
                <h2 className='ms-3 text-center'>Resources</h2>
                <div className='resources'>
                    {Object.keys(resources).map((date, index) => {
                        return (
                            <div key={index} className='mb-3 mt-3'>
                                <h3 style={{ color: 'grey' }}>{date}</h3>
                                {resources[date].map((resource, index) => {
                                    return <Resource key={index} resource={resource} />
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ApprenticeshipContent;