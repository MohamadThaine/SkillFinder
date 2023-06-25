import React, { useEffect, useState } from 'react';
import '../Assets/Styles/ApprenticeshipContent.css'
import Announcements from './Announcements';
import Resource from './ContentComponents/Resource';
import ApprenticeshipSimulation from './ApprenticeshipSimulation';
const ApprenticeshipContent = ({ app, setSnackBarInfo, resources, setResources, socket, simulation }) => {
    const [openAnnouncements, setOpenAnnouncements] = useState(false);
    const [openSimulation, setOpenSimulation] = useState(false);
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
            {simulation && <div className='mt-5 desc annoucments-container ms-5' onClick={() => setOpenSimulation(true)}>
                <div className='announcment-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" fill="currentColor" className="bi bi-headset-vr" viewBox="0 0 16 16">
                        <path d="M8 1.248c1.857 0 3.526.641 4.65 1.794a4.978 4.978 0 0 1 2.518 1.09C13.907 1.482 11.295 0 8 0 4.75 0 2.12 1.48.844 4.122a4.979 4.979 0 0 1 2.289-1.047C4.236 1.872 5.974 1.248 8 1.248z" />
                        <path d="M12 12a3.988 3.988 0 0 1-2.786-1.13l-.002-.002a1.612 1.612 0 0 0-.276-.167A2.164 2.164 0 0 0 8 10.5c-.414 0-.729.103-.935.201a1.612 1.612 0 0 0-.277.167l-.002.002A4 4 0 1 1 4 4h8a4 4 0 0 1 0 8z" />
                    </svg>
                </div>
                <h5 className='ms-3'>Simulation</h5>
            </div>}
            {openAnnouncements && <Announcements app={app} open={openAnnouncements} handleClose={() => setOpenAnnouncements(false)} />}
            {simulation && openSimulation && <ApprenticeshipSimulation  open={openSimulation} handleClose={() => setOpenSimulation(false)} simulationPath={simulation.Simulation} />}
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