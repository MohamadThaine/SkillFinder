import React, { useEffect, useRef, useState } from 'react'
import { Typography } from "@mui/material";
import defalutMaleIcon from '../Assets/Images/defaultMalePic.svg'
import defalutFemaleIcon from '../Assets/Images/defaultFemalePic.svg'
import '../Assets/Styles/Chat.css'
import OpenedChat from './OpenedChat';

const Chats = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showChat, setShowChat] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [ownerInfo, setOtherInfo] = useState(JSON.parse(localStorage.getItem('otherInfo')));
    const [userTry, setUserTry] = useState({ Name: "Ahmad", Gender: "Female" });
    const [otherInfoTry, setOtherInfoTry] = useState({ Study_Leve: "idk" });
    const [openedChat, setOpenedChat] = useState(null);
    const [chats, setChats] = useState([]);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    }

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    }

    const handleTouchEnd = (e) => {
        if (touchEndX.current - touchStartX.current > 300) {
            setShowChat(false);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const getChats = async () => {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/getChats/${user.id}/${user.User_Type === 2}`, {
            method: 'GET',
            headers: {
                authorization: localStorage.getItem('token'),
            }
        });
        const data = await response.json();
        if (data.success) {
            setChats(data.chats);
        }
    }

    useEffect(() => {
        if (user) {
            getChats();
        }
    }, [user])


    return (
        <div className={"chats " + (showChat ? '' : 'hideChats')} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="hide-chat" onClick={() => setShowChat(!showChat)}>
                {showChat && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="hide-icon">
                    <path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 
                        79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 
                        269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 
                        0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 
                        432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 
                        131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                </svg>}
                {!showChat && <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="hide-icon bi bi-chat" viewBox="0 0 16 16">
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                </svg>}
            </div>
            <div className={"chats-elements p-2 " + (windowWidth > 768 ? 'desc' : '')}>
                {openedChat === null && <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={"close-chat bi bi-x " + (showChat ? '' : 'd-none')} viewBox="0 0 16 16" onClick={() => setShowChat(false)}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <div className="row me-4 ms-4">
                        <input type="text" className="form-control mt-3" placeholder="Search" />
                    </div>
                    <div className="row chat pb-3 desc mt-3 ms-4 me-4">
                        <img src={ownerInfo.Picture ? ownerInfo.Picture : user.Gender === "Male" ? defalutMaleIcon : defalutFemaleIcon} alt="profile" className="chat-img mt-1 mb-auto" />
                        <Typography variant="p" className="col mt-auto mb-auto">{user.Name}</Typography>
                    </div>
                    <Typography variant="h6" className="row desc mt-3">Chats</Typography>
                    {chats.length === 0 && <Typography variant="h5" className="mt-5 text-center">No chats yet</Typography>}
                    <div className="row desc chats-list mt-4 mb-auto ms-1 me-1">
                        {chats.map((chat, index) => {
                            return <Chat key={index} chat={chat} user={chat.user} otherInfo={chat.otherInfo} setOpenedChat={setOpenedChat} />
                        })}
                    </div>
                </>}
                {openedChat !== null && <OpenedChat chat={openedChat.chat} pic={openedChat.pic} user={openedChat.user} otherInfo={openedChat.otherInfo} setOpenedChat={setOpenedChat} />}
            </div>

        </div>
    )

}

const Chat = ({ chat, setOpenedChat }) => {
    const [picture, setPicture] = useState(chat.Picture ? chat.Picture : chat.Gender === "Male" ? defalutMaleIcon : defalutFemaleIcon);
    return (
        <div className="row chat border-bottom" onClick={() => {
            setOpenedChat({ chat: chat, pic: picture });
        }}>
            <img src={picture} alt="profile" className="chat-img mt-1 mb-auto" />
            <div className="col mt-auto mb-auto">
                <Typography variant="p" className="row">{chat.Name}</Typography>
                <Typography variant="p" className="row last-message">{chat.content}</Typography>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-right chat-arrow" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
        </div>
    )
}

export default Chats;