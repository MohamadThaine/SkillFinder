import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import '../Assets/Styles/OpenedChat.css'
const OpenedChat = ({ chat, pic, setOpenedChat, socket }) => {
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!chat) return;
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getMessages/${loggedUser.id}/${chat.ID}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token'),
            }
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setMessages(data.messages);
            }
        })
    }, [chat])

    const sendMessage = async () => {
        if (!message) return;
        const newMessage = {
            Chat_ID: chat.ID,
            Sender_ID: loggedUser.id,
            Receiver_ID: chat.Owner_ID === loggedUser.id ? chat.Apprentice_ID : chat.Owner_ID,
            Content: message,
            Date_Of_Creation: new Date()
        }
        fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/sendMessage`, {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMessage)
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setMessages([...messages, { ...newMessage, ID: data.ID }]);
                setMessage('');
                socket.current.emit('sendMessage', { ...newMessage, ID: data.ID });
                chat.Content = newMessage.Content;
            }
        });
    }

    useEffect(() => {
        if (!chat) return;
        socket.current.on('reciveMessage', (message) => {
            if (message.Chat_ID === chat.ID) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });
    }, [chat])

    useEffect(() => {
        if (!chat) return;
        scrollRef.current.scrollIntoView({ block: 'end', inline: 'nearest' });
    }, [messages])


    const closeChat = () => {
        setMessage('');
        setMessages([]);
        setOpenedChat(null);
    }

    return (
        <div className='opened-chat'>
            <div className='border-bottom opened-chat-header'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" className='go-back-icon'
                    onClick={closeChat}>
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 
                    0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
                <div className='chat-info'>
                    <img src={pic} alt="profile pic" />
                    <Typography variant='h6' className='chat-name'>{chat.Name}</Typography>
                </div>
            </div>
            <div className='messages-list'>
                {messages.map(message => {
                    return <Message key={message.ID} message={message} loggedUser={loggedUser} />
                })}
            </div>
            <div className='message-tools border-top'>
                <textarea placeholder='Type a message...' className='message-input' value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => {
                        if (e.which === 13 && !e.shiftKey) {
                            sendMessage();
                        }}}/>
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 512 512" className='send-icon' onClick={sendMessage}><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284
                     427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7
                     0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
            </div>
            <span ref={scrollRef}></span>
        </div>
    )
}

const Message = ({ message, loggedUser }) => {
    const [date, setDate] = useState(() => {
        const date = new Date(message.Date_Of_Creation);
        if (date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
        else return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    })
    return (
        <div className={`d-flex align-items-center ${message.Sender_ID === loggedUser.id ? 'right-message' : ''}`}>
            {message.Sender_ID === loggedUser.id && <Typography variant='caption' className='message-date'>{date}</Typography>}
            <div className={`bubble message ${message.Sender_ID === loggedUser.id ? 'sent-msg' : 'recived-msg'}`}>
                <Typography variant='body1' className='message-text'>{message.Content}</Typography>
            </div>
            {message.Sender_ID !== loggedUser.id && <Typography variant='caption' className='message-date'>{date}</Typography>}
        </div>

    )
}

export default OpenedChat