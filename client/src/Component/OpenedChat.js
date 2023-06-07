import { Typography } from '@mui/material';
import React, { useState } from 'react'
import '../Assets/Styles/OpenedChat.css'
const OpenedChat = ({ chat, pic, socket, user, otherInfo, setOpenedChat }) => {
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));
    return (
        <>
            <div className='border-bottom opened-chat-header'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" className='go-back-icon'
                    onClick={() => setOpenedChat(null)}>
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 
                    0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                <div className='chat-info'>
                    <img src={pic} alt="profile pic" />
                    <Typography variant='h6' className='chat-name'>{user.Name}</Typography>
                </div>
            </div>
            <div className='messages-list'>
                <div className='message sent-msg bubble'>
                    <Typography variant='body1' className='message-text'>Hello</Typography>
                </div>
                <div className='message recived-msg bubble'>
                    <Typography variant='body1' className='message-text'>Hello</Typography>
                </div>
                <div className='message sent-msg bubble'>
                    <Typography variant='body1' className='message-text'>Hello</Typography>
                </div>
                <div className='message recived-msg bubble'>
                    <Typography variant='body1' className='message-text'>Hello</Typography>
                </div>
            </div>
            <div className='message-tools border-top'>
                <textarea placeholder='Type a message...' className='message-input' />
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 512 512" className='send-icon'><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284
                 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7
                 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
            </div>
        </>
    )
}

export default OpenedChat