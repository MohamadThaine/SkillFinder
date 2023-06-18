import { Box, Modal } from "@mui/material";
import { useState } from "react";
const VideoResource = ({ video }) => {
    const [openVideo, setOpenVideo] = useState(false)
    return (
        <div className="mb-3">
            <div className="desc d-flex align-items-center" style={{cursor:'pointer'}} onClick={() => setOpenVideo(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" className="bi bi-film mt-auto mb-auto" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                    </svg>
                <h5 className="ms-3 mt-auto mb-auto">{video.Name}</h5>
            </div>
            {openVideo && <OpenVideoResource video={video} open={openVideo} handleClose={() => setOpenVideo(false)} />}
        </div>
    );
}

const OpenVideoResource = ({ video, open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose} >
            <Box className='center-modal' sx={{ background: 'white', outline:'none' }}>
                <div className="row">
                    <div className="col-12 text-center mb-3">
                        <h4>{video.Name}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <video controls className="resource-video">
                            <source src={video.Resource} />
                        </video>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}


export default VideoResource;